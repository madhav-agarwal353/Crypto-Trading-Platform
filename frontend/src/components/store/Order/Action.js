import axios from 'axios'
import * as types from './ActionTypes'
const baseUrl = 'http://localhost:8080'
export const payOrder = ({ jwt, orderData, amount }) => async (dispatch) => {

    dispatch({ type: types.PAY_ORDER_REQUEST });
    try {
        const response = await axios.post(`${baseUrl}/api/orders/pay`, orderData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({
            type: types.PAY_ORDER_SUCCESS,
            payload: response.data,
            amount
        });
        console.log(response)
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: types.PAY_ORDER_FAILURE,
            error: error.message,
        })
    }
}

export const getOrderById = (jwt, orderId) => async (dispatch) => {
    dispatch({ type: types.GET_ORDER_REQUEST });
    try {
        const response = await axios.get(`${baseUrl}/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({
            type: types.GET_ORDER_SUCCESS,
            payload: response.data,
        })
    }
    catch (error) {
        dispatch({
            type: types.GET_ORDER_FAILURE,
            error: error.message,
        });
    }
};

export const getAllOrdersForUser = ({ jwt, orderType, assetSymbol }) =>
    async (dispatch) => {
        dispatch({ type: types.GET_ALL_ORDER_REQUEST });
        try {
            const response = await axios.get(`${baseUrl}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                params: {
                    order_type: orderType,
                    asset_symbol: assetSymbol,
                },
            });
            dispatch({
                type: types.GET_ALL_ORDER_SUCCESS,
                payload: response.data,
            })
        }
        catch (error) {
            dispatch({
                type: types.GET_ALL_ORDER_FAILURE,
                error: error.message,
            });
        }
    };