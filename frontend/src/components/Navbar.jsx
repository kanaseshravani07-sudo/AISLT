import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [darkMode,setDarkMode]=useState(false);
  const toggleTheme=()=>{
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          <div className="logo-mark">
            SB
          </div>
          <span>SignBridge</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" className={({isActive})=>isActive?"nav-link active":"nav-link"}>Home</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive?"nav-link active":"nav-link"}>About</NavLink>
          <NavLink to="/future-enhancements" className={({isActive})=>isActive?"nav-link active":"nav-link"}>Future Enhancements</NavLink>
          <NavLink to="/translate" className={({isActive})=>isActive?"nav-link translate-link active":"nav-link translate-link"}>🤟 Translate</NavLink>
          <button className="theme-button" onClick={toggleTheme}>
            <span>{darkMode?"☀":"☾"}</span>
            <span>Theme</span>
            <span className="theme-arrow">▾</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;