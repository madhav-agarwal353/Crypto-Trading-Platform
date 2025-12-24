
import axios from "axios"
import {
    FETCH_COINS_REQUEST, FETCH_COINS_SUCCESS, FETCH_COINS_FAILURE, FETCH_TOP50_FAILURE, FETCH_TOP50_REQUEST, FETCH_TOP50_SUCCESS
    , FETCH_COIN_MARKET_DATA_REQUEST, FETCH_COIN_MARKET_DATA_SUCCESS, FETCH_COIN_MARKET_DATA_FAILURE,
    FETCH_COIN_DETAILS_BY_ID_REQUEST, FETCH_COIN_DETAILS_BY_ID_SUCCESS, FETCH_COIN_DETAILS_BY_ID_FAILURE
} from "./ActionTypes"

export const getCoinList = (page) => async (dispatch) => {
    dispatch({ type: FETCH_COINS_REQUEST })
    const baseURL = "http://localhost:8080"
    // process.env.REACT_APP_API_URL ||

    try {
        const response = await axios.get(`${baseURL}/api/coins?page=${page}`)
        const coins = response.data
        console.log("Coin list fetched successfully:", coins)
        dispatch({ type: FETCH_COINS_SUCCESS, payload: coins })
    }
    catch (error) {
        dispatch({ type: FETCH_COINS_FAILURE, payload: error.response ? error.response.data : error.message })
        console.error("Registration failed:", error.response ? error.response.data : error.message)
    }
}

export const getTop50Coins = () => async (dispatch) => {
    dispatch({ type: FETCH_TOP50_REQUEST })
    const baseURL = "http://localhost:8080"
    // process.env.REACT_APP_API_URL ||
    try {
        const response = await axios.get(`${baseURL}/api/coins/top50`)
        const top50Coins = response.data
        console.log("Top 50 coins fetched successfully:", top50Coins)
        dispatch({ type: FETCH_TOP50_SUCCESS, payload: top50Coins })
    }
    catch (error) {
        dispatch({ type: FETCH_TOP50_FAILURE, payload: error.response ? error.response.data : error.message })
        console.error("Registration failed:", error.response ? error.response.data : error.message)
    }
}
export const fetchMarketChartData = (coinId, days, jwt) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_MARKET_DATA_REQUEST })
    const baseURL = "http://localhost:8080"
    // process.env.REACT_APP_API_URL ||
    try {
        const response = await axios.get(`${baseURL}/api/coins/${coinId}/market-chart?days=${days}`)
        const marketData = response.data
        console.log("Market data fetched successfully:", marketData)
        dispatch({ type: FETCH_COIN_MARKET_DATA_SUCCESS, payload: marketData })
    }
    catch (error) {
        dispatch({ type: FETCH_COIN_MARKET_DATA_FAILURE, payload: error.response ? error.response.data : error.message })
        console.error("Fetching market data failed:", error.response ? error.response.data : error.message)
    }
}

export const fetchCoinDetailsById = (coinId) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_DETAILS_BY_ID_REQUEST })
    const baseURL = "http://localhost:8080"
    // process.env.REACT_APP_API_URL ||
    try {
        const response = await axios.get(`${baseURL}/api/coins/${coinId}/details`)
        const coinDetails = response.data
        console.log("Coin details fetched successfully:", coinDetails)
        dispatch({ type: FETCH_COIN_DETAILS_BY_ID_SUCCESS, payload: coinDetails })
    }
    catch (error) {
        dispatch({ type: FETCH_COIN_DETAILS_BY_ID_FAILURE, payload: error.response ? error.response.data : error.message })
        console.error("Fetching coin details failed:", error.response ? error.response.data : error.message)
    }
}

export const searchCoin = (query) => async (dispatch) => {
    dispatch({ type: SEARCH_COIN_REQUEST })
    const baseURL = "http://localhost:8080"
    // process.env.REACT_APP_API_URL ||
    try {
        const response = await axios.get(`${baseURL}/api/coins/search?query=${query}`)
        const searchResults = response.data
        console.log("Search results fetched successfully:", searchResults)
        dispatch({ type: SEARCH_COIN_SUCCESS, payload: searchResults })
    }
    catch (error) {
        dispatch({ type: SEARCH_COIN_FAILURE, payload: error.response ? error.response.data : error.message })
        console.error("Searching coin failed:", error.response ? error.response.data : error.message)
    }
}
