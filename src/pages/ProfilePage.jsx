"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile, updateUserProfile } from "../store/actions/userActions"
import { fetchUserOrders } from "../store/actions/orderActions"

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { user, loading: userLoading } = useSelector((state) => state.auth)
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders)

  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    dispatch(fetchUserProfile())
    dispatch(fetchUserOrders())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
  }, [user])

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

    // Clear success message when any field is edited
    if (successMessage) {
      setSuccessMessage("")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid"

    // Only validate password fields if any of them are filled
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) newErrors.currentPassword = "Current password is required"
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required"
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = "New password must be at least 6 characters"
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Create update object
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      }

      // Add password fields if provided
      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword
        updateData.newPassword = formData.newPassword
      }

      await dispatch(updateUserProfile(updateData))

      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))

      setSuccessMessage("Profile updated successfully")
    } catch (error) {
      setErrors({ submit: "Failed to update profile. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (userLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">My Account</h1>

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary text-white rounded-circle p-3 me-3">
                  <i className="bi bi-person-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="mb-0">
                    {user?.firstName} {user?.lastName}
                  </h5>
                  <p className="text-muted mb-0">{user?.email}</p>
                </div>
              </div>

              <div className="list-group">
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="bi bi-person me-2"></i>
                  Profile
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "orders" ? "active" : ""}`}
                  onClick={() => setActiveTab("orders")}
                >
                  <i className="bi bi-bag me-2"></i>
                  Orders
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "wishlist" ? "active" : ""}`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  <i className="bi bi-heart me-2"></i>
                  Wishlist
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "settings" ? "active" : ""}`}
                  onClick={() => setActiveTab("settings")}
                >
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          {activeTab === "profile" && (
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">Profile Information</h5>
              </div>
              <div className="card-body">
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}

                {errors.submit && (
                  <div className="alert alert-danger" role="alert">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
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
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
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

                  <h5 className="mt-4 mb-3">Address Information</h5>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-2">
                      <label htmlFor="zipCode" className="form-label">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <h5 className="mt-4 mb-3">Change Password</h5>

                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.currentPassword ? "is-invalid" : ""}`}
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                    {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                      {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">Order History</h5>
              </div>
              <div className="card-body">
                {ordersLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order #</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>#{order.orderNumber}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>
                              <span
                                className={`badge bg-${
                                  order.status === "Delivered"
                                    ? "success"
                                    : order.status === "Shipped"
                                      ? "info"
                                      : order.status === "Processing"
                                        ? "warning"
                                        : "secondary"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td>${order.total.toFixed(2)}</td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <i className="bi bi-bag-x fs-1 text-muted mb-3"></i>
                    <h5>No Orders Found</h5>
                    <p className="text-muted">You haven't placed any orders yet.</p>
                    <a href="/books" className="btn btn-primary mt-2">
                      Start Shopping
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">My Wishlist</h5>
              </div>
              <div className="card-body text-center py-5">
                <i className="bi bi-heart fs-1 text-muted mb-3"></i>
                <h5>Wishlist Feature Coming Soon</h5>
                <p className="text-muted">We're working on implementing the wishlist feature. Stay tuned!</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">Account Settings</h5>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <h6>Email Notifications</h6>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="orderUpdates" defaultChecked />
                    <label className="form-check-label" htmlFor="orderUpdates">
                      Order updates
                    </label>
                  </div>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="promotions" defaultChecked />
                    <label className="form-check-label" htmlFor="promotions">
                      Promotions and deals
                    </label>
                  </div>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="newReleases" />
                    <label className="form-check-label" htmlFor="newReleases">
                      New book releases
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <h6>Privacy Settings</h6>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="shareData" defaultChecked />
                    <label className="form-check-label" htmlFor="shareData">
                      Share my reading activity
                    </label>
                  </div>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="publicProfile" />
                    <label className="form-check-label" htmlFor="publicProfile">
                      Make my profile public
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary">Save Settings</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

