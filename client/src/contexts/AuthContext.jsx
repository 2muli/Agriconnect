import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8800/server/user/loggeduser", { withCredentials: true });

      if (res.data.details) {
        setUserDetails(res.data.details);
        setIsAuthenticated(true);
        Cookies.set("user", JSON.stringify(res.data.details), { expires: 7 });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsAuthenticated(false);
      setUserDetails(null);
      Cookies.remove("user");
    }
  };

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/server/user/login",
        inputs.emailOrPhone.includes("@") 
          ? { email: inputs.emailOrPhone, password: inputs.password } 
          : { phone_number: inputs.emailOrPhone, password: inputs.password },
        { withCredentials: true }
      );

      if (res.data.details) {
        setUserDetails(res.data.details);
        setIsAuthenticated(true);
        Cookies.set("user", JSON.stringify(res.data.details), { expires: 7 });
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8800/server/user/logout", {}, { withCredentials: true });
      Cookies.remove("user");
      setUserDetails(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userDetails,fetchUser, setUserDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
