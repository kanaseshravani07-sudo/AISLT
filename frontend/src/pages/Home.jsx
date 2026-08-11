import {Link} from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="eyebrow">
              AI-POWERED INDIAN SIGN LANGUAGE
            </div>
            <h1>Communication without<span> barriers.</span></h1>
            <p>
              SignBridge is an AI-powered platform that
              recognizes Indian Sign Language alphabet
              gestures and converts them into text using
              computer vision and machine learning.
            </p>
            <div className="hero-buttons">
              <Link to="/translate" className="primary-button">Start Translating<span>→</span></Link>
              <Link to="/about" className="secondary-button">Learn More</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-box">
              <div className="visual-label">SIGNBRIDGE AI</div>
              <div className="visual-hand">🤟</div>
              <div className="visual-result"><span>Detected Sign</span><strong>A</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section className="features section">
        <div className="section-heading">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>From gesture to text</h2>
          <p>
            SignBridge uses computer vision and machine
            learning to make sign recognition accessible.
          </p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <h3>Show a Sign</h3>
            <p>
              Position your hand in front of the webcam
              and perform an Indian Sign Language gesture.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">02</div>
            <h3>AI Detection</h3>
            <p>
              Computer vision detects your hand landmarks
              and processes them using a trained ML model.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">03</div>
            <h3>Get the Result</h3>
            <p>
              The recognized sign is converted into a
              readable alphabet character.
            </p>
          </div>
        </div>
      </section>
      <section className="why-section">
        <div className="why-container">
          <div>
            <span className="eyebrow">OUR PURPOSE</span>
            <h2>Technology that connects people.</h2>
          </div>
          <p>
            SignBridge aims to reduce communication barriers
            by using accessible AI technology to understand
            Indian Sign Language. The current system focuses
            on alphabet recognition while providing a
            foundation for future word and sentence-level
            translation.
          </p>
        </div>
      </section>
      <section className="cta-section">
        <h2>Ready to try SignBridge?</h2>
        <p>
          Use your webcam and let the AI recognize
          an Indian Sign Language gesture.
        </p>
        <Link to="/translate" className="primary-button">Open Translator →</Link>
      </section>
    </div>
  );
}

export default Home;