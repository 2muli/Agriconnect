import { Link } from 'react-router-dom'

const Error = () => {
  return (
        <main>
    <div className="container">

      <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>404</h1>
        <h2>The page you are looking for does not exist.</h2>
        <img src="/not-found.svg" className="img-fluid py-10" alt="Page Not Found"/>
          <Link to='/'>
        <button style={{backgroundColor:"gray"}}>
          Back to Home
        </button>
          </Link>
             </section>

    </div>
  </main>
  )
}

export default Error