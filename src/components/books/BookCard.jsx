// client/src/components/books/BookCard.jsx
"use client"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../store/actions/cartActions"
import StarRating from "./StarRating"

const BookCard = ({ book }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/login", { state: { from: `/books/${book.id}` } })
      return
    }
    
    dispatch(addToCart(book, 1))
  }

  // Function to determine the correct image source
  const getImageSource = (coverImage) => {
    // If the path starts with '/images/', it's a local image in the public folder
    if (coverImage && coverImage.startsWith('/images/')) {
      return coverImage;
    }
    // Otherwise use the placeholder or API image
    return coverImage || "/placeholder-book.jpg";
  }

  return (
    <div className="card book-card h-100">
      {book.isNew && (
        <div className="position-absolute top-0 end-0 bg-danger text-white m-2 px-2 py-1 rounded-pill">New</div>
      )}

      <Link to={`/books/${book.id}`} className="text-decoration-none">
        <img 
          src={getImageSource(book.coverImage) || "/placeholder.svg"} 
          className="card-img-top book-cover" 
          alt={book.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x450?text=" + encodeURIComponent(book.title);
          }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <Link to={`/books/${book.id}`} className="text-decoration-none text-dark">
          <h5 className="card-title text-truncate">{book.title}</h5>
        </Link>
        <p className="card-text text-muted mb-1">{book.author}</p>

        <div className="mb-2">
          <StarRating rating={book.rating} />
          <small className="text-muted ms-1">({book.reviewCount})</small>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fw-bold">₹{book.price.toFixed(2)}</span>
          <button className="btn btn-sm btn-primary" onClick={handleAddToCart}>
            <i className="bi bi-cart-plus me-1"></i>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard