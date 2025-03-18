import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY, CLEAR_CART } from "../actions/types"

// Helper function to calculate cart totals
const calculateCartTotals = (items) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax rate
  const shipping = subtotal > 35 ? 0 : 4.99 // Free shipping over $35
  const total = subtotal + tax + shipping

  return { subtotal, tax, shipping, total }
}

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  try {
    const cartItems = localStorage.getItem("cartItems")
    const items = cartItems ? JSON.parse(cartItems) : []
    return {
      items,
      ...calculateCartTotals(items),
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error)
    return {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    }
  }
}

const initialState = loadCartFromStorage()

const cartReducer = (state = initialState, action) => {
  let updatedItems

  switch (action.type) {
    case ADD_TO_CART:
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.item.id)

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            }
          }
          return item
        })
      } else {
        // Add new item to cart
        updatedItems = [
          ...state.items,
          {
            ...action.payload.item,
            quantity: action.payload.quantity,
          },
        ]
      }

      // Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems))

      return {
        ...state,
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      }

    case REMOVE_FROM_CART:
      updatedItems = state.items.filter((item) => item.id !== action.payload)

      // Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems))

      return {
        ...state,
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      }

    case UPDATE_CART_ITEM_QUANTITY:
      updatedItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          }
        }
        return item
      })

      // Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems))

      return {
        ...state,
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      }

    case CLEAR_CART:
      // Clear localStorage
      localStorage.removeItem("cartItems")

      return {
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
      }

    default:
      return state
  }
}

export default cartReducer

