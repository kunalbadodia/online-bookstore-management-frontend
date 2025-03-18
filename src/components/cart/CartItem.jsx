"use client"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateCartItemQuantity, removeFromCart } from "../../store/actions/cartActions"

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  const handleQuantityChange = (e) => {
    const newQuantity = Number.parseInt(e.target.value)
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity(item.id, newQuantity))
    }
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2 col-4">
          <Link to={`/books/${item.id}`}>
            <img
              src={item.coverImage || "/placeholder-book.jpg"}
              className="img-fluid rounded-start cart-item-img"
              alt={item.title}
            />
          </Link>
        </div>
        <div className="col-md-10 col-8">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5 className="card-title">
                  <Link to={`/books/${item.id}`} className="text-decoration-none text-dark">
                    {item.title}
                  </Link>
                </h5>
                <p className="card-text text-muted">{item.author}</p>
              </div>

              <div className="col-md-2 col-6 mt-2 mt-md-0">
                <label htmlFor={`quantity-${item.id}`} className="form-label">
                  Quantity
                </label>
                <select
                  id={`quantity-${item.id}`}
                  className="form-select"
                  value={item.quantity}
                  onChange={handleQuantityChange}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2 col-6 mt-2 mt-md-0 text-end text-md-start">
                <label className="form-label d-block">Price</label>
                <span className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>

              <div className="col-md-2 d-flex align-items-end justify-content-end mt-2 mt-md-0">
                <button className="btn btn-sm btn-outline-danger" onClick={handleRemove}>
                  <i className="bi bi-trash me-1"></i>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem

