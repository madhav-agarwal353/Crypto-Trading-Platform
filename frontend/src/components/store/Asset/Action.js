import * as types from "./ActionsTypes";
import axios from "axios";

const baseURL = "http://localhost:8080";

export const getAssetsById =
    (assetsId, jwt) => async (dispatch) => {
        dispatch({ type: types.GET_ASSET_REQUEST });
        try {
            const response = await axios.get(
                `${baseURL}/api/assets/${assetsId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: types.GET_ASSET_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: types.GET_ASSET_FAILURE, payload: error.message });
        }
    };

export const getAssetDetails =
    (coinId, jwt) => async (dispatch) => {
        dispatch({ type: types.GET_ASSET_DETAILS_REQUEST });
        try {
            const response = await axios.get(
                `${baseURL}/api/assets/coin/${coinId}/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
            );
            dispatch({ type: types.GET_ASSET_DETAILS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: types.GET_ASSET_DETAILS_FAILURE, payload: error.message });
        }
    }

export const getUserAssets =
    (jwt) => async (dispatch) => {
        dispatch({ type: types.GET_USER_ASSETS_REQUEST });
        try {
            const response = await axios.get(
                `${baseURL}/api/assets`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: types.GET_USER_ASSETS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: types.GET_USER_ASSETS_FAILURE, payload: error.message });
        }
    }