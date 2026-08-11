import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo-mark">
            SB
          </div>
          <div>
            <h3>SignBridge</h3>
            <p>Connecting communication through AI.</p>
          </div>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/future-enhancements">Future Enhancements</Link>
          <Link to="/translate">Translate</Link>
        </div>
        <div className="footer-tech">
          <span>Built with</span>
          <strong>React · FastAPI · Python · ML</strong>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SignBridge. All rights reserved.</span>
        <span>Indian Sign Language Recognition</span>
      </div>
    </footer>
  );
}
export default Footer;