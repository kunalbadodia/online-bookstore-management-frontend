"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrderDetails } from "../store/actions/orderActions"
import { clearCart } from "../store/actions/cartActions"

const OrderConfirmationPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { orderDetails, loading } = useSelector((state) => state.orders)

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id))
      dispatch(clearCart())
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="container py-5 text-center">
        <h2>Order not found</h2>
        <p>The order you're looking for doesn't exist or has been removed.</p>
        <Link to="/profile/orders" className="btn btn-primary mt-3">
          View Your Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <div className="display-1 text-success mb-3">
          <i className="bi bi-check-circle"></i>
        </div>
        <h1 className="mb-3">Thank You for Your Order!</h1>
        <p className="lead">Your order has been placed successfully and is being processed.</p>
        <div className="mb-4">
          <strong>Order Number:</strong> #{orderDetails.orderNumber}
        </div>
        <p>
          A confirmation email has been sent to <strong>{orderDetails.email}</strong>
        </p>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Details</h5>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                  <h6>Shipping Information</h6>
                  <address className="mb-0">
                    {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}
                    <br />
                    {orderDetails.shippingAddress.address}
                    <br />
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
                    {orderDetails.shippingAddress.zipCode}
                  </address>
                </div>
                <div className="col-md-6">
                  <h6>Order Summary</h6>
                  <ul className="list-unstyled mb-0">
                    <li>Order Date: {new Date(orderDetails.orderDate).toLocaleDateString()}</li>
                    <li>
                      Order Status: <span className="badge bg-success">{orderDetails.status}</span>
                    </li>
                    <li>Payment Method: Credit Card</li>
                  </ul>
                </div>
              </div>

              <h6>Items Ordered</h6>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.coverImage || "/placeholder-book.jpg"}
                              alt={item.title}
                              className="img-fluid rounded"
                              style={{ width: "40px", height: "60px", objectFit: "cover" }}
                            />
                            <div className="ms-3">
                              <h6 className="mb-0">{item.title}</h6>
                              <small className="text-muted">{item.author}</small>
                            </div>
                          </div>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end">
                        Subtotal
                      </td>
                      <td className="text-end">${orderDetails.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        Tax
                      </td>
                      <td className="text-end">${orderDetails.tax.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        Shipping
                      </td>
                      <td className="text-end">
                        {orderDetails.shipping === 0 ? "Free" : `$${orderDetails.shipping.toFixed(2)}`}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Total</strong>
                      </td>
                      <td className="text-end">
                        <strong>${orderDetails.total.toFixed(2)}</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/books" className="btn btn-primary me-2">
              Continue Shopping
            </Link>
            <Link to="/profile/orders" className="btn btn-outline-primary">
              View Your Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage

