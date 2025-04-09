import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { useState } from 'react';

const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:8800/server/order/", {
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

const fetchPendingOrders = async () => {
  try {
    const response = await axios.get("http://localhost:8800/server/order/getPendingOrder", {
      withCredentials: true,
    });
    return response.data || [];
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized: Please log in again.");
    }
    // Handle empty response as valid case
    if (error.response?.status === 404 || error.response?.data?.length === 0) {
      return [];
    }
    console.error("❌ Error fetching pending orders:", error);
    throw new Error("Failed to fetch pending orders");
  }
};

const deleteOrder = async (id) => {
  await axios.delete(`http://localhost:8800/server/order/deleteOrder/${id}`, {
    withCredentials: true,
  });
};

const handlingAccept = async (id) => {
  await axios.put(
    `http://localhost:8800/server/order/acceptOrder/${id}`,
    {},
    { withCredentials: true }
  );
};

const handlingReject = async (id) => {
  await axios.put(
    `http://localhost:8800/server/order/rejectOrder/${id}`,
    {},
    { withCredentials: true }
  );
};

const Orders = () => {
  const [pendingPage, setPendingPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);
  const queryClient = useQueryClient();

  // Separate queries for pending and all orders
  const {
    data: pendingData = [],
    isError: isPendingError,
    error: pendingError,
    isLoading: isPendingLoading
  } = useQuery({
    queryKey: ["pendingOrders"],
    queryFn: fetchPendingOrders,
  });

  const {
    data: allData = [],
    isError: isAllError,
    error: allError,
    isLoading: isAllLoading
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: fetchOrders,
  });

  // Mutations with dual invalidation
  const { mutate: deleteOrderMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingOrders"]);
      queryClient.invalidateQueries(["allOrders"]);
      alert("Order deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting order:", error);
      alert(error.message);
    },
  });

  const { mutate: handleAccept, isLoading: isAccepting } = useMutation({
    mutationFn: handlingAccept,
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingOrders"]);
      queryClient.invalidateQueries(["allOrders"]);
      alert("Order accepted successfully!");
    },
    onError: (error) => {
      console.error("Error accepting order:", error);
      alert(error.message);
    },
  });

  const { mutate: handleReject, isLoading: isRejecting } = useMutation({
    mutationFn: handlingReject,
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingOrders"]);
      queryClient.invalidateQueries(["allOrders"]);
      alert("Order rejected successfully!");
    },
    onError: (error) => {
      console.error("Error rejecting order:", error);
      alert(error.message);
    },
  });

  // Pending Orders Pagination
  const pendingRowsPerPage = 10;
  const pendingTotalPages = Math.ceil(pendingData.length / pendingRowsPerPage);
  const pendingCurrentRows = pendingData.slice(
    (pendingPage - 1) * pendingRowsPerPage,
    pendingPage * pendingRowsPerPage
  );

  // Approved/Rejected Orders Pagination
  const approvedRowsPerPage = 10;
  const filteredApprovedData = allData.filter(order => order.status !== "Pending");
  const approvedTotalPages = Math.ceil(filteredApprovedData.length / approvedRowsPerPage);
  const approvedCurrentRows = filteredApprovedData.slice(
    (approvedPage - 1) * approvedRowsPerPage,
    approvedPage * approvedRowsPerPage
  );
console.log(approvedCurrentRows)
  return (
    <>
      {/* Pending Orders Section */}
      <div className="m-4 mx-auto mx-lg-5 p-5" style={{ maxHeight: '90vh' }}>
        <div className="d-flex justify-content-center text-white mb-2">
          <h1>Pending Orders List</h1>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="bg-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Buyer Name</th>
                <th scope="col">Buyer Phone</th>
                <th scope="col">Crop Bought</th>
                <th scope="col">Quantity</th>
                <th scope="col">Ordered Date</th>
                <th scope="col">Action</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {isPendingLoading ? (
                <tr><td colSpan="12">Loading...</td></tr>
              ) : isPendingError ? (
                <tr><td colSpan="12">Error: {pendingError.message}</td></tr>
              ) : pendingCurrentRows.length > 0 ? (
                pendingCurrentRows.map((row, index) => (
                  <tr key={row.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.buyer_first_name} {row.buyer_last_name}</td>
                    <td>{row.buyer_phone}</td>
                    <td>{row.crop_name}</td>
                    <td>{row.quantity}</td>
                    <td>{row.created_at ? format(new Date(row.created_at), "MMM dd, yyyy") : "N/A"}</td>
                    <td>
                      <div className="d-flex flex-row flex-sm-row justify-content-start">
                        <button 
                          onClick={() => handleAccept(row.id)} 
                          disabled={isAccepting} 
                          className="btn btn-success btn-sm me-2 mb-2 mb-sm-0 w-sm-auto"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleReject(row.id)} 
                          disabled={isRejecting} 
                          className="btn btn-secondary btn-sm mb-2 mb-sm-0"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteOrderMutation(row.id)}
                        className="btn btn-danger btn-sm mb-2 mb-sm-0"
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="12" className="text-center">No Pending Orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pendingPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => setPendingPage(p => p - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(pendingTotalPages).keys()].map(num => (
              <li key={num} className={`page-item ${pendingPage === num + 1 ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => setPendingPage(num + 1)}
                >
                  {num + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${pendingPage === pendingTotalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => setPendingPage(p => p + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Approved/Rejected Orders Section */}
      <div className="m-4 mx-auto mx-lg-5 p-5" style={{ maxHeight: '90vh' }}>
        <div className="d-flex justify-content-center mb-2">
          <h1 style={{fontWeight:"bold",color:"white"}}>Approved & Rejected Orders</h1>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="bg-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Buyer Name</th>
                <th scope="col">Buyer Phone</th>
                <th scope="col">Crop Bought</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Ordered Date</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {isAllLoading ? (
                <tr><td colSpan="12">Loading...</td></tr>
              ) : isAllError ? (
                <tr><td colSpan="12">Error: {allError.message}</td></tr>
              ) : approvedCurrentRows.length > 0 ? (
                approvedCurrentRows.map((row, index) => (
                  <tr key={row.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.buyer_first_name} {row.buyer_last_name}</td>
                    <td>{row.buyer_phone}</td>
                    <td>{row.crop_name}</td>
                    <td>{row.quantity}</td>
                    <td>{row.total_price || "N/A"}</td>
                    <td>{row.created_at ? format(new Date(row.created_at), "MMM dd, yyyy") : "N/A"}</td>
                    <td>
                      {(() => {
                        switch (row.status) {
                          case "Approved":
                            return <span className="badge bg-success">Approved</span>;
                          case "Rejected":
                            return <span className="badge bg-danger">Rejected</span>;
                          default:
                            return <span className="badge bg-warning">Pending</span>;
                        }
                      })()}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteOrderMutation(row.id)}
                        className="btn btn-danger btn-sm mb-2 mb-sm-0"
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="12" className="text-center">No Approved/Rejected Orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${approvedPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => setApprovedPage(p => p - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(approvedTotalPages).keys()].map(num => (
              <li key={num} className={`page-item ${approvedPage === num + 1 ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => setApprovedPage(num + 1)}
                >
                  {num + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${approvedPage === approvedTotalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => setApprovedPage(p => p + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Orders;