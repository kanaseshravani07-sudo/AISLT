from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import cv2
import numpy as np
import joblib
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

BASE_DIR=Path(__file__).resolve().parents[2]
MODEL_DIR=BASE_DIR/"model"
SIGN_MODEL_PATH=MODEL_DIR/"sign_model.pkl"
ENCODER_PATH=MODEL_DIR/"label_encoder.pkl"
HAND_MODEL_PATH=MODEL_DIR/"hand_landmarker.task"
print("Project directory:",BASE_DIR)
print("Sign model:",SIGN_MODEL_PATH)
print("Sign model exists:",SIGN_MODEL_PATH.exists())
print("Label encoder:",ENCODER_PATH)
print("Label encoder exists:",ENCODER_PATH.exists())
print("Hand model:",HAND_MODEL_PATH)
print("Hand model exists:",HAND_MODEL_PATH.exists())
if not SIGN_MODEL_PATH.exists():
    raise FileNotFoundError(f"Sign model not found:{SIGN_MODEL_PATH}")
if not ENCODER_PATH.exists():
    raise FileNotFoundError(f"Label encoder not found:{ENCODER_PATH}")
if not HAND_MODEL_PATH.exists():
    raise FileNotFoundError(f"Hand landmark model not found:{HAND_MODEL_PATH}")

app=FastAPI(title="ShravyaMudra API",description="Indian Sign Language Recognition API",version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model=joblib.load(SIGN_MODEL_PATH)
encoder=joblib.load(ENCODER_PATH)

base_options=python.BaseOptions(model_asset_path=str(HAND_MODEL_PATH))
options=vision.HandLandmarkerOptions(base_options=base_options,num_hands=1)
detector=vision.HandLandmarker.create_from_options(options)

@app.get("/")
def home():
    return{
        "message":"ShravyaMudra API is running",
        "status":"success"
    }

@app.post("/predict")
async def predict(
    file: UploadFile=File(...)):
    contents=await file.read()
    if not contents:
        return{
            "success":False,
            "message":"Empty file"
        }
    image_array=np.frombuffer(contents,np.uint8)
    image=cv2.imdecode(image_array,cv2.IMREAD_COLOR)
    if image is None:
        return {
            "success":False,
            "message":"Invalid image"
        }
    image_rgb=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    mp_image=mp.Image(image_format=mp.ImageFormat.SRGB,data=image_rgb)
    result=detector.detect(mp_image)
    if not result.hand_landmarks:
        return {
            "success":False,
            "message":"No hand detected"
        }
    landmarks=result.hand_landmarks[0]
    features=[]
    for landmark in landmarks:
        features.extend([landmark.x,landmark.y,landmark.z])
    feature_names=[]
    for i in range(21):
        feature_names.extend([f"x{i}",f"y{i}",f"z{i}"])
    features_df=pd.DataFrame([features],columns=feature_names)
    prediction=model.predict(features_df)
    probabilities=model.predict_proba(features_df)[0]
    label=encoder.inverse_transform(prediction)[0]
    confidence=float(max(probabilities))
    return {
        "success":True,
        "prediction":str(label),
        "confidence":round(confidence*100,2)
    }