import { UPDATE_PROFILE_SUCCESS } from "./types"
import api from "../../services/api"

// Fetch user profile
export const fetchUserProfile = () => async (dispatch) => {
  try {
    const response = await api.get("/api/users/profile")

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    console.error("Error fetching user profile:", error)
    throw error
  }
}

// Update user profile
export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    const response = await api.put("/api/users/profile", userData)

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: response.data,
    })

    return response.data
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

