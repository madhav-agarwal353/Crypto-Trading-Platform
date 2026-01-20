import * as types from './ActionsTypes'
const initialState = {
    asset: null,
    userAsset: [],
    loading: false,
    error: null,
    assetDetails: null
};

const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ASSET_REQUEST:
        case types.GET_USER_ASSETS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.GET_ASSET_SUCCESS:
            return {
                ...state,
                loading: false,
                asset: action.payload
            };
        case types.GET_ASSET_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                assetDetails: action.payload
            };
        case types.GET_USER_ASSETS_SUCCESS:
            return {
                ...state,
                loading: false,
                userAsset: action.payload
            };
        case types.GET_ASSET_FAILURE:
        case types.GET_USER_ASSETS_FAILURE:
        case types.GET_ASSET_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default assetReducer;