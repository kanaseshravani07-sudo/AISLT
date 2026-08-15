from pathlib import Path
from fastapi import FastAPI, UploadFile, File, Form
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


def normalize_landmarks(landmarks):
    """
    landmarks: iterable of objects with .x,.y,.z (21 landmarks).
    Returns flattened list of normalized coordinates: for each landmark, (x',y',z')
    where x',y' are translated relative to wrist(landmark 0) and scaled by max distance.
    This gives translation/scale invariance.
    """
    coords = [(lm.x, lm.y, lm.z) for lm in landmarks]
    # wrist is landmark 0
    wx, wy, wz = coords[0]
    translated = [(x - wx, y - wy, z - wz) for (x, y, z) in coords]
    import math
    max_dist = max(math.sqrt(x*x + y*y + z*z) for x, y, z in translated)
    if max_dist == 0:
        max_dist = 1.0
    normalized = [(x / max_dist, y / max_dist, z / max_dist) for x, y, z in translated]
    flattened = []
    for x, y, z in normalized:
        flattened.extend([x, y, z])
    return flattened


@app.get("/")
def home():
    return{
        "message":"ShravyaMudra API is running",
        "status":"success"
    }

@app.post("/predict")
async def predict(
    file: UploadFile=File(...),
    mirror: bool = Form(False)
):
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
    # If frontend mirrors the preview, let client tell us so we can flip before detection
    if mirror:
        image = cv2.flip(image, 1)

    image_rgb=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    mp_image=mp.Image(image_format=mp.ImageFormat.SRGB,data=image_rgb)
    result=detector.detect(mp_image)
    if not result.hand_landmarks:
        return {
            "success":False,
            "detected":False,
            "message":"No hand detected"
        }
    landmarks=result.hand_landmarks[0]
    features = normalize_landmarks(landmarks)

    feature_names=[]
    for i in range(21):
        feature_names.extend([f"x{i}",f"y{i}",f"z{i}"])

    # Sanity check
    if len(features) != len(feature_names):
        return {"success":False, "message":f"Invalid feature length: {len(features)} expected {len(feature_names)}"}

    features_df=pd.DataFrame([features],columns=feature_names)

    try:
        prediction=model.predict(features_df)
        probabilities=model.predict_proba(features_df)[0]
    except Exception as e:
        return {"success":False, "message":f"Prediction error: {e}"}

    label=encoder.inverse_transform(prediction)[0]
    confidence=float(max(probabilities))

    # build probabilities mapping using encoder.classes_
    try:
        classes = [str(c) for c in encoder.classes_]
    except Exception:
        classes = [str(c) for c in encoder.transform(np.arange(len(probabilities)))]

    prob_map = {str(cls): float(prob) for cls, prob in zip(classes, probabilities)}

    return {
        "success":True,
        "detected":True,
        "prediction":str(label),
        "confidence":confidence,
        "probabilities":prob_map,
        "classes":classes
    }
