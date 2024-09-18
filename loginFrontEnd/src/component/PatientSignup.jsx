// import React, { useState } from 'react';
// import axios from 'axios';
// import '../CSS/patientSignup.css'
// const PatientSignup = () => {
//   // State to hold form data
//   const [formData, setFormData] = useState({
//     patientName: '',
//     patientAge: '',
//     patient_password:'',
//     patientGender: '',
//     patientEmail: '',
//     phoneNo: '',
//     address: '',
//     bloodGroup: '',
//   });

//   // State to handle success or error message
//   const [message, setMessage] = useState('');

//   // Handler to update form data as the user types
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send POST request to backend
//       const response = await axios.post('http://localhost:5000/patient/signup', formData);
//       console.log(response.data);
      
//       // Display success message
//       setMessage('Patient signed up successfully!');
//     } catch (error) {
//       console.error('Error:', error);
//       // Display error message
//       setMessage('Error during signup. Please try again.');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Patient Signup</h2>

//       {/* Display message */}
//       {message && <p>{message}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Age</label>
//           <input
//             type="number"
//             name="patientAge"
//             value={formData.patientAge}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Gender</label>
//           <select
//             name="patientGender"
//             value={formData.patientGender}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="patientEmail"
//             value={formData.patientEmail}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Phone Number</label>
//           <input
//             type="tel"
//             name="phoneNo"
//             value={formData.phoneNo}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="number"
//             name="patient_password"
//             value={formData.patient_password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Blood Group</label>
//           <input
//             type="text"
//             name="bloodGroup"
//             value={formData.bloodGroup}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default PatientSignup;



import React, { useState } from 'react';
import axios from 'axios';
import styles from '../CSS/patientSignup.module.css'; // Import CSS module

const PatientSignup = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patient_password: '',
    patientGender: '',
    patientEmail: '',
    phoneNo: '',
    address: '',
    bloodGroup: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/patient/signup', formData);
      console.log(response.data);
      setMessage('Patient signed up successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error during signup. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Patient Signup</h2>

      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Age</label>
          <input
            type="number"
            name="patientAge"
            value={formData.patientAge}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Gender</label>
          <select
            name="patientGender"
            value={formData.patientGender}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="number"
            name="patient_password"
            value={formData.patient_password}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>Signup</button>
      </form>
    </div>
  );
};

export default PatientSignup;
