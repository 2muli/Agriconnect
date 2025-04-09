import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Fetch all farmers
const fetchReceiver = async () => {
  const response = await axios.get("http://localhost:8800/server/user/getFarmer", {
    withCredentials: true,
  });
  return response.data;
};

// Fetch crops for selected seller (receiverId)
const fetchCrops = async ({ seller_id }) => {
  if (!seller_id) return [];
  const response = await axios.get(`http://localhost:8800/server/crop/user/${seller_id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Add a new order
const addOrder = async ({ seller_id, crop_id, quantity }) => {
  const response = await axios.post(
    "http://localhost:8800/server/order/addOrder",
    { seller_id, crop_id, quantity },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const AddOrder = () => {
  const [receiverId, setReceiverId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cropId, setCropId] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  // Fetch farmers (receivers)
  const {
    data: receivers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["receiver"],
    queryFn: fetchReceiver,
    retry: false, // Prevents retry loops
    onError: (err) => console.error("❌ Fetch Receiver Error:", err),
  });

  // Fetch crops based on selected farmer (receiverId)
  const {
    data: crops = [],
    isLoading: loadingCrops,
    isError: cropError,
  } = useQuery({
    queryKey: ["crops", receiverId],
    queryFn: () => fetchCrops({ seller_id: receiverId }),
    enabled: !!receiverId,
    retry: false,
    onError: (err) => console.error("❌ Fetch Crops Error:", err),
  });

  const mutation = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      navigate("/ordersf");
      alert("Order added successfully");
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiverId || !quantity || !cropId) {
      setErrorMsg("Please select a receiver, crop, and enter a quantity!");
      return;
    }
    mutation.mutate({ seller_id: receiverId, crop_id: cropId, quantity });
  };
console.log(cropError);
  return (
    <div className="container mt-4 text-black fs-3">
      <h1 className="mb-3 text-white">Add Order</h1>

      {/* Error Handling */}
      {isError && <div className="alert alert-danger">Error fetching farmers: {error.message}</div>}

      {/* Show loading only inside the form, not remove everything */}
      {isLoading ? (
        <div className="text-white">Loading farmers...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Farmer Selection */}
          <div className="form-group">
            <label>Farmer Name</label>
            <select
              className="form-control mb-3 w-75 w-100-sm"
              value={receiverId}
              onChange={(e) => {
                setReceiverId(e.target.value);
                setCropId(""); // Reset crop selection when receiver changes
              }}
            >
              <option value="">--Select Receiver--</option>
              {receivers.map((row) => (
                <option value={row.id} key={row.id}>
                  {row.first_name} {row.last_name} ({row.phone_number})
                </option>
              ))}
            </select>
          </div>

          {/* Crop Selection */}
          <div className="form-group">
            <label>Crop Name</label>
            {loadingCrops ? (
              <p className="text-white">Loading crops...</p>
            ) : crops.length === 0 && receiverId ? (
              <p className="text-danger">No crops available for this seller.</p>
            ) : (
              <select
                className="form-control mb-3 w-75 w-100-sm"
                value={cropId}
                onChange={(e) => setCropId(e.target.value)}
              >
                <option value="">--Select Crop--</option>
                {crops.map((row) => (
                  <option value={row.id} key={row.id}>
                    {row.crop_name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Quantity Input */}
          <div className="form-group">
            <label htmlFor="inputQuantity">Quantity</label>
            <input
              type="number"
              className="form-control mb-3 w-75 w-100-sm"
              id="inputQuantity"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          {/* Buttons */}
          <button type="submit" className="btn btn-success w-25 mt-2 me-3" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Saving..." : "Save"}
          </button>

          <Link to="/ordersf">
            <button type="button" className="btn btn-secondary w-25 mt-2">
              <i className="d-inline d-lg-none bi bi-arrow-left me-2"> Back</i>
              <i className="d-none d-sm-inline bi bi-arrow-left me-2"> Go Back</i>
            </button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default AddOrder;
