import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const fetchTransactionById = async (id) => {
  const response = await axios.get(
    `http://localhost:8800/server/transaction/${id}`,
    { withCredentials: true }
  );
  return response.data;
};

const updateTransaction = async ({ id, updatedData }) => {
  return await axios.put(
    `http://localhost:8800/server/transaction/${id}`,
    updatedData,
    { withCredentials: true }
  );
};

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing transaction data
  const {
    data: transaction,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransactionById(id),
  });

  const [formData, setFormData] = useState({
    farmer_id: "",
    crop_name: "",
    crop_quantity: "",
    unit_price: "",
    transactionDate: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        farmer_id: transaction.farmer_id || "",
        crop_name: transaction.crop_name || "",
        crop_quantity: transaction.crop_quantity || "",
        unit_price: transaction.unit_price || "",
        transactionDate: transaction.transactionDate?.split("T")[0] || "",
      });
    }
  }, [transaction]);

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      alert("Transaction updated successfully!");
      navigate("/transaction");
    },
    onError: (err) => {
      console.error(err);
      alert("Failed to update transaction");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ id, updatedData: formData });
  };

  if (isLoading) return <span>Loading transaction...</span>;
  if (isError) return <span>Error fetching transaction</span>;

  return (
    <div className="container mt-4 text-black fs-3">
      <div className="d-flex justify-content-start mb-2 text-white">
        <h1>Edit Transaction</h1>
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
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
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

export default EditTransaction;
