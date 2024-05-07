import React from 'react';
import styles from './Company.module.css'; // Arquivo CSS separado para estilos
import profile from './profile.jpeg'
function Company() {
    return (
        <div className={styles.companyContainer}>
            <img className={styles.profileImage} src={profile} alt="Your Name" />
            <h1>Richard Silva Vaz</h1>
            <p>Estácio de Sá: Sistemas de informações</p>
            <div className={styles.socialLinks}>
                <a href="https://github.com/limiticel" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/richard-silva-573368302" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.instagram.com/ia_dev_?igsh=MWpsYnJkajY4YXlkNA==" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
        </div>
    );
}

export default Company;
