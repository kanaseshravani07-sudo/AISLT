# 🤟 SignBridge — AI Sign Language Translator

<p align="center">
  <b>Bridging communication through AI, Computer Vision & Machine Learning.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI-Machine%20Learning-00C7B7?style=for-the-badge">
  <img src="https://img.shields.io/badge/Computer%20Vision-MediaPipe-4285F4?style=for-the-badge">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge">
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge">
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge">
</p>

---

## 🚀 About

**SignBridge** is an AI-powered web application that uses **real-time webcam input, hand landmark detection, and machine learning** to recognize sign language gestures and convert them into text.

> 🎯 **Goal:** Make communication more accessible by bridging the gap between sign language and spoken communication.

---

## ✨ Features

* 🎥 Real-time webcam gesture recognition
* ✋ Hand tracking with **MediaPipe**
* 🧠 ML-based sign classification
* ⚡ Instant predictions with confidence scores
* 🌐 Interactive React interface
* 🔌 FastAPI-powered backend
* 🧩 Easily extendable with new signs

### Currently Supported

`HELLO` · `NAMASTE` · `YES` · `NO`

---

## 🧠 How It Works

```text
📷 Webcam
   ↓
✋ Hand Detection
   ↓
📍 Landmark Extraction
   ↓
🤖 ML Model
   ↓
🔤 Sign Prediction
   ↓
⚡ Real-Time Result
```

---

## 🛠️ Tech Stack

| Layer               | Technologies                         |
| ------------------- | ------------------------------------ |
| 🎨 Frontend         | React, Vite, JavaScript, CSS         |
| ⚙️ Backend          | Python, FastAPI, Uvicorn             |
| 👁️ Computer Vision | MediaPipe, OpenCV                    |
| 🧠 ML               | Scikit-learn, NumPy, Joblib          |
| 📊 Data             | ISL Gesture Dataset + Custom Samples |

---

## 📊 Model Performance

> 🏆 **~99% test accuracy** on the available landmark-based test split during development.

*Real-world performance may vary depending on lighting, camera quality, background, and user hand position.*

---

## ⚡ Quick Start

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 🔮 Future Scope

```text
🤟 More ISL Signs
        ↓
📝 Sentence-Level Translation
        ↓
🔊 Text-to-Speech
        ↓
🌐 Multilingual Support
        ↓
📱 Mobile Application
        ↓
☁️ Cloud Deployment
```

---

## 💡 Vision

**SignBridge isn't just about recognizing gestures — it's about making communication more inclusive through technology.**

---

<p align="center">

### 🤟 Built with Code • AI • Computer Vision

<img src="https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square">
<img src="https://img.shields.io/badge/Status-Active-success?style=flat-square">

</p>
