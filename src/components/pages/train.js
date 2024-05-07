import React, { useState } from 'react';
import styles from './train.module.css'; // Arquivo CSS separado para estilos

function IA() {
    const [inputData, setInputData] = useState({
        trainingData: '',
        outputData: '',
        trainedWeights: null, // Estado para armazenar os pesos treinados
        testData: '', // Estado para armazenar os dados de teste
        testOutputData: '', // Estado para armazenar as respostas corretas dos dados de teste
        prediction: null, // Estado para armazenar a previsão da máquina
        accuracy: null // Estado para armazenar a acurácia da previsão
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    
    // Função sigmoid
    function sigmoid(x, weights) {
        let predictions = [];
        for (let i = 0; i < x.length; i++) {
            let sum = 0;
            for (let j = 0; j < x[i].length; j++) {
                sum += x[i][j] * weights[j];
            }
            predictions.push(1 / (1 + Math.exp(-sum)));
        }
        return predictions;
    }
    
    // Função de arredondamento para 0 ou 1
    function roundToZeroOrOne(value) {
        return value >= 0.5 ? 1 : 0;
    }

    // Função de gradiente descendente
    function gradientDescent(trainingData, outputData) {
        // Inicializa os pesos com valores aleatórios
        let weights = new Array(trainingData[0].length).fill(0).map(() => Math.random());

        const learningRate = 0.01; // Taxa de aprendizado

        // Executa várias iterações de gradiente descendente
        for (let epoch = 0; epoch < 1000; epoch++) {
            for (let i = 0; i < trainingData.length; i++) {
                const prediction = sigmoid([trainingData[i]], weights);
                const error = outputData[i] - prediction[0];
                for (let j = 0; j < weights.length; j++) {
                    weights[j] += learningRate * error * trainingData[i][j];
                }
            }
        }

        return weights;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados de Treinamento:', inputData.trainingData);
        console.log('Dados de Resposta:', inputData.outputData);

        // Transforma os dados de treinamento e resposta em arrays
        const trainingData = JSON.parse(inputData.trainingData);
        const outputData = JSON.parse(inputData.outputData);

        // Executa o gradiente descendente para treinar a máquina
        const trainedWeights = gradientDescent(trainingData, outputData);
        console.log('Pesos Ajustados:', trainedWeights);

        // Armazena os pesos treinados no estado do componente
        setInputData(prevState => ({
            ...prevState,
            trainedWeights: trainedWeights
        }));
    }

    const handleTestSubmit = (e) => {
        e.preventDefault();
        console.log('Dados de Teste:', inputData.testData);
        console.log('Respostas Corretas:', inputData.testOutputData);

        // Transforma os dados de teste e respostas corretas em arrays
        const testData = JSON.parse(inputData.testData);
        const testOutputData = JSON.parse(inputData.testOutputData);

        // Verifica a previsão da máquina
        const prediction = sigmoid(testData, inputData.trainedWeights);
        console.log('Previsão da Máquina:', prediction);

        // Arredonda os valores de previsão para 0 ou 1
        const roundedPrediction = prediction.map(roundToZeroOrOne);
        console.log('Previsão Arredondada:', roundedPrediction);

        // Calcula a acurácia da previsão
        const accuracy = calculateAccuracy(roundedPrediction, testOutputData);
        console.log('Acurácia da Previsão:', accuracy);

        // Atualiza o estado com a previsão e a acurácia
        setInputData(prevState => ({
            ...prevState,
            prediction: roundedPrediction,
            accuracy: accuracy
        }));
    }

    // Função para calcular a acurácia da previsão
    function calculateAccuracy(prediction, testOutputData) {
        let correct = 0;
        for (let i = 0; i < testOutputData.length; i++) {
            if (prediction[i] === testOutputData[i]) {
                correct++;
            }
        }
        return (correct / testOutputData.length) * 100;
    }

    return (
        <div>
            <form className={styles.iaform} onSubmit={handleSubmit}>
                <label className={styles.ialabel}>
                    Dados de Treinamento (Formato esperado: [[dado1, dado2, ...], [dado1, dado2, ...]]):
                    <textarea className={styles.iainput} name="trainingData" value={inputData.trainingData} onChange={handleChange} />
                </label>
                <br />
                <label className={styles.ialabel}>
                    Dados de Resposta (Formato esperado: [[resp1], [resp2], [resp3]]):
                    <textarea className={styles.iainput} name="outputData" value={inputData.outputData} onChange={handleChange} />
                </label>
                <br />
                <button className={styles.iabutton} type="submit">Enviar</button>
            </form>
            {inputData.trainedWeights && (
                <div>
                    <h2>Pesos Treinados:</h2>
                    <pre>{JSON.stringify(inputData.trainedWeights, null, 2)}</pre>
                </div>
            )}

            {/* Formulário de teste */}
            <form className={styles.iaform} onSubmit={handleTestSubmit}>
                <label className={styles.ialabel}>
                    Dados de Teste (Formato esperado: [[dado1], [dado2], ...]):
                    <textarea className={styles.iainput} name="testData" value={inputData.testData} onChange={handleChange} />
                </label>
                <br />
                <label className={styles.ialabel}>
                    Respostas Corretas (Formato esperado: [resp1, resp2, ...]):
                    <textarea className={styles.iainput} name="testOutputData" value={inputData.testOutputData} onChange={handleChange} />
                </label>
                <br />
                <button className={styles.iabutton} type="submit">Verificar</button>
            </form>
            {inputData.prediction !== null && (
                <div>
                    <h2>Resultado da Previsão:</h2>
                    <p>Previsão da Máquina: {inputData.prediction.join(', ')}</p>
                    <p>Acurácia da Previsão: {inputData.accuracy.toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
}

export default IA;
