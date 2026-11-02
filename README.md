# ⚡ Explainable AI-Enabled IoT Personalized Recommendation System for Residential Energy Management

## 📖 Overview
This project presents an intelligent, context-aware residential energy management system. It bridges the gap between passive smart meter data and actionable consumer behavior by integrating low-cost IoT hardware, cloud computing, Machine Learning (GRU), and Explainable AI (XAI). 

The system provides personalized appliance scheduling recommendations based on Indian Time-of-Day (ToD) tariffs while ensuring user comfort is never compromised.

## 🚀 Key Features
*   **Real-Time Monitoring:** Tracks live power consumption (Voltage, Current, Watts) and room occupancy.
*   **AI Forecasting:** Uses a Gated Recurrent Unit (GRU) model to predict short-term energy demand.
*   **Explainable AI (XAI):** Integrates SHAP and LIME to provide human-readable "Why?" explanations for every recommendation.
*   **Context-Aware:** Uses PIR sensors to ensure recommendations (like turning off the AC) are only made when a room is empty.
*   **Anomaly Detection:** Monitors appliance power signatures to detect faults and alert the user.
*   **Mobile Dashboard:** A React Native app for real-time visualization and remote relay control.

## 🛠️ Technology Stack
**Hardware:**
*   ESP32-S3 (N16R8)
*   PZEM-004T Energy Sensor (100A)
*   HC-SR501 PIR Sensor
*   5V Relay Module

**Software & Cloud:**
*   **Frontend:** React Native (Expo)
*   **Backend/AI:** Python (TensorFlow/Keras, Scikit-learn, SHAP, LIME)
*   **Database:** Firebase Realtime Database
*   **Firmware:** C++ (Arduino IDE)

## 📂 Repository Structure
*   `/EnergyDashboard` - The React Native mobile application code.
*   `/Arduino` - (Coming Soon) The C++ firmware for the ESP32 edge node.
*   `/Backend` - (Coming Soon) The Python AI pipeline for GRU forecasting and XAI.

## 👥 Team Members
*   Driswin Kumar K (MES23CS033)
*   Rishikesh S (MES23CS142)
*   Fathima Nasmi (MES23CS039)
*   Baasil Muhammad B (MES23CS030)

**Guide:** Dr. Harikrishnan G R (Associate Professor, Dept. of CSE)
**Institution:** MES College of Engineering, Kuttippuram
