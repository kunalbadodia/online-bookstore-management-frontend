"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <form className={`d-flex ${className}`} onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Search for books, authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-primary" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  )
}

export default SearchBar

