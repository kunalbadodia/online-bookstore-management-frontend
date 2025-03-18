// client/src/components/layout/Header.jsx
"use client"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../store/actions/authActions"
import SearchBar from "../common/SearchBar"

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-book me-2"></i>
            <span className="fw-bold">BookMate</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            {isAuthenticated && <SearchBar className="d-lg-none mt-3 mb-2" />}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/books">
                    Books
                  </Link>
                </li>
              )}
            </ul>

            {isAuthenticated && <SearchBar className="d-none d-lg-block me-3" />}

            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="btn btn-outline-primary position-relative me-2">
                    <i className="bi bi-cart"></i>
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>

                  <div className="dropdown">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-person-circle me-1"></i>
                      {user?.firstName || "Account"}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/profile/orders">
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div>
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header