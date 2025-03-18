// client/src/components/auth/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  const location = useLocation()

  // If still loading auth state, show loading indicator
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // If authenticated, render the protected component
  return children
}

export default ProtectedRoute