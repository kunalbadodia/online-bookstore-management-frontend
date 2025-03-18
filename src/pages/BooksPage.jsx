"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks, fetchCategories } from "../store/actions/bookActions"
import BookCard from "../components/books/BookCard"
import BookFilter from "../components/books/BookFilter"
import Pagination from "../components/common/Pagination"

const BooksPage = () => {
  const dispatch = useDispatch()
  const { books, categories, totalBooks, loading } = useSelector((state) => state.books)
  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get("page")) || 1)
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    rating: searchParams.get("rating") || "",
    sort: searchParams.get("sort") || "newest",
  })

  const booksPerPage = 12

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    // Update search params when filters change
    const params = new URLSearchParams()

    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
      if (filters.minPrice && !isNaN(filters.minPrice)) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice && !isNaN(filters.maxPrice)) params.set("maxPrice", filters.maxPrice);
    if (filters.rating && !isNaN(filters.rating)) params.set("rating", filters.rating);
    if (filters.sort) params.set("sort", filters.sort)
    if (currentPage > 1) params.set("page", currentPage.toString())

    setSearchParams(params)

    // Fetch books with current filters and pagination
    const validFilters = {
      search: filters.search || undefined,
      category: filters.category || undefined,
      minPrice: !isNaN(filters.minPrice) ? filters.minPrice : undefined,
      maxPrice: !isNaN(filters.maxPrice) ? filters.maxPrice : undefined,
      rating: !isNaN(filters.rating) ? filters.rating : undefined,
      sort: filters.sort || "newest",
      page: currentPage,
      limit: booksPerPage,
    };
  
    dispatch(fetchBooks(validFilters));
  }, [dispatch, filters, currentPage, setSearchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="container">
      <h1 className="mb-4">Browse Books</h1>

      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-lg-3 mb-4">
          <BookFilter categories={categories} onFilterChange={handleFilterChange} />
        </div>

        {/* Book Listing */}
        <div className="col-lg-9">
          {/* Search Results Info */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              {filters.search && (
                <p className="mb-0">
                  Search results for: <strong>{filters.search}</strong>
                </p>
              )}
              <p className="text-muted mb-0">
                Showing {books.length > 0 ? (currentPage - 1) * booksPerPage + 1 : 0} -{" "}
                {Math.min(currentPage * booksPerPage, totalBooks)} of {totalBooks} books
              </p>
            </div>

            <div className="d-none d-md-block">
              <select
                className="form-select"
                value={filters.sort}
                onChange={(e) => handleFilterChange({ ...filters, sort: e.target.value })}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="bestselling">Bestselling</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : books.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {books.map((book) => (
                  <div key={book.id} className="col">
                    <BookCard book={book} />
                  </div>
                ))}
              </div>

              <div className="mt-5 d-flex justify-content-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalBooks / booksPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted mb-3"></i>
              <h3>No books found</h3>
              <p className="text-muted">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BooksPage

