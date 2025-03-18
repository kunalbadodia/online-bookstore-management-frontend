import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CheckoutForm from "../components/checkout/CheckoutForm"

const CheckoutPage = () => {
  const { items, subtotal, tax, shipping, total } = useSelector((state) => state.cart)

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h2>Your cart is empty</h2>
          <p className="text-muted mb-4">You need to add items to your cart before checking out.</p>
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Checkout</h1>

      <div className="row">
        <div className="col-lg-8">
          <CheckoutForm />
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Items ({items.length})</h5>
            </div>
            <div className="card-body">
              {items.map((item) => (
                <div key={item.id} className="d-flex mb-3">
                  <img
                    src={item.coverImage || "/placeholder-book.jpg"}
                    alt={item.title}
                    className="img-fluid rounded"
                    style={{ width: "50px", height: "75px", objectFit: "cover" }}
                  />
                  <div className="ms-3">
                    <h6 className="mb-0">{item.title}</h6>
                    <small className="text-muted">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

