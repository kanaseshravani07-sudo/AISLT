import {useRef, useState} from "react";
import Webcam from "react-webcam";
import { predictSign } from "../services/api";

function WebcamCapture({ onPrediction }) {
  const webcamRef = useRef(null);
  const [prediction, setPrediction] = useState("-");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [handDetected, setHandDetected] = useState(false);
  const capture = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    try {
      setLoading(true);
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const result = await predictSign(blob);
      console.log("Prediction result:", result);
      if (result.success){
        const predictedLetter = result.prediction;
        setPrediction(predictedLetter);
        setConfidence(result.confidence || 0);
        setHandDetected(true);
        if(onPrediction) {
          onPrediction(predictedLetter);
        }
      }else{
        setPrediction("—");
        setConfidence(0);
        setHandDetected(false);
      }
    }catch(error) {
      console.error("Prediction error:", error);
      setPrediction("!");
      setConfidence(0);
      setHandDetected(false);
    }finally {
      setLoading(false);
    }
  };
  return (
    <div className="webcam-wrapper">
      <div className="webcam-frame">
        <Webcam ref={webcamRef} audio={false} screenshotFormat="image/jpeg"
         videoConstraints={{
            facingMode: "user",
          }}
          className="webcam-video"
        />
        <div className="camera-overlay">
          <div className="hand-guide">
            <div className="guide-icon">🤚</div>
            <span>Place your hand here</span>
          </div>
        </div>
        <div className="camera-info">
          <div className="hand-status">
            <span className={ handDetected ? "indicator active" : "indicator"}></span>
            {handDetected ? "Hand detected" : "Waiting for hand"}
          </div>
        </div>
      </div>
      <div className="prediction-result">
        <div className="prediction-label">AI PREDICTION</div>
        <div className="prediction-letter">{loading ? "..." : prediction}</div>
        <div className="prediction-text"> {loading
            ? "Analyzing your gesture..."
            : prediction === "-"
            ? "Perform a sign and click Predict Sign"
            : prediction === "!"
            ? "Prediction failed"
            : `Detected letter: ${prediction}`}
        </div>
      </div>
      <div className="prediction-controls">
        <div className="confidence">
          <div className="confidence-top">
            <span>Confidence</span>
            <strong>confidence.toFixed(1)%</strong>
          </div>
          <div className="confidence-bar">
            <div className="confidence-fill" style={{ width: `${confidence}%`,}}></div>
          </div>
        </div>
        <button className="predict-button"
          onClick={capture}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              🤟 Predict Sign
            </>
          )}
        </button>

      </div>

    </div>
  );
}

export default WebcamCapture;
