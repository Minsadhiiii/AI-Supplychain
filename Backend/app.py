from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

# Load model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

print("✅ Model loaded successfully!")

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = [
            data['Category'],
            data['Product'],
            data['Size'],
            data['Region'],
            data['Store'],
            data['Unit_Price_LKR'],
            data['Total_Sales_LKR'],
            data['Year'],
            data['Month'],
            data['Day']
        ]
        input_array = np.array(features).reshape(1, -1)
        prediction = model.predict(input_array)[0]
        return jsonify({'predicted_quantity': round(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)