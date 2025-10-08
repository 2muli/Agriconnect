import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    profile: null,
    role: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone_number: "",
    field: "",
    password: "",
    general: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Validation logic
  const validate = () => {
    let newErrors = { email: "", phone_number: "", field: "", password: "" };

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.password ||
      !formData.phone_number ||
      !formData.email ||
      !formData.role
    ) {
      newErrors.field = "All fields with * must be filled.";
    }

    if (!/^[0-9]{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be exactly 10 digits.";
    }

    // Corrected password length check
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (formData.password.length > 18) {
      newErrors.password = "Password can't exceed 18 characters.";
    }

    // Strong password regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:8800/server/user/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.field) {
        setErrors((prev) => ({
          ...prev,
          [err.response.data.field]: err.response.data.message,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Something went wrong. Please try again.",
        }));
      }
    }
  };

  return (
    <section className="h-100 d-flex justify-content-center align-items-center bg-transparent">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-8">
            <div className="card card-registration my-4" style={{ maxWidth: "900px" }}>
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="/Agriconnect.jpg"
                    alt="Sample"
                    className="img-fluid"
                    style={{ borderRadius: ".25rem", height: "100%" }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Registration Form</h3>
                    <form onSubmit={handleSubmit}>
                      {errors.field && <p className="text-danger">{errors.field}</p>}
                      {errors.general && <p className="text-danger">{errors.general}</p>}

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <input
                            type="text"
                            name="first_name"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                            placeholder="First name"
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <input
                            type="text"
                            name="last_name"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                            placeholder="Last name"
                          />
                        </div>
                      </div>

                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg mb-2"
                        onChange={handleChange}
                        placeholder="Email"
                      />
                      {errors.email && <small className="text-danger">{errors.email}</small>}

                      <select
                        name="role"
                        className="form-select form-select-lg mb-4"
                        onChange={handleChange}
                      >
                        <option value="">--select--</option>
                        <option value="Farmer">Farmer</option>
                        <option value="Buyer">Buyer</option>
                      </select>

                      <input
                        type="file"
                        name="profile"
                        className="form-control form-control-lg mb-4"
                        onChange={handleChange}
                      />

                      <input
                        type="text"
                        name="phone_number"
                        className="form-control form-control-lg mb-2"
                        onChange={handleChange}
                        placeholder="Phone Number"
                      />
                      {errors.phone_number && (
                        <small className="text-danger">{errors.phone_number}</small>
                      )}

                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg mb-4"
                        onChange={handleChange}
                        placeholder="Password"
                      />
                      {errors.password && (
                        <small className="text-danger">{errors.password}</small>
                      )}
                      <br />

                      <button
                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        type="submit"
                      >
                        Sign up
                      </button>
                    </form>

                    <div className="d-flex align-items-center justify-content-center mt-4">
                      <p className="mb-0 me-2 text-muted">Have an account?</p>
                      <Link to="/login">
                        <button className="btn btn-outline-danger btn-sm">Sign in</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
