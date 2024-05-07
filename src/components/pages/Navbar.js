import React from "react";
import { Link } from "react-router-dom";
import styles from './nav.module.css'

function Navbar(){
    return(
        <nav className={styles.geral}>
            <ul className={styles.navbar1}>
                <li>
                    <Link className={styles.btn} to="/">Home</Link>
                </li>
                <li >
                    <Link className={styles.btn} to="/Company">company</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar