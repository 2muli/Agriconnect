import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const fetchCropById = async (id) => {
  const response = await axios.get(`http://localhost:8800/server/crop/crop/${id}`, {
    withCredentials: true, // ✅ Ensures cookies are sent
  });
  return response.data;
};

const updateCrop = async ({ id, updatedCrop }) => {
  return await axios.put(`http://localhost:8800/server/crop/updateCrop/${id}`, updatedCrop, {
    withCredentials: true, // ✅ Ensures session cookies are included
  });
};


const EditProduce = () => {
  const { id } = useParams(); // Get crop ID from URL
  const navigate = useNavigate();

  // Fetch crop details
  const { data: crop, isLoading, isError } = useQuery({
    queryKey: ["crop", id],
    queryFn: () => fetchCropById(id),
    enabled: !!id, // Ensures query runs only if ID exists
  });

  // Local state for form fields
  const [formData, setFormData] = useState({
    crop_name: "",
    quantity: "",
    location: "",
    price: "",
    harvest_date: "",
  });

  useEffect(() => {
    if (crop && crop.length > 0) {
      setFormData({
        crop_name: crop[0].crop_name || "",
        quantity: crop[0].quantity || "",
        location: crop[0].location || "",
        price: crop[0].price || "",
        harvest_date: crop[0].harvest_date ? crop[0].harvest_date.split("T")[0] : "",
      });
    }
  }, [crop]);

  // Mutation for updating crop
  const { mutate: updateCropMutation, isLoading: isUpdating } = useMutation({
    mutationFn: updateCrop,
    onSuccess: () => {
      alert("Crop updated successfully!");
      navigate("/produce"); // Redirect after successful update
    },
    onError: (error) => {
      console.error("Error updating crop:", error);
      alert("Failed to update crop.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCropMutation({ id, updatedCrop: formData });
  };

  if (isLoading) return <p>Loading crop details...</p>;
  if (isError) return <p>Error fetching crop details.</p>;

  return (
    <div className="container mt-4 text-black fs-3">
      <div className="d-flex justify-content-start text-white mb-2">
        <h1>Edit Produce</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="crop_name">Crop Name</label>
          <input
            type="text"
            className="form-control mb-3 w-75 w-100-sm"
            id="crop_name"
            name="crop_name"
            placeholder="Crop Name"
            value={formData.crop_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            className="form-control mb-3 w-75 w-100-sm"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control mb-3 w-75 w-100-sm"
            id="location"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price per unit (Ksh)</label>
          <input
            type="number"
            className="form-control mb-3 w-75 w-100-sm"
            id="price"
            name="price"
            placeholder="Price per unit"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="harvest_date">Harvest Date</label>
          <input
            type="date"
            className="form-control mb-3 w-75 w-100-sm"
            id="harvest_date"
            name="harvest_date"
            value={formData.harvest_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-25 mt-2 me-3" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update"}
        </button>
        <Link to="/produce">
          <button type="button" className="btn btn-secondary w-25 mt-2">
            <i className="bi bi-arrow-left me-2"></i>
            <i className="d-none d-lg-inline">Go Back</i>
            <i className="d-inline d-lg-none">Back</i>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default EditProduce;
