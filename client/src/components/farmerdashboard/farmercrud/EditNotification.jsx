import { Link } from "react-router-dom";
const EditNotification = () => {
    return (
      <div className="container mt-4 text-light">
        <div className="d-flex justify-content-start mb-2">
          <h1>Edit Notification</h1>
          </div>
        <form>
           <div className="form-group">
            <label htmlFor="inputPassword1">Notification</label>
            <textarea 
              type="text" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword1"
            />
          </div>
          <button type="button" className="btn btn-success w-25 mt-2 me-3">Update</button>
          <Link to="/notification"><button type="button" className="btn btn-secondary w-25 mt-2">
          <i className="bi bi-arrow-left me-2"></i><i className="d-none d-lg-inline">Go Back</i>
            <i className="d-inline d-lg-none">Back</i>
            </button></Link>
        </form>
      </div>
    );
  };
  
  export default EditNotification;
  