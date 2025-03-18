import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY, CLEAR_CART } from "./types"

// Add item to cart
export const addToCart =
  (item, quantity = 1) =>
  (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { item, quantity },
    })
  }

// Remove item from cart
export const removeFromCart = (itemId) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: itemId,
  })
}

// Update cart item quantity
export const updateCartItemQuantity = (itemId, quantity) => (dispatch) => {
  dispatch({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { id: itemId, quantity },
  })
}

// Clear cart
export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART })
}

