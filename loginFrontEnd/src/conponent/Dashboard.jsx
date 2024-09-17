import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../CSS/Dashboard.module.css'; // Updated import to CSS module
import Navbar from './Navbar';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const hospitalID = queryParams.get('hospitalID');
    const hospitalName = queryParams.get('hospitalName');

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.dashboardContainer}>
            <Navbar hospitalID={hospitalID} hospitalName={hospitalName} />
            <div className={styles.cardsContainer}>
                <div className={styles.card} onClick={() => handleNavigation('/add-patient')}>
                    Add Patient
                </div>
                <div className={styles.card} onClick={() => handleNavigation('/track-medicine')}>
                    Track Medicine
                </div>
                <div className={styles.card} onClick={() => handleNavigation(`/inventory?hospitalName=${hospitalName}&hospitalID=${hospitalID}`)}>
                    Add Inventory
                </div>
                <div className={styles.card} onClick={() => handleNavigation('/opd-checkup')}>
                    OPD Checkup
                </div>
                <div className={styles.card} onClick={() => handleNavigation(`/add-doctor?hospitalID=${hospitalID}`)}>
                    Add Doctor
                </div>
                <div className={styles.card} onClick={() => handleNavigation('/doctors-round')}>
                    Doctors Round
                </div>
                <div className={styles.card} onClick={() => handleNavigation('/check-doctor-details')}>
                    Check Doctor Details
                </div>
                <div className={styles.card} onClick={() => handleNavigation('/opd-medicine')}>
                    OPD Medicine
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
