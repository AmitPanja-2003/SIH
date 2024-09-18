import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarDoctor from './NavbarDoctor';
import styles from '../CSS/Dashboard.module.css'; // Import the module CSS

const DoctorDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const doctorName = queryParams.get('doctorName');
    const hospitalName = queryParams.get('hospitalName');

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.dashboardContainer}>
            <NavbarDoctor hospitalName={hospitalName} doctorName={doctorName} />
            <div className={styles.cardsContainer}>
                <div className={styles.card} onClick={() => handleNavigation('/opd-checkup')}>
                    OPD Checkup
                </div>
                <div className={styles.card} onClick={() => handleNavigation('/patient-round')}>
                    Patient Round Check
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;