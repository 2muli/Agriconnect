import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const updateProfile = async ({ id, formData }) => {
  const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };
  return await axios.put(`http://localhost:8800/server/user/changeProfile/${id}`, formData, config);
};

const EditProfile = () => {
  const navigate = useNavigate();
  const { userDetails, isAuthenticated, setUserDetails,fetchUser } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !Cookies.get("user")) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    profile: null,
    first_name: userDetails?.first_name || "",
    last_name: userDetails?.last_name || "",
  });

  const { mutate: updateProfileMutation, isLoading: isUpdating } = useMutation({
    mutationFn: updateProfile,
    onSuccess: async (data) => {
      console.log("Updated user from API:", data.data);
    
      const updatedUser = data.data.updatedUser;
      
      // Update state & cookies
      setUserDetails((prev) => ({ ...prev, ...updatedUser }));
      Cookies.set("user", JSON.stringify(updatedUser), { expires: 7 });
    
      // Fetch the latest user details
      await fetchUser();
    
      alert("Profile updated successfully!");
      navigate("/profile");
    },
    
    onError: (error) => {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    },
  });

  const handleChange = (e) => {
    if (e.target.name === "profile") {
      setFormData({ ...formData, profile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("profile", formData.profile);
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);

    updateProfileMutation({ id: userDetails.id, formData: data });
  };

  if (isUpdating) return <p>Loading profile details...</p>;

  return (
    <div className="container w-100 d-flex justify-content-center align-items-center vh-100 mb-3">
      <div className="col-md-12 col-lg-6 mx-auto p-4 shadow rounded bg-info text-white overflow-auto mb-4" style={{ maxHeight: "90vh" }}>
        <h2 className="text-center mb-4 text-dark">Manage Profile</h2>
        <div className="text-center mb-4">
        <img
            src={userDetails.profile ? `http://localhost:8800/profile/${userDetails.profile}?timestamp=${Date.now()}` : "/default-profile.png"}
            alt="Profile"
            className="rounded-circle border border-white mb-3"
            style={{ width: "100px", height: "100px" }}
          />
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input type="file" name="profile" className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" name="first_name" className="form-control" onChange={handleChange} value={formData.first_name} />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" name="last_name" className="form-control" onChange={handleChange} value={formData.last_name} />
          </div>
          <button type="submit" className="btn btn-success w-100">Update Account</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
