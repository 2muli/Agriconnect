import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ChangePassword = () => {
  const {  isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !Cookies.get("user")) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return axios
        .put("http://localhost:8800/server/user/changePassword", {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }, { withCredentials: true }) // Ensure cookies are sent
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.success) {
        alert("Password changed successfully!");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
        navigate("/profile");
      } else {
        setError(data.message);
      }
    },
    onError: (error) => {
      console.error("Password change error:", error.response); // Debugging
      setError(error.response?.data?.message || "Something went wrong!");
    },
  });
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Confirm password and new password do not match!");
      return;
    }

    mutation.mutate();
  };

  return (
    <div className="container w-100 d-flex justify-content-center align-items-center vh-100 mb-3">
      <div
        className="col-md-12 col-lg-6 mx-auto p-4 shadow rounded bg-info text-white overflow-auto mb-4"
        style={{ maxHeight: "90vh" }}
      >
        <h2 className="text-center mb-4 text-dark">Change Password</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="oldPassword" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="col-md-12">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="col-md-12">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
