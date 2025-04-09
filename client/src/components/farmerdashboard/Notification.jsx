import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const fetchNotifications = async () => {
  try {
    const response = await axios.get("http://localhost:8800/server/notification/getMyNotifications/", {
      withCredentials: true,
    });
    console.log("Fetched Notifications:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
};

const deleteNotification = async (id) => {
  if (!id) throw new Error("Invalid notification ID");
  await axios.delete(`http://localhost:8800/server/notification/deleteNotification/${id}`, {
    withCredentials: true,
  });
  return id;
};

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { isAuthenticated, userDetails } = useAuth();
  const navigate = useNavigate();
  const rowsPerPage = 10;

  useEffect(() => {
    if (!isAuthenticated || !Cookies.get("user")) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const { data: notifications = [], isError, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 300,
    retry: false,
  });
  
  const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["notifications"], (oldData) =>
        oldData ? oldData.filter((notification) => notification.id !== deletedId) : []
      );
      alert("Notification deleted successfully!");
    },
    onError: () => alert("Failed to delete notification."),
  });

  const totalPages = notifications && Array.isArray(notifications) ? Math.ceil(notifications.length / rowsPerPage) : 1;
  const currentRows = Array.isArray(notifications)
    ? notifications.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading ) return <span>Loading...</span>;
  if (isError) {
    return error.message.includes("Unauthorized") ? (
      <div className="text-center text-danger">
        <p>Session expired. Please <Link to="/login">log in</Link> again.</p>
      </div>
    ) : (
      <span className="text-danger">Network error! Retry later.</span>
    );
  }
console.log(currentRows)
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
              <th>From/To</th>
              <th>Phone</th>
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

                  <td>
                    <span className={userDetails.id === row.sender_id ? "text-success" : "text-primary"}>
                      {userDetails.id === row.sender_id ? (
                        <>
                          <i className="bi bi-arrow-up-right-circle"></i> To:
                        </>
                      ) : (
                        <>
                          <i className="bi bi-arrow-down-left-circle"></i> From:
                        </>
                      )}
                    </span>
                    <br />

                    {userDetails.id !== row.sender_id
                      ? `${row.sender_first_name || "Unknown"} ${row.sender_last_name || "Unknown"}`
                      : `${row.receiver_first_name || "Unknown"} ${row.receiver_last_name || "Unknown"}`}
                  </td>
                  <td>
                    {userDetails.id !== row.sender_id ? row.sender_phone || "Unknown" : row.receiver_phone || "Unknown"}
                  </td>
                  <td>{row.notification || "No message"}</td>
                  <td>{row.created_at ? format(new Date(row.created_at), "MMM dd, yyyy") : "N/A"}</td>
                  <td>
                    <div className="d-flex">
                      {userDetails.id === row.sender_id && (
                        <Link to={`/editnotification/${row.id || "#"}`}>
                          <button className="btn btn-primary btn-sm me-2">
                            <i className="d-none d-sm-inline bi bi-pencil"></i> Edit
                          </button>
                        </Link>
                      )}
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
