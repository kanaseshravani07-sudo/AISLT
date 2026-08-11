function About() {

  return (
    <div className="page">
      <section className="page-header">
        <span className="eyebrow">ABOUT SIGNBRIDGE</span>
        <h1>Building a bridge through technology.</h1>
        <p>
          SignBridge is an AI-based Indian Sign Language
          recognition project designed to make communication
          more accessible.
        </p>
      </section>
      <section className="about-content">
        <div className="about-block">
          <span className="about-number">01</span>
          <div>
            <h2>The Problem</h2>
            <p>
              Communication can become difficult when people
              do not understand sign language. Existing
              communication gaps can create barriers in
              education, public services and everyday
              interactions.
            </p>
          </div>
        </div>
        <div className="about-block">
          <span className="about-number">02</span>
          <div>
            <h2>Our Solution</h2>
            <p>
              SignBridge uses computer vision, hand landmark
              detection and machine learning to recognize
              Indian Sign Language alphabet gestures through
              a webcam.
            </p>
          </div>
        </div>
        <div className="about-block">
          <span className="about-number">03</span>
          <div>
            <h2>Technology</h2>
            <div className="technology-list">
              <span>React</span>
              <span>FastAPI</span>
              <span>Python</span>
              <span>MediaPipe</span>
              <span>Scikit-learn</span>
              <span>Computer Vision</span>
            </div>
          </div>
        </div>
      </section>
      <section className="team-section">
        <div className="section-heading">
          <span className="eyebrow">THE TEAM</span>
          <h2>Meet the people behind SignBridge</h2>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">SK</div>
            <h3>Shravani Subhash Kanase</h3>
            <p>AI/Full Stack Developer</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">PRC</div>
            <h3>Protyay Roy Choudhary</h3>
            <p>Machine Learning</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">KK</div>
            <h3>Krutika Khandekar</h3>
            <p>UI/Frontend</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">TM</div>
            <h3>Tanishka Mhatre</h3>
            <p>UI/Frontend</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;