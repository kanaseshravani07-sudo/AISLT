import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

DATASET="training/dataset.csv"
df=pd.read_csv(DATASET)
X=df.drop("label", axis=1)
y=df["label"]
encoder=LabelEncoder()
y_encoded=encoder.fit_transform(y)
X_train, X_test, y_train, y_test = train_test_split(X,y_encoded,test_size=0.2,random_state=42,stratify=y_encoded)

model=RandomForestClassifier(n_estimators=200,random_state=42,n_jobs=-1)
print("Training model...")

model.fit(X_train,y_train)
predictions=model.predict(X_test)
accuracy = accuracy_score(y_test,predictions)
print(f"Accuracy: {accuracy * 100:.2f}%")
joblib.dump(model,"model/sign_model.pkl")
joblib.dump(encoder,"model/label_encoder.pkl")
print("Model saved successfully!")