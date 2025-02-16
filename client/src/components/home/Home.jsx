import { Link } from 'react-router-dom'
import './home.css'
const Home = () => {
  return (
    <>
    <div className="hero-section">
  <h1 style={{color:"white"}}>Welcome to AgriConnect</h1>
  <p style={{color:"yellowgreen",fontSize:"1rem"}}>Empowering Farmers and Buyers through Technology <br/>
  This app aim to connect the small to large scale farmers with their buyers.<br/>
  It allows transaction , so get started to enjoy amazing service.<br/>
  For more click about  </p>
  <div className="cta-buttons">
    <Link to="/register"><button>Get started</button></Link>
    <Link to="/about"><button>About</button></Link>
  </div>
</div>
</>
  )
}

export default Home
