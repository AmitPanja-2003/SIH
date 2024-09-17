// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styles from '../CSS/AddDoctor.module.css';
// import { useLocation} from 'react-router-dom';

// const AddDoctor = () => {
//     const location = useLocation();
//     const queryParams=new URLSearchParams(location.search);
//     const hospitalID=queryParams.get('hospitalID');
//   const [doctor, setDoctor] = useState({
//     doctorName: '',
//     department: '',
//     //doctor_qualification: '',
//     phoneNumber: '',
//     emailID: '',
//     password: ''
//   });

//   const [phoneError, setPhoneError] = useState('');

//   const handleChange = (e) => {
//     setDoctor({ ...doctor, [e.target.name]: e.target.value });
//   };

//   const handlePhoneChange = (e) => {
//     const phone = e.target.value;
//     const phoneRegex = /^[6-9]\d{9}$/;

//     if (!phoneRegex.test(phone)) {
//       setPhoneError('Phone number must start with 6-9 and be 10 digits long');
//     } else {
//       setPhoneError('');
//     }
//     setDoctor({ ...doctor, phoneNumber: phone });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (phoneError) {
//       alert('Please fix the errors before submitting');
//       return;
//     }

    
//         const swalWithBootstrapButtons = Swal.mixin({
//           customClass: {
//             confirmButton: "btn btn-success",
//             cancelButton: "btn btn-danger"
//           },
//           buttonsStyling: false
//         });
      
//         swalWithBootstrapButtons.fire({
//           title: "Are you sure?",
//           text: "You won't be able to revert this!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonText: "Yes, Save it!",
//           cancelButtonText: "No, cancel!",
//           reverseButtons: true
//         }).then(async (result) => {
//           if (result.isConfirmed) {
//             // Post request after confirmation
//             const res = await axios.post('http://localhost:5000/doctors/add', {
//               doctor: doctor,
//               hospitalID: hospitalID
//             });
      
//             swalWithBootstrapButtons.fire({
//               title: "Saved!",
//               text: "Your file has been saved.",
//               icon: "success"
//             });
//           } else if (result.dismiss === Swal.DismissReason.cancel) {
//             swalWithBootstrapButtons.fire({
//               title: "Cancelled",
//               text: "Your imaginary file is safe :)",
//               icon: "error"
//             });
//           }
//         }).catch((error)=>{
//             console.error(error);
//             Swal.fire({
//                 position: "top",
//                 icon: "error",
//                 title: "Add Failed!!",
//                 showConfirmButton: false,
//                 timer: 2000
//               });
//         })

        
    
// }      

//   return (
//     <form className="doctor-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="doctorName"
//         placeholder="Doctor Name"
//         value={doctor.doctorName}
//         onChange={handleChange}
//         required
//         className="input-field"
//       />

//       {/* Department Dropdown */}
//       <select
//         name="department"
//         value={doctor.department}
//         onChange={handleChange}
//         required
//         className="input-field"
//       >
//         <option value="" disabled>Select Department</option>
//         <option value="Cardiology">Cardiology</option>
//         <option value="Neurology">Neurology</option>
//         <option value="Pediatrics">Pediatrics</option>
//         <option value="Obstetrics and Gynecology (OB/GYN)">Obstetrics and Gynecology (OB/GYN)</option>
//         <option value="Surgery">Surgery</option>
//         <option value="Radiology">Radiology</option>
//         <option value="Pathology">Pathology</option>
//         <option value="Pharmacy">Pharmacy</option>
//         <option value="Physical Therapy and Rehabilitation">Physical Therapy and Rehabilitation</option>
//         <option value="Oncology">Oncology</option>
//         <option value="Psychiatry">Psychiatry</option>
//         <option value="Intensive Care Unit (ICU)">Intensive Care Unit (ICU)</option>
//         <option value="Outpatient Department (OPD)">Outpatient Department (OPD)</option>
//         <option value="Central Sterile Services Department (CSSD)">Central Sterile Services Department (CSSD)</option>
//       </select>

//       {/* Qualification Dropdown */}
      
      

//       <input
//         type="text"
//         name="phoneNumber"
//         placeholder="Doctor Phone"
//         value={doctor.phoneNumber}
//         onChange={handlePhoneChange}
//         required
//         className="input-field"
//       />
//       {phoneError && <p className="error-message">{phoneError}</p>}

//       <input
//         type="email"
//         name="emailID"
//         placeholder="Doctor Email"
//         value={doctor.emailID}
//         onChange={handleChange}
//         required
//         className="input-field"
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Doctor Password"
//         value={doctor.password}
//         onChange={handleChange}
//         required
//         className="input-field"
//       />
//       <button type="submit" className="submit-button">Add Doctor</button>
//     </form>
//   );
// };

// export default AddDoctor;



import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from '../CSS/AddDoctor.module.css';
import { useLocation } from 'react-router-dom';

const AddDoctor = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hospitalID = queryParams.get('hospitalID');

  const [doctor, setDoctor] = useState({
    doctorName: '',
    department: '',
    phoneNumber: '',
    emailID: '',
    password: ''
  });

  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setPhoneError('Phone number must start with 6-9 and be 10 digits long');
    } else {
      setPhoneError('');
    }
    setDoctor({ ...doctor, phoneNumber: phone });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneError) {
      alert('Please fix the errors before submitting');
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: styles.swal2Confirm,
            cancelButton: styles.swal2Cancel
          },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Save it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Post request after confirmation
        try {
          const res = await axios.post('http://localhost:5000/doctors/add', {
            doctor: doctor,
            hospitalID: hospitalID
          });
          swalWithBootstrapButtons.fire({
            title: "Saved!",
            text: "Your file has been saved.",
            icon: "success"
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Add Failed!!",
            showConfirmButton: false,
            timer: 2000
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Request has been canceled",
          icon: "error"
        });
      }
    });
  };

  return (
    <form className={styles.doctorForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="doctorName"
        placeholder="Doctor Name"
        value={doctor.doctorName}
        onChange={handleChange}
        required
        className={styles.inputField}
      />

      {/* Department Dropdown */}
      <select
        name="department"
        value={doctor.department}
        onChange={handleChange}
        required
        className={styles.inputField}
      >
        <option value="" disabled>Select Department</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Neurology">Neurology</option>
        <option value="Pediatrics">Pediatrics</option>
        <option value="Obstetrics and Gynecology (OB/GYN)">Obstetrics and Gynecology (OB/GYN)</option>
        <option value="Surgery">Surgery</option>
        <option value="Radiology">Radiology</option>
        <option value="Pathology">Pathology</option>
        <option value="Pharmacy">Pharmacy</option>
        <option value="Physical Therapy and Rehabilitation">Physical Therapy and Rehabilitation</option>
        <option value="Oncology">Oncology</option>
        <option value="Psychiatry">Psychiatry</option>
        <option value="Intensive Care Unit (ICU)">Intensive Care Unit (ICU)</option>
        <option value="Outpatient Department (OPD)">Outpatient Department (OPD)</option>
        <option value="Central Sterile Services Department (CSSD)">Central Sterile Services Department (CSSD)</option>
      </select>

      <input
        type="text"
        name="phoneNumber"
        placeholder="Doctor Phone"
        value={doctor.phoneNumber}
        onChange={handlePhoneChange}
        required
        className={styles.inputField}
      />
      {phoneError && <p className={styles.errorMessage}>{phoneError}</p>}

      <input
        type="email"
        name="emailID"
        placeholder="Doctor Email"
        value={doctor.emailID}
        onChange={handleChange}
        required
        className={styles.inputField}
      />
      <input
        type="password"
        name="password"
        placeholder="Doctor Password"
        value={doctor.password}
        onChange={handleChange}
        required
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>Add Doctor</button>
    </form>
  );
};

export default AddDoctor;
