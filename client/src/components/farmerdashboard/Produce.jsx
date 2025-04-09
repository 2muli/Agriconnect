import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const fetchCrops = async () => {
  const response = await axios.get('http://localhost:8800/server/crop/mycrops', {
    withCredentials: true,
  });
  return response.data;
};

const deleteCrop = async (id) => {
  await axios.delete(`http://localhost:8800/server/crop/deleteCrop/${id}`, {
    withCredentials: true,
  });
};

const Produce = () => {
  const { userDetails } = useAuth();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch crops
  const { data: crops = [], isLoading, isError, error } = useQuery({
    queryKey: ['crops'],
    queryFn: fetchCrops,
  });
  // Delete mutation
  const { mutate: deleteCropMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCrop,
    onSuccess: () => {
      queryClient.invalidateQueries(['crops']);
      alert('Crop deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting crop:', error);
      alert('Failed to delete crop.');
    },
  });

  if (isLoading) return <span>Loading crops...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  // Pagination Logic
  const rowsPerPage = 10;
  const totalPages = Math.ceil(crops.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = crops.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="m-4 mx-auto mx-lg-5 p-5" style={{ maxHeight: '90vh' }}>
      <div className="d-flex justify-content-center text-white mb-2">
        <h1>Products List</h1>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Link to="/addproduce">
          <button className="btn btn-success bi bi-plus">Add Product</button>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Crop Name</th>
              <th>Quantity</th>
              <th>Price (Ksh)</th>
              <th>Harvest Date</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, index) => (
                <tr key={row.id}>
                  <th>{index + 1}</th>
                  <td>{row.crop_name}</td>
                  <td>{row.quantity}</td>
                  <td>{row.price}</td>
                  <td>
                  {row.harvest_date ? format(new Date(row.harvest_date), 'MMM dd, yyyy') : 'N/A'}
                </td>
                  <td>{row.location}</td>
                  <td>
                    {userDetails.id === row.user_id ? (
                      <div className="d-flex flex-row justify-content-start">
                        <Link to={`/editproduce/${row.id || "#"}`}>
                          <button className="btn btn-primary btn-sm me-2">
                            <i className="d-none d-sm-inline bi bi-pencil"></i> Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteCropMutation(row.id)}
                          className="btn btn-danger btn-sm"
                          disabled={isDeleting}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    ) : (
                      <Link to="/orders">
                        <button className="btn btn-success btn-sm">
                          <i className="bi bi-cart"></i> Order
                        </button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No Crop found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Produce;
