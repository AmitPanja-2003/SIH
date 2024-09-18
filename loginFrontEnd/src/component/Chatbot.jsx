import React, { useState, useRef } from 'react';
import styles from '../CSS/Chatbot.module.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const chatContentRef = useRef(null);

    const API_KEY = 'AIzaSyAsGjgf-FGJroJud07ZpbmA1xOLnBrs1lw';
    const genAI = new GoogleGenerativeAI(API_KEY);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        appendMessage('User', userInput);

        try {
            const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(userInput);
            const botResponse = result.response.text(); // Adjust this based on response format
            appendMessage('Bot', botResponse);
        } catch (error) {
            appendMessage('Bot', 'Sorry, something went wrong.');
            console.error('Error:', error);
        }

        setUserInput('');
    };

    const appendMessage = (sender, message) => {
        setMessages((prevMessages) => [...prevMessages, { sender, message }]);
        setTimeout(() => {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }, 100);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    

    return (
        <div>
            {/* Chatbot Button */}
            <div className={styles.chatbotBtn} onClick={toggleChatbot}>
                Chat with us!
            </div>

            {/* Chatbot Window */}
            <div className={`${styles.chatbotWindow} ${isOpen ? styles.open : ''}`}>
                <div className={styles.chatHeader}>
                    <span>AG Chatbot</span>
                    <button className={styles.closeBtn} onClick={toggleChatbot}>
                        X
                    </button>
                </div>

                <div className={styles.chatContent} ref={chatContentRef}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.sender === 'User' ? styles.user : styles.bot}
                        >
                            {msg.sender}: {msg.message}
                        </div>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Type your message..."
                    className={styles.chatInput}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                />
                <button className={styles.sendBtn} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;