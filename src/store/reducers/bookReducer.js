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
} from "../actions/types"

const initialState = {
  books: [],
  totalBooks: 0,
  bookDetails: null,
  featuredBooks: [],
  newReleases: [],
  relatedBooks: [],
  categories: [],
  loading: false,
  error: null,
}

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
    case FETCH_BOOK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload.books,
        totalBooks: action.payload.totalBooks,
        loading: false,
        error: null,
      }

    case FETCH_BOOK_DETAILS_SUCCESS:
      return {
        ...state,
        bookDetails: action.payload,
        loading: false,
        error: null,
      }

    case FETCH_FEATURED_BOOKS_SUCCESS:
      return {
        ...state,
        featuredBooks: action.payload,
        loading: false,
        error: null,
      }

    case FETCH_NEW_RELEASES_SUCCESS:
      return {
        ...state,
        newReleases: action.payload,
        loading: false,
        error: null,
      }

    case FETCH_RELATED_BOOKS_SUCCESS:
      return {
        ...state,
        relatedBooks: action.payload,
        loading: false,
        error: null,
      }

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      }

    case FETCH_BOOKS_FAILURE:
    case FETCH_BOOK_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default bookReducer

