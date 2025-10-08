import 'bootstrap-icons/font/bootstrap-icons.css';
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import "./sidebar.css";

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [isFarmer, setIsFarmer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const user = Cookies.get("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setIsFarmer(parsedUser.role === "Farmer");
      }
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!isAuthenticated) {
    return null; // Hide sidebar if not authenticated
  }

  return (
    <div className="navbar navbar-expand-lg fixed-top">
      <div className="wrapper">
        <div id="sidebar" className={isSidebarOpen ? "active" : ""}>
          <ul className="components">
            <li className='nav-item'>
              <Link to={isFarmer ? "/fdashboard" : "/bdashboard"} className='nav-link'>
                <i className="bi bi-house-door"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li className='nav-item'>
              <Link to={isFarmer ? "/produce" : "/produceb"} className='nav-link'>
                <i className="bi bi-crop"></i>
                <span>{isFarmer ? "Produce" : "Available Produce"}</span>
              </Link>
            </li>

            <li className='nav-item'>
              <Link to={isFarmer ? "/orders" : "/ordersf"} className='nav-link'>
                <i className="bi bi-cart"></i>
                <span>{isFarmer ? "Orders" : "Order History"}</span>
              </Link>
            </li>

           {!isFarmer && <li className='nav-item'>
              <Link to={isFarmer ? "/earning" : "/transaction"} className='nav-link'>
               <i className="bi bi-cash"></i>
                <span>Transactions</span>
              </Link>
            </li>}

            <li className='nav-item'>
              <Link to="/notification" className='nav-link'>
                <i className='bi bi-bell'></i>
                <span>Notifications</span>
              </Link>
            </li>

            {/* My Account with Dropdown & Chevron */}
            <li className='nav-item'>
              <span 
                onClick={toggleSubmenu} 
                className="nav-link d-flex justify-content-between align-items-center" 
                style={{ cursor: "pointer" }}
              >
                <span>
                  <i className='bi bi-person'></i> <span>My Account</span>
                </span>
                <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`} />
              </span>
              
              {/* Submenu with Spacing */}
              <ul className={`nav flex-column ms-3 mt-2 ${isOpen ? "show" : "collapse"}`} id="submenu2">
                <li className="w-100">
                  <Link to="/profile" className="nav-link px-2" style={{ marginLeft: "10px" }}>
                    <i className="bi bi-person"></i>
                    <span className="d-sm-inline ms-2">Profile</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/editProfile" className="nav-link px-2" style={{ marginLeft: "10px" }}>
                    <i className="bi bi-person-gear"></i>
                    <span className="d-none d-sm-inline ms-2">Change Account</span>
                    <span className="d-inline d-sm-none ms-2">Update</span>
                  </Link>
                </li>
                <li className='w-100'>
                  <Link to="/changePassword" className="nav-link px-2" style={{ marginLeft: "10px" }}>
                    <i className="bi bi-key"></i>
                    <span className="d-sm-inline ms-2">Password</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className='nav-item logout'>
            <Link onClick={handleLogout} className='nav-link'>
              <i className='bi bi-box-arrow-right'></i>
              <span>Logout</span>
            </Link>
          </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
