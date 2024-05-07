import styles from  './Home.module.css'
import first from './perceptron.jpg'
import second from './perceptron2.jpg'
import three from './perceptron3.jpg'
import React from "react";
import { Link } from "react-router-dom";
function Home(){
    return (
        <body>
            <h1 className={styles.btn}>Treino de Modelo IA (Perceptron)</h1>
            <ul className={styles.boxContainer}>
                <div className={styles.listItem} style={{ backgroundImage: `url(${first})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <p className={styles.cardText}>Treinar um perceptron para reconhecer padrões de dígitos e classificá-los corretamente.</p>
                    
                </div>
                <div className={styles.listItem} style={{ backgroundImage: `url(${second})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <p className={styles.cardText}>Testar a eficácia de um modelo de aprendizado de máquina na previsão do preço de ações com base em dados históricos.</p>
                </div>
                <div className={styles.listItem} style={{ backgroundImage: `url(${three})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <p className={styles.cardText}>Desenvolver um sistema de recomendação personalizado usando algoritmos de filtragem colaborativa e dados de preferência do usuário.</p>
                </div>
            </ul>


        <div>
            <ul className={styles.ul_item}>
                <a >< Link to='/Ia_module' className={styles.fcdBtn}>Começar</Link></a>
            </ul>
        </div>
        </body>
    )
}

export default Home