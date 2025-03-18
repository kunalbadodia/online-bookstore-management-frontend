"use client"

import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchFeaturedBooks, fetchNewReleases } from "../store/actions/bookActions"
import BookCard from "../components/books/BookCard"
import homebooks from "../components/image/homebooks.jpeg"

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { featuredBooks, newReleases, loading } = useSelector((state) => state.books)
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchFeaturedBooks())
    dispatch(fetchNewReleases())
  }, [dispatch])

  const handleBrowseBooks = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/books" } })
      return
    }
    navigate("/books")
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section rounded mb-5 p-4 p-md-5 bg-Dark">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="display-5 fw-bold mb-3">Discover Your Next Favorite Book</h1>
            <p className="lead mb-4">
              Browse our extensive collection of books across all genres. From bestsellers to hidden gems, find the
              perfect read for any occasion.
            </p>
            <div className="d-grid gap-2 d-md-flex">
              <button onClick={handleBrowseBooks} className="btn btn-primary btn-lg px-4">
                Browse Books
              </button>
              
            </div>
          </div>
          <div className="col-lg-6">
          <button 
  onClick={handleBrowseBooks} 
  className="btn p-0 border-0" // Remove default button styling
>
  <img
    src={homebooks}
    alt="Collection of books"
    className="img-fluid rounded shadow cursor-pointer" // Add pointer cursor
  />
</button>

          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Featured Books</h2>
          <Link to="/books?featured=true" className="btn btn-link text-decoration-none">
            View All <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {featuredBooks.map((book) => (
              <div key={book.id} className="col">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </section>



      {/* New Releases Section */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">New Releases</h2>
          <Link to="/books?sort=newest" className="btn btn-link text-decoration-none">
            View All <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {newReleases.map((book) => (
              <div key={book.id} className="col">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="py-5 px-4 bg-primary text-white rounded mb-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2>Stay Updated with New Releases</h2>
            <p className="lead">
              Subscribe to our newsletter and be the first to know about new books, exclusive offers, and literary
              events.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your email address"
                aria-label="Your email address"
              />
              <button className="btn btn-light" type="button">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

