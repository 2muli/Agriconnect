import { useState } from "react";
import { Outlet } from "react-router-dom"; // ✅ Allows nested pages to render inside layout
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isAuthenticated && <Sidebar isSidebarOpen={isSidebarOpen} />}
        <div className="flex-grow-1 p-3">
          {/* ✅ All page content (Home, Dashboard, Profile, etc.) will appear here */}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
