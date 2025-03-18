import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  FETCH_ORDER_DETAILS_REQUEST,
  FETCH_ORDER_DETAILS_SUCCESS,
  FETCH_ORDER_DETAILS_FAILURE,
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAILURE,
} from "./types"
import api from "../../services/api"

// Place order
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST })

    const response = await api.post("/api/orders", orderData)

    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: response.data,
    })

    return response.data.id
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to place order",
    })

    throw error
  }
}

// Fetch order details by ID
export const fetchOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDER_DETAILS_REQUEST })

    const response = await api.get(`/api/orders/${id}`)

    dispatch({
      type: FETCH_ORDER_DETAILS_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_DETAILS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch order details",
    })

    throw error
  }
}

// Fetch user orders
export const fetchUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_ORDERS_REQUEST })

    const response = await api.get("/api/orders/user")

    dispatch({
      type: FETCH_USER_ORDERS_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    dispatch({
      type: FETCH_USER_ORDERS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch orders",
    })

    throw error
  }
}

