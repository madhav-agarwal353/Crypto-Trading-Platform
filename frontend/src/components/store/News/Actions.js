import axios from "axios"
import {
    FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE
} from "./ActionTypes"
export const getnews = (page) => async (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST })
    const baseURL = "http://localhost:8080"
    // process.env.REACT_APP_API_URL ||

    try {
        const response = await axios.get(`${baseURL}/news/crypto`)
        const news = response.data
        console.log("news list fetched successfully:", news.results)
        dispatch({ type: FETCH_NEWS_SUCCESS, payload: news.results })
    }
    catch (error) {
        dispatch({ type: FETCH_NEWS_FAILURE, payload: error.response ? error.response.data : error.message })
        console.error("news fetch failed:", error.response ? error.response.data : error.message)
    }
}
