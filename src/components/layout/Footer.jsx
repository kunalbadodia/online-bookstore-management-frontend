import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">BookMate</h5>
            <p className="text-muted">
              Your one-stop destination for all your literary needs. Discover, explore, and purchase books from the
              comfort of your home.
            </p>
          </div>

          

          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="mb-3">Account</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/profile" className="text-decoration-none text-muted">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/profile/orders" className="text-decoration-none text-muted">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-decoration-none text-muted">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-decoration-none text-muted">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-6">
            <h5 className="mb-3 ">Stay Connected</h5>
            <p className="text-muted">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email address" />
              <button className="btn btn-primary" type="button">
                Subscribe
              </button>
            </div>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-muted">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="https://twitter.com" className="text-muted">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="https://instagram.com" className="text-muted">
                <i className="bi bi-instagram fs-5"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">&copy; 2025 BookMate. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                  Privacy Policy
                
              </li>
              <li className="list-inline-item">
                  Terms of Service
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

