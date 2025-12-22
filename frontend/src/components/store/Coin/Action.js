

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