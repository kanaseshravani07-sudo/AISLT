from pathlib import Path
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

BASE_DIR = Path(__file__).resolve().parents[2]
DATASET = BASE_DIR / "backend" / "training" / "dataset.csv"
MODEL_DIR = BASE_DIR / "model"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

print("Dataset path:", DATASET)
print("Model dir:", MODEL_DIR)

if not DATASET.exists():
    raise FileNotFoundError(f"Dataset not found: {DATASET}")

print("Loading dataset...")
df = pd.read_csv(DATASET)
X = df.drop("label", axis=1)
y = df["label"]
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded)

model = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
print("Training model...")

model.fit(X_train, y_train)
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy * 100:.2f}%")

print("Classification report:")
print(classification_report(y_test, predictions))

print("Confusion matrix:")
print(confusion_matrix(y_test, predictions))

joblib.dump(model, MODEL_DIR / "sign_model.pkl")
joblib.dump(encoder, MODEL_DIR / "label_encoder.pkl")
print("Model saved successfully to:", MODEL_DIR)
