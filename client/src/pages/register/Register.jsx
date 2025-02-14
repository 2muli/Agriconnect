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
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo"
                    className="img-fluid"
                    style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }}
                  />
                </div>

                {/* Right Side (Form) */}
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Student registration form</h3>

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

                    {/* Mother's Name & Father's Name */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input type="text" id="form3Example1m1" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example1m1">
                            Mother's name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input type="text" id="form3Example1n1" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example1n1">
                            Father's name
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" id="form3Example8" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example8">
                        Address
                      </label>
                    </div>

                    {/* Gender */}
                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                      <h6 className="mb-0 me-4">Gender: </h6>
                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="femaleGender"
                          value="option1"
                        />
                        <label className="form-check-label" htmlFor="femaleGender">
                          Female
                        </label>
                      </div>
                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="maleGender"
                          value="option2"
                        />
                        <label className="form-check-label" htmlFor="maleGender">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="otherGender"
                          value="option3"
                        />
                        <label className="form-check-label" htmlFor="otherGender">
                          Other
                        </label>
                      </div>
                    </div>

                    {/* State & City */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <select data-mdb-select-init className="form-select form-select-lg">
                          <option value="1">State</option>
                          <option value="2">Option 1</option>
                          <option value="3">Option 2</option>
                          <option value="4">Option 3</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select data-mdb-select-init className="form-select form-select-lg">
                          <option value="1">City</option>
                          <option value="2">Option 1</option>
                          <option value="3">Option 2</option>
                          <option value="4">Option 3</option>
                        </select>
                      </div>
                    </div>

                    {/* DOB & Pincode */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="date" id="form3Example9" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example9">
                        DOB
                      </label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" id="form3Example90" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example90">
                        Pincode
                      </label>
                    </div>

                    {/* Course & Email ID */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" id="form3Example99" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example99">
                        Course
                      </label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="email" id="form3Example97" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example97">
                        Email ID
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
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-danger btn-sm"
                    >
                      Sign in
                    </button>
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