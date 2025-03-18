import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOK_DETAILS_REQUEST,
  FETCH_BOOK_DETAILS_SUCCESS,
  FETCH_BOOK_DETAILS_FAILURE,
  FETCH_FEATURED_BOOKS_SUCCESS,
  FETCH_NEW_RELEASES_SUCCESS,
  FETCH_RELATED_BOOKS_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
} from "./types"
import api from "../../services/api"

// Fetch books with filters and pagination
export const fetchBooks = (params) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BOOKS_REQUEST })

    const response = await api.get("/api/books", { params })

    dispatch({
      type: FETCH_BOOKS_SUCCESS,
      payload: {
        books: response.data.books,
        totalBooks: response.data.total,
      },
    })

    return response.data
  } catch (error) {
    dispatch({
      type: FETCH_BOOKS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch books",
    })

    throw error
  }
}
export const fetchBooksByCategory = (categoryName, page = 1, limit = 12) => async (dispatch) => {
  try {
      dispatch({ type: FETCH_BOOKS_REQUEST })

      const response = await api.get(`/api/books/category/${categoryName}`, {
          params: { page, limit }
      })

      dispatch({
          type: FETCH_BOOKS_SUCCESS,
          payload: {
              books: response.data.books,
              totalBooks: response.data.total,
          },
      })

      return response.data
  } catch (error) {
      console.error(`Error fetching books for category ${categoryName}:`, error);
      dispatch({
          type: FETCH_BOOKS_FAILURE,
          payload: error.response?.data?.message || "Failed to fetch books by category",
      })

      throw error
  }
}
// Fetch book details by ID
export const fetchBookDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BOOK_DETAILS_REQUEST })

    const response = await api.get(`/api/books/${id}`)

    dispatch({
      type: FETCH_BOOK_DETAILS_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    dispatch({
      type: FETCH_BOOK_DETAILS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch book details",
    })

    throw error
  }
}

// Fetch featured books
export const fetchFeaturedBooks = () => async (dispatch) => {
  try {
    const response = await api.get("/api/books/featured")

    dispatch({
      type: FETCH_FEATURED_BOOKS_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    console.error("Error fetching featured books:", error)
  }
}

// Fetch new releases
export const fetchNewReleases = () => async (dispatch) => {
  try {
    const response = await api.get("/api/books/new-releases")

    dispatch({
      type: FETCH_NEW_RELEASES_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    console.error("Error fetching new releases:", error)
  }
}

// Fetch related books
export const fetchRelatedBooks = (bookId, category) => async (dispatch) => {
  try {
    const response = await api.get(`/api/books/related`, {
      params: { bookId, category },
    })

    dispatch({
      type: FETCH_RELATED_BOOKS_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    console.error("Error fetching related books:", error)
  }
}

// Fetch book categories
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await api.get("/api/books/categories")

    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
  }
}

