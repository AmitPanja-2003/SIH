import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from '../CSS/HospitalInventoryForm.module.css';

const HospitalInventoryForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialHospitalName = queryParams.get('hospitalName');
  const initialHospitalID = queryParams.get('hospitalID');

  const [hospitalName, setHospitalName] = useState('');
  const [hospitalID, setHospitalID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [productQuantity, setProductQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  // Product types with related product names
  const productData = {
    'Medicines': ['Aspirin', 'Paracetamol', 'Ibuprofen'],
    'Blood': ['A+', 'O-', 'B+', 'AB+'],
    'Injections': ['Vaccine A', 'Insulin', 'Pain Relief Injection'],
    'IV Fluids': ['Saline', 'Dextrose', 'Ringer\'s Lactate'],
    'Syringes': ['1ml Syringe', '5ml Syringe', '10ml Syringe'],
    'Needles': ['Hypodermic Needle', 'Butterfly Needle'],
  };

  const productTypes = Object.keys(productData);

  useEffect(() => {
    if (initialHospitalName && initialHospitalID) {
      setHospitalName(initialHospitalName);
      setHospitalID(initialHospitalID);
    }
  }, [initialHospitalName, initialHospitalID]);

  const handleProductNameChange = (inputValue) => {
    setProductName(inputValue);
    if (productType && productData[productType]) {
      const filtered = productData[productType].filter((name) =>
        name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setProductName(suggestion);
    setFilteredSuggestions([]); // Hide suggestions after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inventoryData = {
      hospitalName,
      hospitalID: Number(hospitalID),
      phoneNumber,
      products: 
        {
          productType,
          productName,
          productQuantity: Number(productQuantity),
          price: Number(price),
          expiryDate,
        },
      
    };

    try {
      await axios.post('http://localhost:5000/addInventory/inventory', inventoryData);
      Swal.fire({
        title: 'Success!',
        text: 'Data has been saved to the database.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Reset form
      setHospitalName('');
      setHospitalID('');
      setProductType('');
      setProductName('');
      setProductQuantity('');
      setPrice('');
      setExpiryDate('');
      setFilteredSuggestions([]); // Clear suggestions after form reset
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error saving the data. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Hospital Inventory Form</h2>
      <form onSubmit={handleSubmit} className={styles.inventoryForm}>

        <div className={styles.formGroup}>
          <label>Hospital Name:</label>
          <input
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
            placeholder="Enter hospital name"
            disabled
          />
        </div>

        <div className={styles.formGroup}>
          <label>Hospital ID:</label>
          <input
            type="number"
            value={hospitalID}
            onChange={(e) => setHospitalID(e.target.value)}
            required
            placeholder="Enter hospital ID"
            disabled
          />
        </div>

        <div className={styles.formGroup}>
          <label>Product Type:</label>
          <select 
            value={productType} 
            onChange={(e) => {
              setProductType(e.target.value);
              setProductName(''); // Clear product name when changing product type
              setFilteredSuggestions([]); // Clear suggestions when type changes
            }}
            required
          >
            <option value="">Select product type</option>
            {productTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => handleProductNameChange(e.target.value)}
            required
            placeholder="Enter product name or select from suggestions"
          />
          {/* Display suggestions if available */}
          {filteredSuggestions.length > 0 && (
            <ul className={styles.suggestionsList}>
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={styles.suggestionItem}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Product Quantity:</label>
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
            placeholder="Enter product quantity"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter price"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Expiry Date:</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default HospitalInventoryForm;
