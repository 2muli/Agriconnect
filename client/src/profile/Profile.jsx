import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { userDetails, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !Cookies.get("user")) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!userDetails) return <p>Loading profile...</p>;

  return (
    <div className="container w-100 d-flex justify-content-center align-items-center vh-100 mb-3">
      <div className="col-md-12 col-lg-6 mx-auto p-4 shadow rounded bg-info text-white overflow-auto mb-4" style={{ maxHeight: "90vh" }}>
        <h2 className="text-center mb-4 text-dark">Profile</h2>
        <div className="text-center mb-4">
        <img
            src={userDetails.profile ? `http://localhost:8800/profile/${userDetails.profile}?timestamp=${Date.now()}` : "/default-profile.png"}
            alt="Profile"
            className="rounded-circle border border-white mb-3"
            style={{ width: "100px", height: "100px" }}
          />
        </div>

        <form>           
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" value={userDetails.first_name} readOnly />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" value={userDetails.last_name} readOnly />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={userDetails.email} readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" value={userDetails.phone_number} readOnly />
          </div>
          
          <Link to="/fdashboard">
            <button type="button" className="btn btn-success w-100">To dashboard</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Profile;
