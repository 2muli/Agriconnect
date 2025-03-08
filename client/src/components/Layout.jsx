import { useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(true); // Added setIsLogged for potential future use

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      {isLogged && <Sidebar isSidebarOpen={isSidebarOpen} />}
    </div>
  );
};

export default Layout;