"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

const BookFilter = ({ categories, onFilterChange }) => {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    rating: searchParams.get("rating") || "",
    sort: searchParams.get("sort") || "newest",
  })

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      sort: "newest",
    })
  }

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Filters</h5>
        <button className="btn btn-sm btn-outline-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price Range</label>
          <div className="row g-2">
            <div className="col-6">
              <input
                type="number"
                name="minPrice"
                className="form-control"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                name="maxPrice"
                className="form-control"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Minimum Rating
          </label>
          <select id="rating" name="rating" className="form-select" value={filters.rating} onChange={handleChange}>
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Stars</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="sort" className="form-label">
            Sort By
          </label>
          <select id="sort" name="sort" className="form-select" value={filters.sort} onChange={handleChange}>
            <option value="newest">Newest Arrivals</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="bestselling">Bestselling</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default BookFilter

