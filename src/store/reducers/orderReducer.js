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
} from "../actions/types"

const initialState = {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
    case FETCH_ORDER_DETAILS_REQUEST:
    case FETCH_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }

    case FETCH_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload,
        loading: false,
        error: null,
      }

    case FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      }

    case PLACE_ORDER_FAILURE:
    case FETCH_ORDER_DETAILS_FAILURE:
    case FETCH_USER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default orderReducer

