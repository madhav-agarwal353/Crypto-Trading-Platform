import * as actionTypes from './ActionTypes';
const initialState = {
    wallet: {},
    transactions: [],
    loading: false,
    error: null
};

const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_WALLET_REQUEST:
        case actionTypes.GET_WALLET_TRANSACTIONS_REQUEST:
        case actionTypes.DEPOSIT_WALLET_REQUEST:
        case actionTypes.TRANSFER_MONEY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_WALLET_SUCCESS:
        case actionTypes.TRANSFER_MONEY_SUCCESS:
            return {
                ...state,
                loading: false,
                wallet: {
                    id: action.payload.id,
                    balance: Number(action.payload.balance),
                }
            };
        case actionTypes.GET_WALLET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload
            };
        case actionTypes.DEPOSIT_WALLET_SUCCESS:
            return {
                ...state,
                loading: false,
                wallet: action.payload
            };
        case actionTypes.GET_WALLET_FAILURE:
        case actionTypes.GET_WALLET_TRANSACTIONS_FAILURE:
        case actionTypes.DEPOSIT_WALLET_FAILURE:
        case actionTypes.TRANSFER_MONEY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default walletReducer;