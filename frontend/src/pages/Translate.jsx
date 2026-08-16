import { useState } from "react";
import WebcamCapture from "../components/WebcamCapture";

const letters = [
  "A", "B", "C", "D", "E", "F",
  "G", "H", "I", "J", "K", "L",
  "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X",
  "Y", "Z"
];

function Translate() {
  const [latestPrediction, setLatestPrediction] = useState("-");

  return (
    <>
      <style>{`
        .translate-page {
          min-height: 100vh;
          background: #f5f7fa;
          color: #111827;
          padding-bottom: 80px;
        }

        /* =========================
           HEADER
        ========================= */

        .translate-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 70px 30px 35px;
        }

        .eyebrow {
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #0f766e;
          margin-bottom: 12px;
        }

        .translate-header h1 {
          margin: 0;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(36px, 5vw, 58px);
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -2px;
        }

        .translate-header h1 span {
          color: #0f766e;
        }

        .translate-header > p {
          max-width: 720px;
          margin-top: 20px;
          font-size: 17px;
          line-height: 1.7;
          color: #64748b;
        }

        /* =========================
           STATUS BAR
        ========================= */

        .translator-status-bar {
          max-width: 1200px;
          margin: 0 auto 25px;
          padding: 0 30px;
        }

        .translator-status-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 18px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
        }

        .status-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.12);
        }

        .status-text {
          color: #94a3b8;
          font-size: 12px;
        }

        /* =========================
           TRANSLATOR CONTAINER
        ========================= */

        .translator-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 30px;
          display: grid;
          grid-template-columns: 0.85fr 1.35fr;
          gap: 24px;
          align-items: stretch;
        }

        /* =========================
           LEFT INFORMATION PANEL
        ========================= */

        .translator-info {
          background: #0f172a;
          color: white;
          border-radius: 20px;
          padding: 34px;
          display: flex;
          flex-direction: column;
        }

        .translator-status {
          display: inline-flex;
          width: fit-content;
          padding: 7px 11px;
          border-radius: 6px;
          background: rgba(20, 184, 166, 0.12);
          color: #5eead4;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
        }

        .translator-info h2 {
          margin: 0;
          font-family: "Space Grotesk", sans-serif;
          font-size: 32px;
          line-height: 1.15;
          letter-spacing: -1px;
        }

        .translator-info > p {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.7;
          margin: 18px 0 30px;
        }

        .translator-features {
          display: flex;
          flex-direction: column;
          gap: 21px;
        }

        .translator-feature {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .translator-feature-icon {
          min-width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #334155;
          border-radius: 8px;
          color: #5eead4;
          font-size: 11px;
          font-weight: 800;
        }

        .translator-feature-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .translator-feature-text strong {
          font-size: 13px;
          color: #f8fafc;
        }

        .translator-feature-text span {
          font-size: 12px;
          line-height: 1.5;
          color: #64748b;
        }

        .translator-note {
          display: flex;
          gap: 12px;
          margin-top: auto;
          padding: 15px;
          border-radius: 10px;
          background: #1e293b;
          border: 1px solid #334155;
        }

        .translator-note > span {
          width: 22px;
          height: 22px;
          min-width: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f97316;
          color: white;
          font-size: 12px;
          font-weight: 800;
        }

        .translator-note p {
          margin: 0;
          color: #94a3b8;
          font-size: 11px;
          line-height: 1.6;
        }

        /* =========================
           RIGHT WORKSPACE
        ========================= */

        .translator-workspace {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
        }

        .camera-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px 4px 17px;
        }

        .camera-title {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .camera-title-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #f0fdfa;
          color: #0f766e;
          font-size: 18px;
        }

        .camera-title h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 800;
        }

        .camera-title span {
          display: block;
          margin-top: 3px;
          color: #94a3b8;
          font-size: 11px;
        }

        .camera-live {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 800;
          color: #dc2626;
          letter-spacing: 1px;
        }

        .camera-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ef4444;
        }

        .camera-frame {
          width: 100%;
          border-radius: 14px;
          overflow: hidden;
          background: #0f172a;
        }

        /* =========================
           PREDICTION RESULT
        ========================= */

        .current-prediction {
          max-width: 1200px;
          margin: 45px auto 0;
          padding: 35px 30px;
          text-align: center;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.04);
        }

        .current-prediction h2 {
          margin: 4px 0 5px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 26px;
        }

        .big-prediction {
          width: 100px;
          height: 100px;
          margin: 20px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: #0f172a;
          color: #5eead4;
          font-family: "Space Grotesk", sans-serif;
          font-size: 52px;
          font-weight: 800;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16);
        }

        .current-prediction > p {
          margin: 0;
          color: #64748b;
          font-size: 13px;
        }

        /* =========================
           ALPHABET GUIDE
        ========================= */

        .alphabet-section {
          max-width: 1200px;
          margin: 70px auto 0;
          padding: 0 30px;
        }

        .alphabet-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .alphabet-header h2 {
          margin: 5px 0 0;
          font-family: "Space Grotesk", sans-serif;
          font-size: 30px;
          letter-spacing: -1px;
        }

        .alphabet-header p {
          max-width: 500px;
          margin: 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }

        .alphabet-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 12px;
        }

        .alphabet-card {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #111827;
          border: 1px solid #e2e8f0;
          transition: 0.25s ease;
        }

        .alphabet-card:hover {
          transform: translateY(-5px);
          border-color: #14b8a6;
          box-shadow: 0 15px 35px rgba(15, 23, 42, 0.15);
        }

        .alphabet-image {
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #e9edf3;
        }

        .alphabet-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: 0.3s ease;
        }

        .alphabet-card:hover img {
          transform: scale(1.05);
        }

        .alphabet-letter {
          padding: 9px;
          text-align: center;
          font-family: "Space Grotesk", sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: white;
          background: #111827;
        }

        .alphabet-footer {
          margin-top: 20px;
          padding: 16px 18px;
          border-radius: 12px;
          background: #ecfdf5;
          border: 1px solid #d1fae5;
          color: #166534;
          font-size: 12px;
          line-height: 1.6;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 1000px) {
          .translator-container {
            grid-template-columns: 1fr;
          }

          .translator-info {
            padding: 28px;
          }

          .translator-note {
            margin-top: 30px;
          }

          .alphabet-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }

        @media (max-width: 700px) {
          .translate-header {
            padding: 50px 20px 30px;
          }

          .translator-status-bar,
          .translator-container,
          .current-prediction,
          .alphabet-section {
            padding-left: 20px;
            padding-right: 20px;
          }

          .translate-header h1 {
            font-size: 38px;
          }

          .translator-info h2 {
            font-size: 27px;
          }

          .alphabet-header {
            display: block;
          }

          .alphabet-header p {
            margin-top: 12px;
          }

          .alphabet-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 9px;
          }
        }

        @media (max-width: 450px) {
          .alphabet-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .translator-workspace {
            padding: 12px;
          }

          .current-prediction {
            margin-top: 30px;
          }
        }
      `}</style>

      <div className="translate-page">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <section className="translate-header">
          <div className="eyebrow">
            AI-POWERED TRANSLATION
          </div>

          <h1>
            Indian Sign Language <span>Translator</span>
          </h1>

          <p>
            Use your webcam to perform an Indian Sign Language alphabet
            gesture and let SignBridge recognize it using computer vision
            and machine learning.
          </p>
        </section>


        {/* =========================
            STATUS
        ========================= */}

        <div className="translator-status-bar">
          <div className="translator-status-inner">

            <div className="status-indicator">
              <span className="status-dot"></span>
              AI Model Ready
            </div>

            <span className="status-text">
              Real-time gesture recognition
            </span>

          </div>
        </div>


        {/* =========================
            MAIN TRANSLATOR
        ========================= */}

        <section className="translator-container">

          {/* LEFT SIDE */}

          <aside className="translator-info">

            <div className="translator-status">
              LIVE TRANSLATOR
            </div>

            <h2>
              Turn gestures into
              <br />
              meaningful text.
            </h2>

            <p>
              Position your hand inside the camera frame and perform
              an Indian Sign Language alphabet gesture.
            </p>

            <div className="translator-features">

              <div className="translator-feature">
                <div className="translator-feature-icon">
                  01
                </div>

                <div className="translator-feature-text">
                  <strong>Position your hand</strong>
                  <span>
                    Keep your hand clearly visible and centered.
                  </span>
                </div>
              </div>


              <div className="translator-feature">
                <div className="translator-feature-icon">
                  02
                </div>

                <div className="translator-feature-text">
                  <strong>Perform a sign</strong>
                  <span>
                    Hold the ISL alphabet gesture steadily.
                  </span>
                </div>
              </div>


              <div className="translator-feature">
                <div className="translator-feature-icon">
                  03
                </div>

                <div className="translator-feature-text">
                  <strong>Get prediction</strong>
                  <span>
                    The AI model identifies the corresponding letter.
                  </span>
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


          {/* RIGHT SIDE */}

          <main className="translator-workspace">

            <div className="camera-header">

              <div className="camera-title">

                <div className="camera-title-icon">
                  ◉
                </div>

                <div>
                  <h3>Camera Input</h3>
                  <span>Live hand detection</span>
                </div>

              </div>

              <div className="camera-live">
                <span className="camera-live-dot"></span>
                LIVE
              </div>

            </div>


            <div className="camera-frame">

              <WebcamCapture
                onPrediction={(letter) =>
                  setLatestPrediction(letter)
                }
              />

            </div>

          </main>

        </section>


        {/* =========================
            CURRENT PREDICTION
        ========================= */}

        <section className="current-prediction">

          <div className="eyebrow">
            AI RESULT
          </div>

          <h2>
            Predicted Letter
          </h2>

          <div className="big-prediction">
            {latestPrediction}
          </div>

          <p>
            {latestPrediction === "-"
              ? "No prediction yet. Perform a sign and click Predict Sign."
              : `The AI model predicted the letter "${latestPrediction}".`
            }
          </p>

        </section>


        {/* =========================
            ALPHABET GUIDE
        ========================= */}

        <section className="alphabet-section">

          <div className="alphabet-header">

            <div>
              <div className="eyebrow">
                ISL REFERENCE
              </div>

              <h2>
                Indian Sign Language Alphabet
              </h2>
            </div>

            <p>
              Use this alphabet guide as a visual reference while
              performing gestures in front of the camera.
            </p>

          </div>


          <div className="alphabet-grid">

            {letters.map((letter) => (

              <div
                className="alphabet-card"
                key={letter}
              >

                <div className="alphabet-image">

                  <img
                    src={`/alphabet/${letter}.jpg`}
                    alt={`Indian Sign Language sign for ${letter}`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                </div>

                <div className="alphabet-letter">
                  {letter}
                </div>

              </div>

            ))}

          </div>


          <div className="alphabet-footer">
            <strong>Tip:</strong> Keep your hand fully visible,
            maintain good lighting, and hold the gesture steadily
            for better prediction accuracy.
          </div>

        </section>

      </div>
    </>
  );
}

export default Translate;