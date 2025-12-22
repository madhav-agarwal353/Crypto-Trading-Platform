import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, GET_USER_REQUEST, GET_USER_REQUEST_SUCCESS, GET_USER_REQUEST_FAILURE, LOGOUT_REQUEST } from "./ActionTypes"

const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                jwt: action.payload
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                jwt: action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USER_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case GET_USER_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                user: null,
                jwt: null
            }
        default:
            return state;
    }
}

export default authReducer;