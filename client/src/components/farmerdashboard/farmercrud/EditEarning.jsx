import { Link } from "react-router-dom";
const EditEarning = () => {
    return (
      <div className="container mt-4 text-black fs-3">
        <div className="d-flex text-white justify-content-start mb-2">
          <h1>Edit Earning</h1>
        </div>
        <form>
           <div className="form-group">
            <label htmlFor="inputPassword1">Buyer Name</label>
            <input 
              type="text" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword1" 
              placeholder="Buyer Name" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword2">Buyer Phone</label>
            <input 
              type="text" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword2" 
              placeholder="Buyer Phone" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3">Money Earned</label>
            <input 
              type="number" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword3" 
              placeholder="Money Earned" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Earned Date</label>
            <input 
              type="date" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword4" 
              placeholder="Earned Date" 
            />
          </div>
          <button type="button" className="btn btn-success w-25 mt-2 me-3">Update</button>
          <Link to="/earning"><button type="button" className="btn btn-secondary w-25 mt-2">
          <i className="bi bi-arrow-left me-2"></i><i className="d-none d-lg-inline">Go Back</i>
            <i className="d-inline d-lg-none">Back</i>
            </button></Link>
        </form>
      </div>
    );
  };
  
  export default EditEarning;
  