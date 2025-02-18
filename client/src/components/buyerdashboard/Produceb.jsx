import { useState } from 'react';

const Produceb = () => {
  // Data for the table
  const data = [
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Jacob', last: 'Thornton', handle: '@fat' }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; 

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <>
      <div className="m-4 mx-auto mx-lg-5 p-5" style={{ maxHeight: '90vh' }}>
      <div className="d-flex justify-content-start mb-2 text-light">
          <h4>Search Crop</h4>
        </div>
        <div className="d-flex justify-content-start mb-5">
        <input type='text' className='me-5' value="--Select Crop--"  style={{
      fontSize: '2rem',  /* Increase font size */
      padding: '0.2rem',   /* Add padding */
      borderRadius: '10px' /* Add border radius */
    }}  />
    <input type='text' className='me-5' value="--Select Location--" style={{
      fontSize: '2rem',  /* Increase font size */
      padding: '0.2rem',   /* Add padding */
      borderRadius: '10px' /* Add border radius */
    }}  />
          <button className="btn btn-success bi bi-search"></button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="bg-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Farmer Name</th>
                <th scope="col">Farmer Contact</th>
                <th scope="col">Crop Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price per Unit(Ksh)</th>
                <th scope="col">Harvest Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.id}</th>
                  <td>{row.first}</td>
                  <td>{row.last}</td>
                  <td>{row.first}</td>
                  <td>{row.last}</td>
                  <td>{row.handle}</td>
                  <td>{row.handle}</td>
                  <td>
                    <div className="d-flex flex-row flex-sm-row justify-content-start">
                    <button className="btn btn-primary btn-sm me-2 mb-2 mb-sm-0 w-sm-auto">
                    <i className="bi bi-pencil d-none d-sm-inline"></i> Make order
                      </button>
                    </div>
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
    </>
  );
};

export default Produceb;
