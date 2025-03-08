import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { useState } from 'react';


const fetchOrders=async()=>{
try {
  const response = await axios.get("http://localhost:8800/server/order/", {
    withCredentials: true, // Ensures cookies are sent
  });
  return response.data || [];
} catch (error) {
  if (error.response?.status === 401) {
    throw new Error("Unauthorized: Please log in again.");
  }
  console.error("❌ Error fetching order:", error);
  throw new Error("Failed to fetch order");
}
};
const Orders = () => {
  // Data for the table
  const [currentPage, setCurrentPage] = useState(1);

  const {data , isError,error, isLoading } =useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  })
  if(isLoading) return <span>Loading ...</span>
  if (isError) return <span>Error: {error.message}</span> 
  const rowsPerPage = 10; 

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <>
      <div className="m-4 mx-auto mx-lg-5 p-5" style={{ maxHeight: '90vh' }}>
      <div className="d-flex justify-content-center text-white mb-2">
          <h1>Orders List</h1>
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
              {currentRows.map((row,index) => (
                <tr key={row.id}>
                  <th scope="row">{index+1}</th>
                  <td>{row.buyer_id}</td>
                  <td>{row.seller_id}</td>
                  <td>{row.crop_id}</td>
                  <td>{row.quantity}</td>
                  <td>{row.status}</td>
                  <td>{row.created_at ? format(new Date(row.created_at), "MMM dd, yyyy") : "N/A"}</td>
                  
                  <td>
                    <div className="d-flex flex-row flex-sm-row justify-content-start">
                    <button className="btn btn-success btn-sm me-2 mb-2 mb-sm-0 w-sm-auto">
                     Accept
                      </button>
                      <button className="btn btn-secondary btn-sm mb-2 mb-sm-0">
                        Reject
                      </button>
                    </div>
                  </td>
                  <td scope='col'>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((num) => (
              <li key={num} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(num + 1)}>
                  {num + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* <div className="m-4 mx-auto mx-lg-5 p-5" style={{ maxHeight: '90vh' }}>
        <div className="d-flex justify-content-center mb-2">
         <h1 style={{fontWeight:"bold",color:"white"}}>Recent Orders</h1>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="bg-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Farmer Name</th>
                <th scope="col">Farmer Phone</th>
                <th scope="col">Crop Bought</th>
                <th scope="col">Quantity</th>
                <th scope='col'>Total Price</th>
                <th scope="col">Ordered Date</th>
                <th scope='col'>Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {currentRows.map((row,index) => (
                <tr key={row.id}>
                  <th scope="row">{index+1}</th>
                  <td>{row.buyer_id}</td>
                  <td>{row.seller_id}</td>
                  <td>{row.crop_id}</td>
                  <td>{row.quantity}</td>
                  <td>{row.status}</td>
                  <td>{row.created_at ? format(new Date(row.created_at), "MMM dd, yyyy") : "N/A"}</td>
                  
                  <td>
                  <span className="badge bg-success fs-6">Approved</span>
                  <span className="badge bg-danger fs-6">Rejected</span>                   
                  </td>
                  <td>
                    <div className="d-flex flex-row flex-sm-row justify-content-start">
                    <button className="btn btn-danger btn-sm me-2 mb-2 mb-sm-0 w-sm-auto">
                     Delete
                      </button>
                    </div>
                  </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((num) => (
              <li key={num} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(num + 1)}>
                  {num + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div> */}
    </>
  );
};

export default Orders;
