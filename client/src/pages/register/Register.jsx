import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
  return (
    <section className="h-100 d-flex justify-content-center align-items-center bg-transparent">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-8">
            <div className="card card-registration my-4" style={{ maxWidth: '900px' }}>
              <div className="row g-0">
                {/* Left Side (Image) */}
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="/Agriconnect.jpg"
                    alt="Sample photo"
                    className="img-fluid"
                    style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem',height:"100%" }}
                  />
                </div>

                {/* Right Side (Form) */}
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Registration form</h3>

                    {/* First Name & Last Name */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input type="text" id="form3Example1m" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example1m">
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input type="text" id="form3Example1n" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example1n">
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>
                   {/* Address */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="email" id="form3Example8" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example8">
                        Email
                      </label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <select data-mdb-select-init className="form-select form-select-lg">
                          <option value="0">--select--</option>
                          <option value="2">Farmer</option>
                          <option value="3">Buyer</option>
                        </select>
                        <label>Type</label>
                      </div>
                    {/* DOB & Pincode */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="file" id="form3Example9" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example9">
                       Profile
                      </label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" id="form3Example90" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example90">
                        Phone Number
                      </label>
                    </div>

                    {/* Course & Email ID */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" id="form3Example99" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example99">
                        Password
                      </label>
                    </div>
                    <div className="d-grid gap-2">
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                      type="button"
                    >
                      Sign up
                    </button>
                  </div>
                    {/* Buttons */}
                    <div className="d-flex align-items-center justify-content-center mt-4">
                    <p className="mb-0 me-2 text-muted">Have an account?</p>
                    <Link to="/login"><button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-danger btn-sm"
                    >
                      Sign in
                    </button></Link>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;