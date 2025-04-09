import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext';

const AddProduce = () => {
  const { userDetails, logout } = useAuth(); // ✅ Get logged-in farmer details
  const navigate = useNavigate();

  // 🌱 Form State
  const [formData, setFormData] = useState({
    crop_name: "",
    quantity: "",
    location: "",
    price: "",
    harvest_date: "",
  });

  // ✅ Ensure the user is logged in
  if (!userDetails) {
    logout();
    navigate("/login"); // Redirect to login if not authenticated
    return null;
  }
  // 🌱 Handle Form Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🌱 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/server/crop/addCrop",
        { ...formData, farmer_id: userDetails.id }, // ✅ Attach Farmer ID
        { withCredentials: true }
      );
      alert("Produce added successfully!");
      navigate("/produce"); // Redirect back to the produce list
    } catch (error) {
      console.error("Failed to add produce:", error);
      alert("Error adding produce.");
    }
  };

  return (
    <div className="container mt-4 text-black fs-3">
      <div className="d-flex justify-content-start text-white mb-2">
        <h1>Add Produce</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Crop Name</label>
          <input
            type="text"
            className="form-control mb-3 w-75 w-100-sm"
            name="crop_name"
            placeholder="Crop Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="text"
            className="form-control mb-3 w-75 w-100-sm"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control mb-3 w-75 w-100-sm"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price per unit (Ksh)</label>
          <input
            type="number"
            className="form-control mb-3 w-75 w-100-sm"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Harvest Date</label>
          <input
            type="date"
            className="form-control mb-3 w-75 w-100-sm"
            name="harvest_date"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-25 mt-2 me-3">Save</button>
        <Link to="/produce">
          <button type="button" className="btn btn-secondary w-25 mt-2">
          <i className="d-inline d-lg-none">Back</i>
            <i className="d-none d-sm-inline bi bi-arrow-left me-2">Go Back</i> 
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AddProduce;
// import { useMutation, useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// // Fetch receiver list
// const fetchReceiver = async () => {
//   try {
//     const response = await axios.get("http://localhost:8800/server/user/getFarmer", {
//       withCredentials: true, // Ensures cookies are sent
//     });
//     return response.data;
//   } catch (err) {
//     console.error("❌ Error fetching receiver:", err);
//     throw new Error("Failed to fetch receiver");
//   }
// };

// // Function to add a notification
// const addNotification = async ({ receiver_id, notification }) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8800/server/notification/addNotification",
//       { receiver_id, notification },
//       {
//         withCredentials: true, // Ensures cookies are sent
//       }
//     );
//     return response.data;
//   } catch (err) {
//     console.error("❌ Error adding notification:", err);
//     throw new Error("Failed to add notification");
//   }
// };

// const AddNotification = () => {
//   const [receiverId, setReceiverId] = useState("");
//   const [notification, setNotification] = useState("");
//   const [errorMsg, setErrorMsg] = useState(null);
//   const navigate = useNavigate();

//   // Fetch receivers
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["receiver"],
//     queryFn: fetchReceiver,
//   });

//   // Mutation for adding notification
//   const mutation = useMutation({
//     mutationFn: addNotification,
//     onSuccess: () => {
//       navigate("/notification"); // Redirect after success
//       alert("Notification added successfully");
//     },
//     onError: (error) => {
//       setErrorMsg(error.message);
//     },
//   });
// console.log(data)
//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!receiverId || !notification) {
//       setErrorMsg("Please select a receiver and enter a notification!");
//       return;
//     }

//     mutation.mutate({ receiver_id: receiverId, notification });
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error fetching receiver: {error.message}</div>;

//   return (
//     <div className="container mt-4 text-white fs-3">
//       <div className="d-flex text-white justify-content-start mb-2">
//         <h1>Add Notification</h1>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Receiver Name & Phone Number</label>
//           <br />
//           <br />
//           <select
//             className="form-control mb-3 w-75 w-100-sm"
//             value={receiverId}
//             onChange={(e) => setReceiverId(e.target.value)}
//           >
//             <option value="">--Select Receiver--</option>
//             {data?.map((row) => (
//               <option value={row.id} key={row.id}>
//                 {row.first_name} {row.last_name} {row.phone_number}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Notification</label>
//           <textarea
//             className="form-control mb-3 w-75 w-100-sm"
//             placeholder="Enter your notification here"
//             value={notification}
//             onChange={(e) => setNotification(e.target.value)}
//           />
//         </div>
//         {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
//         <button type="submit" className="btn btn-success w-25 mt-2 me-3" disabled={mutation.isLoading}>
//           {mutation.isLoading ? "Saving..." : "Save"}
//         </button>
//         <Link to="/notification">
//           <button type="button" className="btn btn-secondary w-25 mt-2">
//             <i className="bi bi-arrow-left me-2"></i>
//             <i className="d-none d-lg-inline">Go Back</i>
//             <i className="d-inline d-lg-none">Back</i>
//           </button>
//         </Link>
//       </form>
//     </div>
//   );
// };
