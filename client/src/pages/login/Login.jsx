import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./login.css";

const Login = () => {
  const [inputs, setInputs] = useState({ emailOrPhone: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.emailOrPhone || !inputs.password) {
      setError("All fields must be filled!");
      return;
    }
    try {
      await login(inputs);
      const user = JSON.parse(Cookies.get("user") || "{}");

      if (user.role === "Buyer") {
        navigate("/bdashboard");
      } else {
        navigate("/fdashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="h-100 gradient-form">
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="card rounded-3 text-black" style={{ maxWidth: "700px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <div className="row g-0">
            {/* Left Side (Form) */}
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <div className="card-body p-md-5 mx-md-4" style={{ width: "100%" }}>
                <div className="text-center">
                  <h3 className="mt-1 mb-5 pb-1">Login Form</h3>
                </div>
                {error && <p className="error text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="emailOrPhone"
                      className="form-control"
                      placeholder="Phone number or email address"
                      value={inputs.emailOrPhone}
                      onChange={handleChange}
                    />
                    <label className="form-label">Phone or Email</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                    <label className="form-label">Password</label>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-block gradient-custom-2 mb-3" type="submit">
                      Log in
                    </button>
                  </div>
                  <div className="text-center">
                    <Link to="/reset-password" className="text-muted small">Forgot password?</Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <p className="mb-0 me-2 text-muted">Don't have an account?</p>
                    <Link to="/register">
                      <button type="button" className="btn btn-outline-danger btn-sm">Register</button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            {/* Right Side (Gradient Background) */}
            <div className="col-lg-6 d-none d-lg-block gradient-custom-2">
              <img src="/Agriconnect.jpg" alt="Sample photo" className="img-fluid" style={{ borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem", height: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
