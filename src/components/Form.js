import React, { useState } from 'react';
import axios from 'axios';

import './DiabetesPrediction.css'; // Import the CSS file

const DiabetesPrediction = () => {
    const [formData, setFormData] = useState({
        pregnancies: '',
        glucose: '',
        bloodPressure: '',
        skinThickness: '',
        insulin: '',
        bmi: '',
        diabetesPedigree: '',
        age: ''
    });

    const [prediction, setPrediction] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error during prediction:', error);
        }
    };

    return (
        <div className="container">
            <h1>Diabetes Prediction</h1>
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Pregnancies:
                    <input type="number" name="pregnancies" placeholder="Pregnancies" onChange={handleChange} required />
                </label>
                <label>
                    Glucose:
                    <input type="number" name="glucose" placeholder="Glucose" onChange={handleChange} required />
                </label>
                <label>
                    Blood Pressure:
                    <input type="number" name="bloodPressure" placeholder="Blood Pressure" onChange={handleChange} required />
                </label>
                <label>
                    Skin Thickness:
                    <input type="number" name="skinThickness" placeholder="Skin Thickness" onChange={handleChange} required />
                </label>
                <label>
                    Insulin:
                    <input type="number" name="insulin" placeholder="Insulin" onChange={handleChange} required />
                </label>
                <label>
                    BMI:
                    <input type="number" name="bmi" placeholder="BMI" onChange={handleChange} required />
                </label>
                <label>
                    Diabetes Pedigree:
                    <input type="number" name="diabetesPedigree" placeholder="Diabetes Pedigree Function" onChange={handleChange} required />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
                </label>
                <button type="submit">Predict</button>
            </form>
            {prediction && <h2 className="prediction">Prediction: {prediction}</h2>}
            
        </div>
    );
};

export default DiabetesPrediction;
