import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    farmer_id: "",
    crop_name: "",
    crop_quantity: "",
    unit_price: "",
    transactionDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mutation for adding a new transaction
  const { mutate, isLoading } = useMutation({
    mutationFn: async (newTransaction) => {
      return await axios.post(
        "http://localhost:8800/server/transaction",
        newTransaction,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      alert("Transaction added successfully!");
      navigate("/transaction");
    },
    onError: (err) => {
      console.error("Error adding transaction:", err);
      alert("Failed to add transaction");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="container mt-4 mb-6 text-black fs-3">
      <div className="d-flex justify-content-start mb-2 text-white">
        <h1>Add Transaction</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Farmer Name</label>
          <input
            type="text"
            name="farmer_id"
            value={formData.farmer_id}
            onChange={handleChange}
            className="form-control mb-3 w-75 w-100-sm"
            placeholder="Enter Farmer Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Crop Name</label>
          <input
            type="text"
            name="crop_name"
            value={formData.crop_name}
            onChange={handleChange}
            className="form-control mb-3 w-75 w-100-sm"
            placeholder="Crop Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="crop_quantity"
            value={formData.crop_quantity}
            onChange={handleChange}
            className="form-control mb-3 w-75 w-100-sm"
            placeholder="Quantity"
            required
          />
        </div>

        <div className="form-group">
          <label>Price per unit (Ksh)</label>
          <input
            type="number"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            className="form-control mb-3 w-75 w-100-sm"
            placeholder="Price per unit"
            required
          />
        </div>

        <div className="form-group">
          <label>Transaction Date</label>
          <input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={handleChange}
            className="form-control mb-3 w-75 w-100-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-25 mt-2 me-3"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>

        <Link to="/transactions">
          <button type="button" className="btn btn-secondary w-25 mt-2">
            <i className="bi bi-arrow-left me-2"></i>Go Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AddTransaction;
