import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="container py-5 text-center">
      <div className="py-5">
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead text-muted mb-4">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary">
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage

