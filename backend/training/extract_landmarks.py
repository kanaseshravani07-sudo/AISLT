import os
import cv2
import csv
import mediapipe as mp
from pathlib import Path
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

BASE_DIR=Path(__file__).resolve().parents[2]
DATASET_PATH=BASE_DIR / "dataset"
MODEL_PATH=BASE_DIR / "model" / "hand_landmarker.task"
OUTPUT_FILE=BASE_DIR / "backend" / "training" / "dataset.csv"

print("Model path:",MODEL_PATH)
print("Model exists:",MODEL_PATH.exists())
if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Model not found:{MODEL_PATH}")

base_options=python.BaseOptions(model_asset_path=str(MODEL_PATH))
options=vision.HandLandmarkerOptions(base_options=base_options,num_hands=1)
detector=vision.HandLandmarker.create_from_options(options)
rows = []

for label in sorted(os.listdir(DATASET_PATH)):
    folder=DATASET_PATH / label
    if not folder.is_dir():
        continue
    print(f"Processing {label}...")
    for image_name in os.listdir(folder):
        image_path=folder / image_name
        image=cv2.imread(str(image_path))

        if image is None:
            continue
        image_rgb = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
        mp_image=mp.Image(image_format=mp.ImageFormat.SRGB,data=image_rgb)
        result=detector.detect(mp_image)

        if not result.hand_landmarks:
            continue
        landmarks=result.hand_landmarks[0]
        features=[]
        for landmark in landmarks:features.extend([landmark.x,landmark.y,landmark.z])
        features.append(label)
        rows.append(features)

header=[]
for i in range(21):
    header.extend([f"x{i}",f"y{i}",f"z{i}"])
header.append("label")
with open(OUTPUT_FILE,"w",newline="") as file:
    writer = csv.writer(file)
    writer.writerow(header)
    writer.writerows(rows)
print("Dataset created successfully!")
print("Samples:", len(rows))
print("Saved to:", OUTPUT_FILE)