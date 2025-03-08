import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

const deleteCrop = async (id) => {
  await axios.delete(`http://localhost:8800/server/crop/deleteCrop/${id}`, {
    withCredentials: true, // Ensure cookies are sent for authentication
  });
};

const Produce = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch crops using useQuery
  const { data: crops, isLoading, isError, error } = useQuery({
    queryKey: ['crops'],
    queryFn: fetchCrops,
  });

  // Delete mutation with useMutation
  const { mutate: deleteCropMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCrop,
    onSuccess: () => {
      queryClient.invalidateQueries(['crops']); // Refresh the crops list
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
  const totalPages = Math.ceil((crops?.length || 0) / rowsPerPage);
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
          <thead className="bg-dark">
            <tr>
              <th>#</th>
              <th>Crop Name</th>
              <th>Quantity</th>
              <th>Price (Ksh)</th>
              <th>Harvest Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={row.id}>
                <th>{index + 1}</th>
                <td>{row.crop_name}</td>
                <td>{row.quantity}</td>
                <td>{row.price}</td>
                <td>{format(new Date(row.harvest_date), 'MMM dd, yyyy')}</td>
                <td>
                  <div className="d-flex flex-row flex-sm-row justify-content-start">
                    <Link to={`/editproduce/${row.id || "#"}`}>
                      <button className="btn btn-primary btn-sm me-2 mb-2 mb-sm-0 w-sm-auto">
                        <i className="bi bi-pencil d-none d-sm-inline"></i> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteCropMutation(row.id)}
                      className="btn btn-danger btn-sm mb-2 mb-sm-0"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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

export default Produce;
