import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../CSS/HospitalInventoryForm.css'; 

const HospitalInventoryForm = () => {
  // List of products
  const ruralHospitalProducts = [
    "Stethoscope",
    "Blood Pressure Monitor",
    "Thermometer",
    "Syringes",
    "Needles",
    "IV Drip Sets",
    "Gloves (Disposable)",
    "Surgical Masks",
    "Hand Sanitizer",
    "Antiseptic Solutions",
    "Bandages and Dressings",
    "Sutures",
    "Wheelchairs",
    "Hospital Beds",
    "Oxygen Cylinders",
    "Defibrillator",
    "First Aid Kits",
    "Patient Monitors",
    "Ultrasound Machine",
    "X-ray Machine",
    "Medical Waste Disposal Bags",
    "Scalpel",
    "Forceps",
    "Surgical Scissors",
    "Blood Glucose Monitor",
    "Hemoglobin Test Kit",
    "HIV Test Kit",
    "Urine Dipsticks",
    "ECG Machine",
    "Ventilators",
    "Microscope",
    "Centrifuge",
    "Autoclave Machine",
    "Ambu Bag",
    "Arm Splints",
    "Cervical Collar",
    "Inhalers",
    "Nebulizers",
    "Paracetamol 500mg",
    "Ibuprofen 400mg",
    "Amoxicillin 500mg",
    "Ciprofloxacin 500mg",
    "Metronidazole 500mg",
    "Azithromycin 500mg",
    "Doxycycline 100mg",
    "Aspirin 81mg",
    "Loratadine 10mg",
    "Atorvastatin 10-20mg",
    "Lisinopril 10-40mg",
    "Metformin 500mg"
  ];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialHospitalName = queryParams.get('hospitalName');
  const initialHospitalID = queryParams.get('hospitalID');

  const [hospitalName, setHospitalName] = useState('');
  const [hospitalID, setHospitalID] = useState('');
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const productTypes = [
    'Medicines (tablets, syrups, injections, ointments)',
    'Blood (blood types: A+, O-, etc.)',
    'Injections (vaccines, insulin, pain relief injections)',
    'IV Fluids (saline, dextrose, Ringer\'s lactate)',
    'Syringes (various sizes: 1ml, 5ml, 10ml, etc.)',
    'Needles (hypodermic needles, butterfly needles)',
    'Bandages and Dressings (gauze, adhesive bandages, wound dressings)',
    'Surgical Instruments (scalpels, forceps, scissors)',
    'Gloves (sterile, non-sterile, nitrile, latex)',
    'PPE (masks, face shields, gowns, caps)',
    'Oxygen Cylinders (medical-grade oxygen)',
    'Disinfectants (alcohol wipes, hand sanitizers, surface disinfectants)',
    'Test Kits (COVID-19 test kits, glucose meters)',
    'Specimen Containers (urine containers, blood collection tubes)',
    'Vaccines (measles, hepatitis, tetanus, etc.)',
    'Thermometers (digital, mercury)',
    'Wheelchairs',
    'Stretchers',
    'Catheters (urinary, IV catheters)',
    'IV Drip Sets'
  ];

  useEffect(() => {
    if (initialHospitalName && initialHospitalID) {
      setHospitalName(initialHospitalName);
      setHospitalID(initialHospitalID);
    }
  }, [initialHospitalName, initialHospitalID]);

  // Handle product name input change to filter suggestions
  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);

    if (value.length > 0) {
      const filteredSuggestions = ruralHospitalProducts.filter(product =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setProductName(suggestion); // Set the input to the clicked suggestion
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let inDate = new Date(Date.now()).toLocaleDateString('en-GB')
    let inventoryData={
      type: productType,
      name: productName,
      quantity: productQuantity,
      inDate:  new Date(Date.now()).toLocaleDateString('en-GB'),
      price: price,
      expiredDate: expiryDate,
    }
      
    

    try {
      console.log(inventoryData)
      await axios.post('http://localhost:5000/hospital/addinventory', {inventoryData:inventoryData,hospitalID:hospitalID});
      Swal.fire({
        title: 'Success!',
        text: 'Data has been saved to the database.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setHospitalName('');
      setHospitalID('');
      setProductType('');
      setProductName('');
      setProductQuantity('');
      setPrice('');
      setExpiryDate('');
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
    <div className="form-container">
      <h2>Hospital Inventory Form</h2>
      <form onSubmit={handleSubmit} className="inventory-form">
        
        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
          <label>Product Type:</label>
          <select 
            value={productType} 
            onChange={(e) => setProductType(e.target.value)}
            required
          >
            <option value="">Select product type</option>
            {productTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
  <label>Product Name:</label>
  <input
    type="text"
    value={productName}
    onChange={handleProductNameChange}
    required
    placeholder="Enter product name"
  />
  {/* Suggestions Dropdown */}
  {suggestions.length > 0 && (
    <ul className="suggestions-list">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          className="suggestion-item"
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )}
</div>


        <div className="form-group">
          <label>Product Quantity:</label>
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
            placeholder="Enter product quantity"
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter price"
          />
        </div>

        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
      <h1> hii </h1>
    </div>
  );
};

export default HospitalInventoryForm;
