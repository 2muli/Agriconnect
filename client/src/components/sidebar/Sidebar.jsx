import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ isSidebarOpen }) => {
  const [farmer, setFarmer] = useState(false);

  return (
    <div className="wrapper">
      <div id="sidebar" className={isSidebarOpen ? "active" : ""}>
        {farmer ? (
          <div>
            <div className="sidebar-header">
              <h3>Farmer Dashboard</h3>
            </div>
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
                <Link to="/education" className='nav-link'>
                  <i className="bi bi-caret-left-square-fill"></i>
                  <span>Education</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/support" className='nav-link'>
                  <i className="bi bi-chat-fill"></i>
                  <span>Support</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/logout" className='nav-link'>
                  <i className='bi bi-box-arrow-right'></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <div className="sidebar-header">
              <h3>Dashboard</h3>
            </div>
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
                <Link to="/farmerprofile" className='nav-link'>
                  <i className="bi bi-person-fill"></i>
                  <span>Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/support" className='nav-link'>
                  <i className="bi bi-chat-fill"></i>
                  <span>Support</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/logout" className='nav-link'>
                  <i className='bi bi-box-arrow-right'></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
