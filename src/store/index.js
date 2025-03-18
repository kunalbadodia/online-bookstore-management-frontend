import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

// Reducers
import authReducer from "./reducers/authReducer"
import bookReducer from "./reducers/bookReducer"
import cartReducer from "./reducers/cartReducer"
import orderReducer from "./reducers/orderReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
  cart: cartReducer,
  orders: orderReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

