import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// ✅ Fetch Notifications Function
const fetchNotifications = async () => {
  try {
    const response = await axios.get("http://localhost:8800/server/notification/getMyNotifications", {
      withCredentials: true, // Ensures cookies are sent
    });
    return response.data || [];
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized: Please log in again.");
    }
    console.error("❌ Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
};

// ✅ Delete Notification Function
const deleteNotification = async (id) => {
  if (!id) throw new Error("Invalid notification ID");

  await axios.delete(`http://localhost:8800/server/notification/deleteNotification/${id}`, {
    withCredentials: true,
  });

  return id; // Return deleted ID to update UI
};

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const rowsPerPage = 10;

  // ✅ Redirect if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated || !Cookies.get("user")) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // ✅ Fetch Notifications
  const { data: notifications = [], isError, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 300000,
    retry: false, // Avoid retrying on unauthorized errors
  });

  // ✅ Delete Notification Mutation
  const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((notification) => notification.id !== deletedId);
      });
      alert("Notification deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting notification:", error);
      alert("Failed to delete notification.");
    },
  });

  // ✅ Pagination Logic
  const totalPages = Math.max(1, Math.ceil(notifications.length / rowsPerPage));
  const currentRows = notifications.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ✅ Loading & Error Handling
  if (isLoading) return <span>Loading...</span>;
  if (isError) {
    return error.message.includes("Unauthorized") ? (
      <div className="text-center text-danger">
        <p>Session expired. Please <Link to="/login">log in</Link> again.</p>
      </div>
    ) : (
      <span className="text-danger">Network error! Retry later.</span>
    );
  }

  return (
    <div className="m-4 mx-auto p-5" style={{ maxHeight: "90vh" }}>
      <div className="d-flex justify-content-center mb-2 text-white">
        <h2>Recent Notifications</h2>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Link to="/addnotification">
          <button className="btn btn-success">
            <i className="bi bi-plus"></i> Add Notification
          </button>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Buyer Name</th>
              <th>Buyer Phone</th>
              <th>Notification</th>
              <th>Send Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, index) => (
                <tr key={row.id || index}>
                  <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td>{row.sender_id || "Unknown"}</td>
                  <td>{row.receiver_id || "Unknown"}</td>
                  <td>{row.notification || "No message"}</td>
                  <td>{row.created_at ? format(new Date(row.created_at), "MMM dd, yyyy") : "N/A"}</td>
                  <td>
                    <div className="d-flex">
                      <Link to={`/editnotification/${row.id || "#"}`}>
                        <button className="btn btn-primary btn-sm me-2">
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => row.id && handleDelete(row.id)}
                        disabled={isDeleting}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No notifications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(totalPages).keys()].map((num) => (
            <li key={num} className={`page-item ${currentPage === num + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(num + 1)}>{num + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Notification;
