import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from '../CSS/hospitalLogin.module.css'; // Import the CSS module

const DoctorLogin = () => {
    const [doctorID, setDoctorID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error

        try {
            const response = await axios.post('http://127.0.1:5000/doctor/doctorLogin', {
                doctorID,
                password
            });

            if (response.data.success) {
                navigate(`/doctor-dashboard?doctorID=${doctorID}&doctorName=${response.data.doctorName}&hospitalName=${response.data.hospitalName}`);
            } else {
                setError('Doctor ID or Password is incorrect');
                Swal.fire({
                    title: 'Error!',
                    text: 'Doctor ID or Password is incorrect',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Error logging in. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Doctor Login</h2>
            <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    <label>Doctor ID</label>
                    <input
                        type="text"
                        value={doctorID}
                        onChange={(e) => setDoctorID(e.target.value)}
                        placeholder="Enter Doctor ID"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.submitButton}>Login</button>
            </form>
        </div>
    );
};

export default DoctorLogin;