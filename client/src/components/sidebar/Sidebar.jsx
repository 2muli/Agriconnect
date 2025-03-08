import 'bootstrap-icons/font/bootstrap-icons.css';
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import "./sidebar.css";

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout, userDetails, isAuthenticated } = useAuth();
  const [isFarmer, setIsFarmer] = useState(false);

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

  return (
    <div className="navbar navbar-expand-lg fixed-top">
      <div className="wrapper">
        <div id="sidebar" className={isSidebarOpen ? "active" : ""}>
          {isFarmer ? (
            <div>
              <ul className="components">
                <li className='nav-item'>
                  <Link to="/fdashboard" className='nav-link'>
                    <i className="bi bi-house-door"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/produce" className='nav-link'>
                    <i className="bi bi-crop"></i>
                    <span>Produce</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/orders" className='nav-link'>
                    <i className="bi bi-cart"></i>
                    <span>Orders</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/earning" className='nav-link'>
                    <i className="bi bi-cash"></i>
                    <span>Earnings</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/notification" className='nav-link'>
                    <i className='bi bi-bell'></i>
                    <span>Notifications</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/farmerprofile" className='nav-link'>
                    <i className="bi bi-person-fill"></i>
                    <span>Profile</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link onClick={handleLogout} className='nav-link'>
                    <i className='bi bi-box-arrow-right'></i>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="components">
                <li className='nav-item'>
                  <Link to="/bdashboard" className='nav-link'>
                    <i className="bi bi-house-door"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/produceb" className='nav-link'>
                    <i className="bi bi-crop"></i>
                    <span>Available Produce</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/ordersf" className='nav-link'>
                    <i className="bi bi-cart"></i>
                    <span>Order History</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/transaction" className='nav-link'>
                    <i className="bi bi-cash"></i>
                    <span>Transactions</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/notification" className='nav-link'>
                    <i className='bi bi-bell'></i>
                    <span>Notifications</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/buyerprofile" className='nav-link'>
                    <i className="bi bi-person-fill"></i>
                    <span>Profile</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link onClick={handleLogout} className='nav-link'>
                    <i className='bi bi-box-arrow-right'></i>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;