import axios from "axios"
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, GET_USER_REQUEST_SUCCESS, GET_USER_REQUEST, GET_USER_REQUEST_FAILURE, LOGOUT_REQUEST } from "./ActionTypes"
import { useNavigate } from "react-router-dom";
export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    const baseURL = "http://localhost:8080"
    // process.env.REACT_APP_API_URL ||

    try {
        const response = await axios.post(`${baseURL}/auth/signup`, userData.values)
        const user = response.data
        console.log("Registration successful:", user)
        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt })
        localStorage.setItem("jwt", user.jwt)
        // userData.navigate("/");
    }

    catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.response ? error.response.data : error.message })
        console.error("Registration failed:", error.response ? error.response.data : error.message)
    }
}
export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    const baseURL = "http://localhost:8080"
    // process.env.REACT_APP_API_URL ||

    try {
        const response = await axios.post(`${baseURL}/auth/signin`, userData.values)
        const user = response.data
        console.log("Login successful:", user)
        dispatch({ type: LOGIN_SUCCESS, payload: user.jwt })
        localStorage.setItem("jwt", user.jwt)
        // userData.navigate("/");
    }

    catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.response ? error.response.data : error.message })
        console.error("Login failed:", error.response ? error.response.data : error.message)
    }
}
export const getUserData = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    const baseURL = "http://localhost:8080"
    // process.env.REACT_APP_API_URL ||

    try {
        const response = await axios.get(`${baseURL}/api/users/profile`,
            {
                headers: { Authorization: `Bearer ${jwt.jwt}` }
            })
        const user = response.data
        console.log("Registration successful:", user)
        dispatch({ type: GET_USER_REQUEST_SUCCESS, payload: user })
        // jwt.navigate("/");
    }

    catch (error) {
        dispatch({ type: GET_USER_REQUEST_FAILURE, payload: error.response ? error.response.data : error.message })
        console.error("Registration failed:", error.response ? error.response.data : error.message)
    }
}
export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT_REQUEST });
}
