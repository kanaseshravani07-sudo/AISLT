import {useState} from "react";
import WebcamCapture from "../components/WebcamCapture";

function Translate() {
  const [latestPrediction, setLatestPrediction] = useState("-");
  return (
    <div className="translate-page">
      <section className="translate-header">
        <div className="eyebrow">AI-POWERED TRANSLATION</div>
        <h1>Indian Sign Language <span>Translator</span></h1>
        <p>
          Use your webcam to perform an Indian Sign Language alphabet
          gesture and let SignBridge recognize it using computer vision
          and machine learning.
        </p>
      </section>
      <div className="translator-status-bar">
        <div className="status-indicator"><span className="status-dot"></span>AI Model Ready</div>
      </div>
      <section className="translator-container">
        <aside className="translator-info">
          <div className="translator-status">LIVE TRANSLATOR</div>
          <h2>Turn gestures into<br />meaningful text.</h2>
          <p>
            Position your hand inside the camera frame and perform
            an Indian Sign Language alphabet gesture.
          </p>
          <div className="translator-features">
            <div className="translator-feature">
              <div className="translator-feature-icon">01</div>
              <div className="translator-feature-text">
                <strong>Position your hand</strong>
                <span>Keep your hand clearly visible and centered.</span>
              </div>
            </div>
            <div className="translator-feature">
              <div className="translator-feature-icon">02</div>
              <div className="translator-feature-text">
                <strong>Perform a sign</strong>
                <span>Hold the ISL alphabet gesture steadily.</span>
              </div>
            </div>
            <div className="translator-feature">
              <div className="translator-feature-icon">03</div>
              <div className="translator-feature-text">
                <strong>Get prediction</strong>
                <span>The AI model identifies the corresponding letter.</span>
              </div>
            </div>
          </div>
          <div className="translator-note">
            <span>!</span>
            <p>
              For better accuracy, use good lighting and keep
              your complete hand inside the camera frame.
            </p>
          </div>
        </aside>
        <main className="translator-workspace">
          <div className="translator-camera">
            <div className="camera-header">
              <div className="camera-title">
                <div className="camera-title-icon">◉</div>
                <div>
                  <h3>Camera Input</h3>
                  <span>Live hand detection</span>
                </div>
              </div>
              <div className="camera-live"><span className="camera-live-dot"></span>LIVE</div>
            </div>
            <div className="camera-frame">
              <WebcamCapture onPrediction={(letter)=>setLatestPrediction(letter)}/>
            </div>
          </div>
        </main>
      </section>
      <section className="current-prediction">
        <div className="eyebrow">AI RESULT</div>
        <h2>Predicted Letter</h2>
        <div className="big-prediction">{latestPrediction}</div>
        <p>{latestPrediction === "-"? "No prediction yet. Perform a sign and click Predict Sign.": `The AI model predicted the letter "${latestPrediction}".`}</p>
      </section>
    </div>
  );
}

export default Translate;
