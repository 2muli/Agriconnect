import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const fetchNotificationsNumber = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8800/server/notification/getNumberOfNotification/${id}`, {
      withCredentials: true,
    });
    return response.data || [];
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized: Please log in again.");
    }
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
};
const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:8800/server/order/getAllOrders", {
      withCredentials: true,
    });
    return response.data || [];
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized: Please log in again.");
    }
    console.error("❌ Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};
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
const fetchCrops = async (id) => {
  const response = await axios.get(`http://localhost:8800/server/crop/getMyCropNumber/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
const fetchOrdersN = async (id) => {
  const response = await axios.get(`http://localhost:8800/server/order/getMyOrdersNumber/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
const FarmerDashboard = () => {
  const [filter, setFilter] = useState("Today");
  const { isAuthenticated,userDetails} = useAuth();
  const navigate = useNavigate();
    useEffect(() => {
      if (!isAuthenticated || !Cookies.get("user")) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);
  const { data: data, isError, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotificationsNumber,
    staleTime: 300,
    retry: false,
  });
  const { data: crops, isErrors, isLoadings } = useQuery({
    queryKey: ["crops"],
    queryFn: fetchCrops,
    staleTime: 300,
    retry: false,
  });
  const { data: orders, isError0, isLoading0 } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrdersN,
    staleTime: 300,
    retry: false,
  });
  const {
        data: allData,
        isError: isAllError,
        error: allError,
        isLoading: isAllLoading
      } = useQuery({
        queryKey: ["allOrders"],
        queryFn: fetchOrders,
      });
   const { data: notifications, isErrorn, isLoadingn, errorn } = useQuery({
        queryKey: ["notificationsa"],
        queryFn: fetchNotifications,
        staleTime: 300,
        retry: false,
      });
    
  if (isLoading || isLoadings) return <span>Loading...</span>;
  if (isError || isErrors) {
    return error.message.includes("Unauthorized") ? (
      <div className="text-center text-danger">
        <p>Session expired. Please <Link to="/login">log in</Link> again.</p>
      </div>
    ) : (
      <span className="text-danger">Network error! Retry later.</span>
    );
  }

  return (
    <div className="container mt-4">
    {/* Header Section */}
    <div className="mb-4">
      <h1 className="text-primary">Farmer Dashboard</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/fdashboard">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Dashboard
          </li>
        </ol>
      </nav>
    </div>

    {/* Cards Section */}
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
          <Link to="/notification" className="d-flex justify-content-end mb-0 me-4">
              More
            </Link>
            <h5 className="card-title">Notifications</h5>
            <h6>{data?.numberOfMyNotification || 0}</h6>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
          <Link to="/produce" className="d-flex justify-content-end mb-0 me-4">
              More
            </Link>
            <h5 className="card-title">Crops</h5>
            <h6>{crops && crops.length > 0 ? crops[0].cropNumber : "No crops available"}</h6>

          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
          <Link to="/ordersf" className="d-flex justify-content-end mb-0 me-4">
              More
            </Link>
            <h5 className="card-title">Orders</h5>
            <h6>{orders?.ordersNumber || 0}</h6>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Sales Table */}
    <div className="col-12 mt-4">
      <div className="card recent-sales overflow-auto">
      <Link to="/orders" className="d-flex justify-content-end mb-0 me-4">
              More
            </Link>
        <div className="card-body">
          <h5 className="card-title">
            Recent Orders <span>| Today</span>
          </h5>
          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Farmer Name</th>
                <th scope="col">Farmer Phone</th>
                <th scope="col">Crop Bought</th>
                <th scope="col">Quantity</th>
                <th scope="col">Ordered Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {allData &&
                allData.map((order, index) => (
                  <tr key={order.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{order?.seller_first_name || "Unknown"}</td>
                    <td>{order?.seller_phone || "Unknown"}</td>
                    <td>{order?.crop_name || "Unknown"}</td>
                    <td>{order?.quantity || 0}</td>
                    <td>
                      {order.created_at
                        ? format(new Date(order.created_at), "MMM dd, yyyy")
                        : "N/A"}
                    </td>
                    <td>
                      {(() => {
                        switch (order.status) {
                          case "Approved":
                            return <span className="badge bg-success">Approved</span>;
                          case "Rejected":
                            return <span className="badge bg-danger">Rejected</span>;
                          default:
                            return <span className="badge bg-warning">Pending</span>;
                        }
                      })()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Recent Notifications Table */}
    <div className="col-12 mt-4">
      <div className="card recent-sales overflow-auto">
      <Link to="/notification" className="d-flex justify-content-end mb-0 me-4">
              More
            </Link>
        <div className="card-body">
          <h5 className="card-title">
            Recent Notifications <span>| Today</span>
          </h5>
          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">From/To</th>
                <th scope="col">Phone</th>
                <th scope="col">Notification</th>
                <th scope="col">Send Date</th>
              </tr>
            </thead>
            <tbody>
              {notifications?.map((notification, index) => (
                <tr key={notification.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <span
                      className={
                        userDetails?.id === notification.sender_id
                          ? "text-success"
                          : "text-primary"
                      }
                    >
                      {userDetails?.id === notification.sender_id ? (
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
                    {userDetails?.id !== notification.sender_id
                      ? `${notification.sender_first_name || "Unknown"} ${
                          notification.sender_last_name || "Unknown"
                        }`
                      : `${notification.receiver_first_name || "Unknown"} ${
                          notification.receiver_last_name || "Unknown"
                        }`}
                  </td>
                  <td>
                    {userDetails?.id !== notification.sender_id
                      ? notification.sender_phone || "Unknown"
                      : notification.receiver_phone || "Unknown"}
                  </td>
                  <td>{notification?.notification || "No message"}</td>
                  <td>
                    {notification.created_at
                      ? format(new Date(notification.created_at), "MMM dd, yyyy")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  </div>
);
};

export default FarmerDashboard;