import { Link } from 'react-router-dom';
const AddProduce = () => {
    return (
      <div className="container mt-4 text-black fs-3">
        <div className="d-flex justify-content-start text-white mb-2">
          <h1>Add Produce</h1>
        </div>
        <form>
           <div className="form-group">
            <label htmlFor="inputPassword1">Crop Name</label>
            <input 
              type="text" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword1" 
              placeholder="Crop Name" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword2">Quantity</label>
            <input 
              type="text" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword2" 
              placeholder="Quantity" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3">Location</label>
            <input 
              type="text" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword3" 
              placeholder="Location" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3">Price per unit(Ksh)</label>
            <input 
              type="number" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword3" 
              placeholder="Location" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Harvest Date</label>
            <input 
              type="date" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword4" 
              placeholder="Harvest Date" 
            />
          </div>
          <button type="button" className="btn btn-success w-25 mt-2 me-3">Save</button>
          <Link to="/produce"><button type="button" className="btn btn-secondary w-25 mt-2">
          <i className="bi bi-arrow-left me-2"></i><i className="d-none d-lg-inline">Go Back</i>
            <i className="d-inline d-lg-none">Back</i>
            </button></Link>
        </form>
      </div>
    );
  };
  
  export default AddProduce;
  