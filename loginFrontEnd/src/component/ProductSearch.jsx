import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../CSS/ProductSearch.module.css';

const ProductSearch = () => {
    const [productName, setProductName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    // Function to load initial data
    const loadInitialData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/searchproducts/searchProduct?productName=`); // Adjust the endpoint as necessary
            setSearchResults(response.data || []);
        } catch (error) {
            setError('Error fetching initial product data. Please try again.');
            console.error('Error fetching initial data:', error);
        }
    };

    const handleSearch = async (name) => {
        if (name === '') {
            loadInitialData(); 
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/searchproducts/searchProduct?productName=${name}`);
            console.log(`API Response:`, response.data);

            if (response.data.length === 0) {
                setSearchResults([]); // Clear previous results
                setError(`No hospitals found with the product "${name}".`);
            } else {
                setSearchResults(response.data); // Set new search results
                setError(''); // Clear any previous errors
            }
        } catch (error) {
            setError('Error fetching product data. Please try again.');
            console.error('Error fetching product data:', error);
        }
    };


    // const handleSearch = async (name) => {
    //     if (name === '') {
    //         loadInitialData(); 
    //         return;
    //     }
    
    //     try {
    //         const response = await axios.get(`http://localhost:5000/searchproducts/searchProduct`, {
    //             params: {
    //                 productName: name
    //             }
    //         });
    
    //         if (response.data.length === 0) {
    //             setSearchResults([]); // Clear previous results
    //             setError(`No products found with the name "${name}".`);
    //         } else {
    //             setSearchResults(response.data); // Set new search results
    //             setError(''); // Clear any previous errors
    //         }
    //     } catch (error) {
    //         setError('Error fetching product data. Please try again.');
    //         console.error('Error fetching product data:', error);
    //     }
    // };
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setProductName(value);

        // Clear previous timeout if typing
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout
        setTypingTimeout(setTimeout(() => {
            handleSearch(value); // Pass the current input value to handleSearch
        }, 500)); // 500ms delay before making the search request
    };

    useEffect(() => {
        loadInitialData(); // Load initial data on component mount
    }, []);

    return (
        <div className={styles.searchContainer}>
            <h2 className={styles.title}>Search Product in Hospitals</h2>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    value={productName}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className={styles.inputField}
                />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            {searchResults.length > 0 ? (
                <div className={styles.resultsTable}>
                    <table className={styles.resultsTableTable}>
                        <thead>
                            <tr>
                                <th className={styles.tableHeader}>Hospital Name</th>
                                <th className={styles.tableHeader}>Product Name</th>
                                <th className={styles.tableHeader}>Product Type</th>
                                <th className={styles.tableHeader}>Quantity</th>
                                <th className={styles.tableHeader}>Contact Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((result, index) => (
                                <tr key={index} className={index % 2 === 0 ? styles.tableRowEven : ''}>
                                    <td className={styles.tableData}>{result.hospitalName}</td>
                                    <td className={styles.tableData}>{result.productName}</td>
                                    <td className={styles.tableData}>{result.productType}</td>
                                    <td className={styles.tableData}>{result.productQuantity}</td>
                                    <td className={styles.tableData}>{result.hospitalContact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !error && productName && (
                    <p className={styles.noResultsMessage}>Searching for "{productName}"...</p>
                )
            )}
        </div>
    );
};

export default ProductSearch;
