import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
} from "./types"
import api from "../../services/api"

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })

    const response = await api.post("/api/auth/login", { email, password })

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Authentication failed",
    })

    throw error
  }
}

// Register action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST })

    const response = await api.post("/api/auth/register", userData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || "Registration failed",
    })

    throw error
  }
}

// Check auth status action
export const checkAuthStatus = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      return dispatch({ type: AUTH_CHECK_FAILURE })
    }

    const response = await api.get("/api/auth/me")

    dispatch({
      type: AUTH_CHECK_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    dispatch({ type: AUTH_CHECK_FAILURE })
  }
}

// Logout action
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}

