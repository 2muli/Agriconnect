const Profile = () => {
    return (
      <div className="container w-100 d-flex justify-content-center align-items-center vh-100 mb-3">
        <div className="col-md-12 col-lg-6 mx-auto p-4 shadow rounded bg-info text-white overflow-auto mb-4" style={{ maxHeight: '90vh' }}>
          
        <h2 className="text-center mb-4 text-dark">Profile</h2>
        <div className="text-center mb-4">
            <img 
              src="/Agriconnect.jpg" 
              alt="Profile" 
              className="rounded-circle border border-white mb-3" 
              style={{ width: '100px', height: '100px' }}
            />
          </div>
  
          <form>           
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="First name"/>
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" placeholder="Last name"/>
              </div>
            </div>
  
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Enter your email"
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-control" 
                id="phoneNumber" 
                placeholder="Enter your phone number"
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Submit</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Profile;
  