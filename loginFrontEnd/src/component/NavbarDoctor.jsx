import React, { useState } from 'react';
import styles from '../CSS/Navbar.module.css'; // Import the CSS module

const NavbarDoctor = ({ hospitalName, doctorName }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.hospitalInfo}>
                <h1 className={styles.hospitalName}>{hospitalName}</h1>
                <h2 className={styles.hospitalId}>{doctorName}</h2>
            </div>
            <div className={styles.navLinks}>
                <h2 className={styles.navLink}>About</h2>
                <h2 className={styles.navLink}>Service</h2>
                <h2 className={styles.navLink}>Contact Us</h2>
            </div>

            {/* Menu button visible only for mobile */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={styles.navMenuBtn}
                onClick={toggleMenu}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            {/* Cancel button */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`${styles.navMenuCncl} ${menuOpen ? styles.active : ''}`}
                onClick={toggleMenu}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

            {/* Mobile dropdown menu */}
            <div className={`${styles.navMenu} ${menuOpen ? styles.active : ''}`}>
                <h3 className={styles.navMenuItem}>About</h3>
                <h3 className={styles.navMenuItem}>Pricing</h3>
                <h3 className={styles.navMenuItem}>Contact Us</h3>
            </div>
        </header>
    );
};

export default NavbarDoctor;