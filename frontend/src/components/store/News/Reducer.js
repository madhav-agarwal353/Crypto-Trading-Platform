import {
    FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE
} from "./ActionTypes"
const initialState = {
    newsObject: [],
}
const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                newsObject: action.payload
            };
        case FETCH_NEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
export default newsReducer;