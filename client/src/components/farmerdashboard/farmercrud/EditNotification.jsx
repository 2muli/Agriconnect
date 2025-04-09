import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const fetchNotificationById = async (id) => {
  const response = await axios.get(`http://localhost:8800/server/notification/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

const updateNotification = async ({ id, updatedNotification }) => {
  return await axios.put(
    `http://localhost:8800/server/notification/updateNotification/${id}`,
    updatedNotification,
    { withCredentials: true }
  );
};

const fetchReceiver = async () => {
  try {
    const response = await axios.get("http://localhost:8800/server/user/getFarmer", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("❌ Error fetching receiver:", err);
    throw new Error("Failed to fetch receiver");
  }
};

const EditNotification = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch notification details
  const { data: notification, isLoading, isError } = useQuery({
    queryKey: ["notification", id],
    queryFn: () => fetchNotificationById(id),
    enabled: !!id,
  });

  // Fetch available receivers
  const { data: receiver, isLoading: isReceiversLoading, isError: isReceiversError } = useQuery({
    queryKey: ["receiver"],
    queryFn: fetchReceiver,
  });

  // Local state for form fields
  const [formData, setFormData] = useState({
    receiver_id: "",
    notification: "",
  });

  useEffect(() => {
    if (notification && notification.length > 0) {
      setFormData({
        receiver_id: notification[0].receiver_id || "",
        notification: notification[0].notification || "",
      });
    }
  }, [notification]);

  // Mutation for updating notification
  const { mutate: updatenotificationMutation, isLoading: isUpdating } = useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      alert("Notification updated successfully!");
      navigate("/notification");
    },
    onError: (error) => {
      console.error("Error updating notification:", error);
      alert("Failed to update notification.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatenotificationMutation({ id, updatedNotification: formData });
  };

  if (isLoading) return <p>Loading notification details...</p>;
  if (isError) return <p>Error fetching notification details.</p>;

  return (
    <div className="container mt-4 text-dark">
      <div className="d-flex justify-content-start mb-2">
        <h1>Edit Notification</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Dropdown for selecting receiver */}
        <label>Select Receiver:</label>
        {isReceiversLoading ? <p>Loading receivers...</p> : null}
        <select
          className="form-control mb-3 w-75 w-100-sm"
          onChange={handleChange}
          name="receiver_id"
          value={formData.receiver_id} // ✅ Ensures selected value
        >
          <option value="">Select a receiver</option>
          {receiver &&
            receiver.map((receive) => (
              <option key={receive.id} value={receive.id}>
                {receive.first_name} {receive.last_name} ({receive.phone_number})
              </option>
            ))}
        </select>

        <div className="form-group">
          <label htmlFor="inputPassword1">Notification</label>
          <textarea
            type="text"
            className="form-control mb-3 w-75 w-100-sm"
            id="inputPassword1"
            onChange={handleChange}
            name="notification"
            value={formData.notification}
          />
        </div>

        <button type="submit" className="btn btn-success w-25 mt-2 me-3" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update"}
        </button>

        <Link to="/notification">
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

export default EditNotification;
