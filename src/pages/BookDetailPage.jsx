"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchBookDetails, fetchRelatedBooks } from "../store/actions/bookActions"
import { addToCart } from "../store/actions/cartActions"
import StarRating from "../components/books/StarRating"
import BookCard from "../components/books/BookCard"

const BookDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { bookDetails, relatedBooks, loading } = useSelector((state) => state.books)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (id) {
      dispatch(fetchBookDetails(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (bookDetails?.id) {
      dispatch(fetchRelatedBooks(bookDetails.id, bookDetails.category))
    }
  }, [dispatch, bookDetails])
  const { isAuthenticated } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const handleAddToCart = () => {
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/login", { state: { from: `/books/${id}` } })
      return
    }
    
    dispatch(addToCart(bookDetails, quantity))
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!bookDetails) {
    return (
      <div className="container py-5 text-center">
        <h2>Book not found</h2>
        <p>The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/books" className="btn btn-primary mt-3">
          Browse Books
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/books">Books</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/books?category=${bookDetails.category}`}>{bookDetails.category}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {bookDetails.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Book Image */}
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="position-relative">
            <img
              src={bookDetails.coverImage || "/placeholder-book.jpg"}
              alt={bookDetails.title}
              className="img-fluid rounded shadow"
            />
            {bookDetails.isNew && (
              <span className="position-absolute top-0 end-0 bg-danger text-white m-2 px-2 py-1 rounded-pill">
                New Release
              </span>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div className="col-md-8">
          <h1 className="mb-2">{bookDetails.title}</h1>
          <h5 className="text-muted mb-3">by {bookDetails.author}</h5>

          <div className="d-flex align-items-center mb-3">
            <StarRating rating={bookDetails.rating} size="large" />
            <span className="ms-2 text-muted">
              {bookDetails.rating} ({bookDetails.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-4">
            <span className="badge bg-light text-dark me-2">{bookDetails.category}</span>
            {bookDetails.bestseller && <span className="badge bg-warning text-dark">Bestseller</span>}
          </div>

          <h3 className="mb-3">₹ {bookDetails.price.toFixed(2)}</h3>

          <div className="d-flex align-items-center mb-4">
            <div className="input-group me-3" style={{ width: "120px" }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <i className="bi bi-dash"></i>
              </button>
              <input type="text" className="form-control text-center" value={quantity} readOnly />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(quantity + 1)}>
                <i className="bi bi-plus"></i>
              </button>
            </div>

            <button className="btn btn-primary" onClick={handleAddToCart}>
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </button>
          </div>

          <div className="mb-4">
            <h5>Description</h5>
            <p>{bookDetails.description}</p>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h5>Book Details</h5>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <th scope="row">Publisher</th>
                    <td>{bookDetails.publisher}</td>
                  </tr>
                  <tr>
                    <th scope="row">Publication Date</th>
                    <td>{bookDetails.publicationDate}</td>
                  </tr>
                  <tr>
                    <th scope="row">Language</th>
                    <td>{bookDetails.language}</td>
                  </tr>
                  <tr>
                    <th scope="row">Pages</th>
                    <td>{bookDetails.pages}</td>
                  </tr>
                  <tr>
                    <th scope="row">ISBN</th>
                    <td>{bookDetails.isbn}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-5">
        <h3 className="mb-4">Customer Reviews</h3>

        {bookDetails.reviews && bookDetails.reviews.length > 0 ? (
          <div>
            {bookDetails.reviews.map((review) => (
              <div key={review.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <h5 className="card-title mb-0">{review.title}</h5>
                      <p className="text-muted small mb-0">
                        by {review.userName} on {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="card-text">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-secondary">No reviews yet. Be the first to review this book!</div>
        )}
      </div>

      {/* Related Books Section */}
      {relatedBooks && relatedBooks.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">You May Also Like</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {relatedBooks.map((book) => (
              <div key={book.id} className="col">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BookDetailPage

