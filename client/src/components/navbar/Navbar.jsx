import { Link } from "react-router-dom";
const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: 'green' }}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          {/* Collapse Content */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Left Navigation Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active text-white" aria-current="page">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Agriculture
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" href="#">Crop</Link></li>
                  <li><Link className="dropdown-item" href="#">Livestock</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-white">Contact us</Link>
              </li>
              <li className="nav-item">
                <Link to="/help" className="nav-link text-white" >Help</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/faq" className="nav-link text-white">FQAs</Link>
              </li>
            </ul>
  
            {/* Centered Search Form */}
            <form className="d-flex order-lg-0 ms-auto me-auto" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ backgroundColor: '#fff', color: '#000' }}
              />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
  
            {/* Right Side Sign Up/Sign In Links */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/register" className="nav-link text-white g-3 " >
                  <button className="btn btn-outline-light" type="button">Sign up</button></Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white g-3 ">
                  <button className="btn btn-outline-light" type="button">Sign in</button></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;