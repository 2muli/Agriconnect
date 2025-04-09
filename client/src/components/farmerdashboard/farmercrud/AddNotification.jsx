import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../../../contexts/AuthContext";
import "./ChatApp.css";

const socket = io("http://localhost:8800");

// Fetch Farmers
const fetchFarmers = async () => {
  try {
    const { data } = await axios.get("http://localhost:8800/server/user/getFarmer", { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Error fetching farmers:", error);
    throw new Error("Failed to fetch farmers");
  }
};

// Fetch User Notifications
const fetchUserNotifications = async () => {
  try {
    const { data } = await axios.get("http://localhost:8800/server/notification/getMyNotifications", { withCredentials: true });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

const AddNotification = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState("");
  const { isAuthenticated } = useAuth();

  const { data: farmers, isLoading, error } = useQuery({ queryKey: ["farmers"], queryFn: fetchFarmers });
  const { data: notifications, refetch: refetchNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchUserNotifications,
  });

  useEffect(() => {
    socket.on("receiveNotification", ({ sender }) => {
      if (selectedUser === sender) refetchNotifications();
    });
    return () => socket.off("receiveNotification");
  }, [selectedUser]);

  const notificationMutation = useMutation({
    mutationFn: async ({ receiver_id, notification }) => {
      await axios.post(
        "http://localhost:8800/server/notification/addNotification",
        { receiver_id, notification },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      socket.emit("sendNotification", { receiver_id: selectedUser, message: notification });
      alert("Notification sent!");
      setNotification("");
      refetchNotifications();
    },
  });
console.log(notifications)
  const sendNotification = () => {
    if (selectedUser && notification.trim()) {
      notificationMutation.mutate({ receiver_id: selectedUser, notification });
    }
  };

  if (isLoading) return <div>Loading farmers...</div>;
  if (error) return <div>Error loading farmers!</div>;

  return (
    <div className="chat-container">
      <div className="chat-row">
        <div className="users-list">
          <h5 className="users-title">Farmers</h5>
          <ul className="list-group">
            {farmers?.map((farmer) => (
              <li
                key={farmer.id}
                className={`list-group-item ${selectedUser === farmer.id ? "active" : ""}`}
                onClick={() => setSelectedUser(farmer.id)}
              >
                {farmer.first_name} {farmer.last_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-window">
          {selectedUser ? (
            <div>
              <h5 className="chat-header">Notifications with {selectedUser}</h5>
              <div className="chat-messages">
                {notifications?.length > 0 ? (
                  notifications.map((notif, index) => (
                    <div key={index} className="notification-item">
                      <span>{notif.notification}</span>
                      <small className="text-muted">
                        {notif.created_at ? new Date(notif.created_at).toLocaleString() : "N/A"}
                      </small>
                    </div>
                  ))
                ) : (
                  <div>No notifications yet.</div>
                )}
              </div>
              <div className="chat-input mt-2">
                <input
                  type="text"
                  placeholder="Enter notification..."
                  value={notification}
                  onChange={(e) => setNotification(e.target.value)}
                />
                <button onClick={sendNotification}>Notify</button>
              </div>
            </div>
          ) : (
            <h5 className="select-user">Select a farmer to view notifications</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNotification;
