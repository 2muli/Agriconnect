import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const fetchCrops = async () => {
  const response = await axios.get('http://localhost:8800/server/crop/', {
    withCredentials: true, // Ensure cookies are sent
  });
  return response.data;
};


const Produceb = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch crops using useQuery
  const { data: crops, isLoading, isError, error } = useQuery({
    queryKey: ['crops'],
    queryFn: fetchCrops,
  });

console.log(crops)
  if (isLoading) return <span>Loading crops...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  // Pagination Logic
  const rowsPerPage = 10;
  const totalPages = Math.ceil((crops?.length || 0) / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = crops.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="m-4 mx-auto mx-lg-5 p-5" style={{ maxHeight: '90vh' }}>
      <div className="d-flex justify-content-center text-white mb-2">
        <h1>Available Produce</h1>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="bg-dark">
            <tr>
              <th>#</th>
              <th>Crop Name</th>
              <th>Farmer Name</th>
              <th>Farmer Phone</th>
              <th>Quantity</th>
              <th>Price (Ksh)</th>
              <th>Harvest Date</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ?(
            currentRows.map((row, index) => (
              <tr key={row.id}>
                <th>{index + 1}</th>
                <td>{row.crop_name}</td>
                <td>{row.first_name} {row.last_name}</td>
                <td>{row.phone_number}</td>
                <td>{row.quantity}</td>
                <td>{row.price}</td>
                <td>{row.harvest_date? format(new Date(row.harvest_date), 'MMM dd, yyyy'):"N/A"}</td>
                <td>{row.location}</td>
                <td>
                 
                    <Link to="/ordersf">
                    <button className="btn btn-success btn-sm me-2 mb-2 mb-sm-0 w-sm-auto">
                      <i className="bi bi-pencil d-none d-sm-inline"></i> Order
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ):(
            <tr>
            <td colSpan="6" className="text-center">No Produce found.</td>
          </tr>
          )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(totalPages).keys()].map((num) => (
            <li key={num} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(num + 1)}>
                {num + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Produceb;
