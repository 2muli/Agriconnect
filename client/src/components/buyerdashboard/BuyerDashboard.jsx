import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const fetchNotificationsNumber = async (userId) => {
  const response = await axios.get(
    `http://localhost:8800/server/notification/getNumberOfNotification/${userId}`,
    { withCredentials: true }
  );
  return response.data;
};

const fetchOrdersN = async (userId) => {
  const response = await axios.get(
    `http://localhost:8800/server/order/getMyOrdersNumber/${userId}`,
    { withCredentials: true }
  );
  return response.data;
};

const fetchOrders = async () => {
  const response = await axios.get(
    "http://localhost:8800/server/order/getAllOrders",
    { withCredentials: true }
  );
  return response.data;
};

const fetchNotifications = async () => {
  const response = await axios.get(
    "http://localhost:8800/server/notification/getMyNotifications",
    { withCredentials: true }
  );
  return response.data;
};

const fetchCrops = async () => {
  const response = await axios.get(
    "http://localhost:8800/server/crop/getCropsNumber",
    { withCredentials: true }
  );
  return response.data;
};

const BuyerDashboard = () => {
  const { isAuthenticated, userDetails } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !Cookies.get("user")) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const userId = userDetails?.id;

  const { data: notificationCount } = useQuery({
    queryKey: ["notificationCount", userId],
    queryFn: () => fetchNotificationsNumber(userId),
    enabled: !!userId,
  });

  const { data: ordersCount } = useQuery({
    queryKey: ["ordersCount", userId],
    queryFn: () => fetchOrdersN(userId),
    enabled: !!userId,
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: fetchNotifications,
  });

  const { data: crops } = useQuery({
    queryKey: ["crops"],
    queryFn: fetchCrops,
  });

  const { data: allOrders } = useQuery({
    queryKey: ["allOrders"],
    queryFn: fetchOrders,
  });

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
              <h6>{notificationCount?.numberOfMyNotification || 0}</h6>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <Link to="/produceb" className="d-flex justify-content-end mb-0 me-4">
                More
              </Link>
              <h5 className="card-title">Crops</h5>
              <h6>
                {crops && crops.length > 0 ? crops[0].cropNumber : "No crops available"}
              </h6>
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
              <h6>
                {Array.isArray(ordersCount)
                  ? ordersCount[0]?.ordersNumber || 0
                  : ordersCount?.ordersNumber || 0}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="col-12 mt-4">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">Recent Orders</h5>
            <table className="table table-borderless datatable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Farmer Name</th>
                  <th>Phone</th>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Ordered Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders?.slice(0, 5).map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.seller_first_name}</td>
                    <td>{order.seller_phone}</td>
                    <td>{order.crop_name}</td>
                    <td>{order.quantity}</td>
                    <td>
                      {order.created_at
                        ? format(new Date(order.created_at), "MMM dd, yyyy")
                        : "N/A"}
                    </td>
                    <td>
                      {order.status === "Approved" ? (
                        <span className="badge bg-success">Approved</span>
                      ) : order.status === "Rejected" ? (
                        <span className="badge bg-danger">Rejected</span>
                      ) : (
                        <span className="badge bg-warning">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="col-12 mt-4">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">Recent Notifications</h5>
            <table className="table table-borderless datatable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>From/To</th>
                  <th>Phone</th>
                  <th>Notification</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {notifications?.slice(0, 5).map((notification, index) => (
                  <tr key={notification.id}>
                    <td>{index + 1}</td>
                    <td>
                      {userDetails?.id === notification.sender_id ? (
                        <>
                          <i className="bi bi-arrow-up-right-circle text-success"></i> To:{" "}
                          {notification.receiver_first_name}
                        </>
                      ) : (
                        <>
                          <i className="bi bi-arrow-down-left-circle text-primary"></i> From:{" "}
                          {notification.sender_first_name}
                        </>
                      )}
                    </td>
                    <td>
                      {userDetails?.id === notification.sender_id
                        ? notification.receiver_phone
                        : notification.sender_phone}
                    </td>
                    <td>{notification.notification}</td>
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

export default BuyerDashboard;
