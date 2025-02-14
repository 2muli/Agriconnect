import './login.css';

const Login = () => {
  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: 'transparent' }}>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="card rounded-3 text-black" style={{ maxWidth: '700px', position: 'relative', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <div className="row g-0">
            {/* Left Side (Form) */}
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <div className="card-body p-md-5 mx-md-4" style={{ width: '100%' }}>
                <div className="text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{ width: '185px' }}
                    alt="logo"
                  />
                  <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>

                <form>
                  <p className="text-muted text-center mb-4">Please login to your account</p>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example11"
                      className="form-control"
                      placeholder="Phone number or email address"
                    />
                    <label className="form-label" htmlFor="form2Example11">
                      Username
                    </label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control" />
                    <label className="form-label" htmlFor="form2Example22">
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
                      Log in
                    </button>
                  </div>

                  <div className="text-center">
                    <a className="text-muted small" href="#!">
                      Forgot password?
                    </a>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <p className="mb-0 me-2 text-muted">Don't have an account?</p>
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-danger btn-sm"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side (Gradient Background) */}
            <div className="col-lg-6 d-none d-lg-block gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login