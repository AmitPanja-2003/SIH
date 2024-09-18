import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../CSS/DoctorSearch.module.css';  // Importing CSS Module
import Swal from 'sweetalert2';
const DoctorSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [editingDoctorID, setEditingDoctorID] = useState(null);
  const [editedDoctorData, setEditedDoctorData] = useState({});

  useEffect(() => {
    // Fetch all doctors when component mounts
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/doctors/all');
        setAllDoctors(response.data);
      } catch (err) {
        setError('Error fetching all doctor details');
      }
    };

    fetchAllDoctors();
  }, []);

  useEffect(() => {
    // Automatically search when searchTerm changes
    const handleSearch = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      const isId = !isNaN(searchTerm);

      try {
        const response = await axios.get('http://localhost:5000/doctors/search', {
          params: {
            searchTerm,
            isId,
          },
        });
        setSearchResults(response.data);
        setError('');
      } catch (err) {
        setError('Error fetching doctor details');
      }
    };

    handleSearch();
  }, [searchTerm]);

  const displayDoctors = searchTerm ? searchResults : allDoctors;

  const handleEditClick = (doctorID) => {
    setEditingDoctorID(doctorID);
    const doctor = displayDoctors.find((doc) => doc.doctorID === doctorID);
    setEditedDoctorData(doctor);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (doctorID) => {
    try {
      await axios.put(`http://localhost:5000/doctors/${doctorID}`, editedDoctorData);
      Swal.fire({
        title: 'Success!',
        text: 'Data edited successfully ',
        icon: 'success',
        confirmButtonText: 'OK'
    });
      setEditingDoctorID(null);  // Exit edit mode
      setError('');
      // Optionally, you can refetch the doctor data here
    } catch (err) {
      setError('Error saving doctor details');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Search-Doctor</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter doctor name or ID"
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Doctor Name</th>
            <th>Department</th>
            <th>Email ID</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>On Duty</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {displayDoctors.map((doctor) => (
            <tr key={doctor.doctorID}>
              <td>{doctor.doctorID}</td>
              <td>
                {editingDoctorID === doctor.doctorID ? (
                  <input
                    type="text"
                    name="doctorName"
                    value={editedDoctorData.doctorName}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                ) : (
                  doctor.doctorName
                )}
              </td>
              <td>
                {editingDoctorID === doctor.doctorID ? (
                  <input
                    type="text"
                    name="department"
                    value={editedDoctorData.department}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                ) : (
                  doctor.department
                )}
              </td>
              <td>
                {editingDoctorID === doctor.doctorID ? (
                  <input
                    type="email"
                    name="emailID"
                    value={editedDoctorData.emailID}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                ) : (
                  doctor.emailID
                )}
              </td>
              <td>
                {editingDoctorID === doctor.doctorID ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editedDoctorData.phoneNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                ) : (
                  doctor.phoneNumber
                )}
              </td>
              <td>
                {editingDoctorID === doctor.doctorID ? (
                  <input
                    type="password"
                    name="password"
                    value={editedDoctorData.password}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                ) : (
                  doctor.password
                )}
              </td>
              <td>{doctor.onDuty ? 'Yes' : 'No'}</td>
              <td>
                {editingDoctorID === doctor.doctorID ? (
                  <button onClick={() => handleSaveClick(doctor.doctorID)} className={styles.button}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(doctor.doctorID)} className={styles.button}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorSearch;