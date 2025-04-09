import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // State to track navbar open/close
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login"); // ✅ Ensures proper redirection
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "green",display: 'relative' }}>
      <div className="container-fluid">
        
        {/* Sidebar Toggle Button */}
        {isAuthenticated && (
          <span
            onClick={toggleSidebar}
            style={{ cursor: "pointer", fontSize: "24px", color: "white", marginRight: "15px" }}
          >
            ☰
          </span>
        )}

        {/* Navbar Toggle Button (Using React State) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)} // Toggle state manually
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavbarOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse Content */}
        <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarSupportedContent">
          {/* Left Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active text-white" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle text-white" role="button">
                Agriculture
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item">Crop</Link></li>
                <li><Link className="dropdown-item">Livestock</Link></li>
              </ul>
            </li>
            <li className="nav-item"><Link to="/contact" className="nav-link text-white">Contact us</Link></li>
            <li className="nav-item"><Link to="/help" className="nav-link text-white">Help</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link text-white">About</Link></li>
            <li className="nav-item"><Link to="/faq" className="nav-link text-white">FAQs</Link></li>
          </ul>

          {/* Right Side Sign Up/Sign In Links */}
          {!isAuthenticated ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link to="/register" className="nav-link text-white"><button className="btn btn-outline-light">Sign up</button></Link></li>
              <li className="nav-item"><Link to="/login" className="nav-link text-white"><button className="btn btn-outline-light">Sign in</button></Link></li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button type="button" onClick={handleLogout} className="btn btn-outline-light">
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
