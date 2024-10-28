from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the pre-trained model (Train and save this model separately)
model = joblib.load('diabetes_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        # Ensure all data is converted to the appropriate numeric types
        input_data = np.array([[float(data['pregnancies']),
                                 float(data['glucose']),
                                 float(data['bloodPressure']),
                                 float(data['skinThickness']),
                                 float(data['insulin']),
                                 float(data['bmi']),
                                 float(data['diabetesPedigree']),
                                 float(data['age'])]])
        
        prediction = model.predict(input_data)
        return jsonify({'prediction': 'Diabetic' if prediction[0] == 1 else 'Non-Diabetic'})
    
    except KeyError as e:
        return jsonify({'error': f'Missing key: {str(e)}'}), 400
    except ValueError as e:
        return jsonify({'error': f'Invalid value: {str(e)}'}), 400

if __name__ == '__main__':
    app.run(debug=True)
