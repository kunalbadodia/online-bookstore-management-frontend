"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { placeOrder } from "../../store/actions/orderActions"

const CheckoutForm = () => {
  const { user } = useSelector((state) => state.auth)
  const { items, total } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate shipping info
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"

    // Validate payment info
    if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required"
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required"
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format"
    }
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required"
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Create order object
      const orderData = {
        items: items.map((item) => ({
          bookId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        totalAmount: total,
      }

      // In a real app, you would process payment here

      // Place order
      const orderId = await dispatch(placeOrder(orderData))

      // Navigate to order confirmation
      navigate(`/order-confirmation/${orderId}`)
    } catch (error) {
      console.error("Checkout error:", error)
      setErrors({ submit: "An error occurred during checkout. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          {errors.submit}
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-4">
          <h4 className="mb-3">Shipping Information</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            <div className="col-md-5">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className={`form-control ${errors.state ? "is-invalid" : ""}`}
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              {errors.state && <div className="invalid-feedback">{errors.state}</div>}
            </div>

            <div className="col-md-3">
              <label htmlFor="zipCode" className="form-label">
                ZIP Code
              </label>
              <input
                type="text"
                className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
              {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <h4 className="mb-3">Payment Information</h4>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="cardName" className="form-label">
                Name on Card
              </label>
              <input
                type="text"
                className={`form-control ${errors.cardName ? "is-invalid" : ""}`}
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                required
              />
              {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
            </div>

            <div className="col-12">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
              {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="expiryDate" className="form-label">
                Expiry Date
              </label>
              <input
                type="text"
                className={`form-control ${errors.expiryDate ? "is-invalid" : ""}`}
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
              {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <input
                type="text"
                className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="XXX"
                required
              />
              {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      <button className="btn btn-primary btn-lg w-100" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
          </>
        ) : (
          "Complete Order"
        )}
      </button>
    </form>
  )
}

export default CheckoutForm

