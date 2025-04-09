import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth(); // ✅ Corrected the typo

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      {isAuthenticated && <Sidebar isSidebarOpen={isSidebarOpen} />} {/* ✅ Now it works! */}
    </div>
  );
};

export default Layout;
