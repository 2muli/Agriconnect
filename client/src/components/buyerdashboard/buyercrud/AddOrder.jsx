import { Link } from "react-router-dom";
const AddOrder = () => {
    return (
        <div className="container mt-4 text-black fs-3">
        <div className="d-flex justify-content-start mb-2 text-white">
          <h1>Add Order</h1>
        </div>
        <form>
           <div className="form-group">
            <label htmlFor="inputPassword1">Farmer Name</label>
            <input 
              type="text" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword1" 
              placeholder="Farmer Name" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword2">Crop Name</label>
            <input 
              type="text" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword2" 
              placeholder="Crop Name" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3">Quantity</label>
            <input 
              type="number" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword3" 
              placeholder="Quantity" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3">Price per unit(Ksh)</label>
            <input 
              type="number" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword3" 
               
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Order Date</label>
            <input 
              type="date" 
              className="form-control mb-3 w-75 w-100-sm" 
              id="inputPassword4" 
              placeholder="Order Date" 
            />
          </div>
          <button type="button" className="btn btn-success w-25 mt-2 me-3">Save </button>
          <Link to="/ordersf"><button type="button" className="btn btn-secondary w-25 mt-2">
            <i className="bi bi-arrow-left me-2"></i>Go Back</button></Link>
        </form>
      </div>
    );
  };
  
  export default AddOrder;
  