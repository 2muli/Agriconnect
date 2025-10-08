import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchTransactions = async () => {
  const response = await axios.get(
    "http://localhost:8800/server/transaction/myTransactions",
    { withCredentials: true }
  );
  return response.data;
};

const deleteTransaction = async (id) => {
  await axios.delete(`http://localhost:8800/server/transaction/${id}`, {
    withCredentials: true,
  });
};

const Transactions = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });

  // Ensure we’re always working with an array
  const transactionList = Array.isArray(transactions) ? transactions : [];

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = transactionList.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(transactionList.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="m-4 mx-auto mx-lg-5 p-5 text-center text-light">
        <h4>Loading transactions...</h4>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-4 mx-auto mx-lg-5 p-5 text-center text-danger">
        <h4>Error: {error.message}</h4>
      </div>
    );
  }

  return (
    <div className="m-4 mx-auto mx-lg-5 p-5" style={{ maxHeight: "90vh" }}>
      <div className="d-flex justify-content-center mb-3 text-light">
        <h2>Transactions History</h2>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/addtransaction">
          <button className="btn btn-success bi bi-plus">
            Add Transaction
          </button>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="bg-dark text-light">
            <tr>
              <th>#</th>
              <th>Farmer Name</th>
              <th>Crop Name</th>
              <th>Quantity</th>
              <th>Unit Price (Ksh)</th>
              <th>Total Cost (Ksh)</th>
              <th>Transaction Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactionList.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No transactions found.
                </td>
              </tr>
            ) : (
              currentRows.map((row, index) => (
                <tr key={row.id}>
                  <td>{indexOfFirstRow + index + 1}</td>
                  <td>{row.farmer_id}</td>
                  <td>{row.crop_name}</td>
                  <td>{row.crop_quantity}</td>
                  <td>{row.unit_price}</td>
                  <td>{row.crop_quantity * row.unit_price}</td>
                  <td>
                    {new Date(row.transactionDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <div className="d-flex flex-row">
                      <Link to={`/edittransaction/${row.id}`}>
                        <button className="btn btn-primary btn-sm me-2">
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this transaction?"
                            )
                          ) {
                            handleDelete(row.id);
                          }
                        }}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {transactionList.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages).keys()].map((num) => (
              <li
                key={num}
                className={`page-item ${
                  currentPage === num + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(num + 1)}
                >
                  {num + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Transactions;
