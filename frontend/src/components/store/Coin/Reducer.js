import {
    FETCH_COIN_MARKET_DATA_REQUEST, FETCH_COIN_MARKET_DATA_SUCCESS, FETCH_COIN_MARKET_DATA_FAILURE,
    FETCH_COIN_DETAILS_BY_ID_REQUEST, FETCH_COIN_DETAILS_BY_ID_SUCCESS, FETCH_COIN_DETAILS_BY_ID_FAILURE,
    FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS,
    FETCH_TOP50_REQUEST, FETCH_TOP50_SUCCESS, FETCH_TOP50_FAILURE,
    FETCH_COINS_REQUEST, FETCH_COINS_SUCCESS, FETCH_COINS_FAILURE,
    SEARCH_COIN_SUCCESS, SEARCH_COIN_REQUEST, SEARCH_COIN_FAILURE
} from "./ActionTypes"

const initialState = {
    coins: [],
    top50Coins: [],
    searchCoinList: [],
    marketChart: { data: [], loading: false, error: null },
    coinDetails: null,
    loading: false,
    error: null
}

const coinReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COINS_REQUEST:
        case FETCH_TOP50_REQUEST:
        case SEARCH_COIN_REQUEST:
        case FETCH_COIN_DETAILS_REQUEST:
        case FETCH_COIN_DETAILS_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_COIN_MARKET_DATA_REQUEST:
            return {
                ...state,
                marketChart: {
                    data: [], loading: true, error: null
                },
                error: null
            }
        case FETCH_COINS_SUCCESS:
            return {
                ...state,
                loading: false,
                coins: action.payload
            };
        case FETCH_TOP50_SUCCESS:
            return {
                ...state,
                loading: false,
                top50Coins: action.payload
            };
        case SEARCH_COIN_SUCCESS:
            return {
                ...state,
                loading: false,
                searchCoinList: action.payload.coins
            };
        case FETCH_COIN_MARKET_DATA_SUCCESS:
            return {
                ...state,
                marketChart: {
                    data: action.payload, loading: false, error: null
                },
                error: null
            }
        case FETCH_COIN_DETAILS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                coinDetails: action.payload
            };
        case FETCH_COIN_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                coinDetails: action.payload
            };
        case FETCH_COINS_FAILURE:
        case FETCH_TOP50_FAILURE:
        case SEARCH_COIN_FAILURE:
        case FETCH_COIN_DETAILS_FAILURE:
        case FETCH_COIN_DETAILS_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FETCH_COIN_MARKET_DATA_FAILURE:
            return {
                ...state,
                marketChart: {
                    data: [], loading: false, error: action.payload
                },
                error: action.payload
            }
        default:
            return state;
    }
}
export default coinReducer;