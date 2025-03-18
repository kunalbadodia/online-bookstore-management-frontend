"use client"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import CartItem from "../components/cart/CartItem"

const CartPage = () => {
  const { items, subtotal, tax, shipping, total } = useSelector((state) => state.cart)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } })
      return
    }
    navigate("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
          <h2>Your cart is empty</h2>
          <p className="text-muted mb-4">Looks like you haven't added any books to your cart yet.</p>
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Your Shopping Cart</h1>

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Cart Items ({items.reduce((acc, item) => acc + item.quantity, 0)})</h5>
            </div>
            <div className="card-body">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="card-footer bg-white">
              <Link to="/books" className="btn btn-outline-primary">
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>₹{total.toFixed(2)}</strong>
              </div>

              <button className="btn btn-primary w-100 mb-3" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <div className="mt-3">
                <div className="card bg-light">
                  <div className="card-body p-3">
                    <h6 className="mb-2">Have a promo code?</h6>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Enter code" />
                      <button className="btn btn-outline-secondary" type="button">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

