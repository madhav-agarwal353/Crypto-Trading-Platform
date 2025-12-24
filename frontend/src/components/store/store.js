import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer"
import coinReducer from "./Coin/Reducer"
import newsReducer from "./News/Reducer"
import { combineReducers, legacy_createStore, applyMiddleware } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    coin: coinReducer,
    news : newsReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
