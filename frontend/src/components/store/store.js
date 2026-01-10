import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer"
import coinReducer from "./Coin/Reducer"
import newsReducer from "./News/Reducer"
import walletReducer from "./Wallet/Reducer";
import { combineReducers, legacy_createStore, applyMiddleware } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    coin: coinReducer,
    news: newsReducer,
    wallet: walletReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
