import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8800/server/user/loggeduser", { withCredentials: true });
      setUserDetails(res.data.details);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUserDetails(null);
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

      const userDetails = res.data.details;
      Cookies.set("user", JSON.stringify(userDetails), { expires: 7 });

      setUserDetails(userDetails);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:8800/server/user/logout", {}, { withCredentials: true });
    Cookies.remove("user");
    setUserDetails(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
