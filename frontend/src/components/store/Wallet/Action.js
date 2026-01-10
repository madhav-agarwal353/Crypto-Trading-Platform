import * as  actionTypes from './ActionTypes';
import axios from 'axios';
const baseURL = "http://localhost:8080"
export const getUserWallet = (token) => async (dispatch) => {

    dispatch({ type: actionTypes.GET_WALLET_REQUEST });
    try {
        const response = await axios.get(`${baseURL}/api/wallet/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: actionTypes.GET_WALLET_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_WALLET_FAILURE, payload: error.message });
    }
};

export const getWalletTransactions = (token) => async (dispatch) => {
    async (dispatch) => {
        dispatch({ type: actionTypes.GET_WALLET_TRANSACTIONS_REQUEST });
        try {
            const response = await axios.get(`${baseURL}/api/wallet/transactions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({ type: actionTypes.GET_WALLET_TRANSACTIONS_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: actionTypes.GET_WALLET_TRANSACTIONS_FAILURE, payload: error.message });
        }
    };
};

export const depositToWallet = (token, orderId, paymentId, navigate) => async (dispatch) => {
    dispatch({ type: actionTypes.DEPOSIT_WALLET_REQUEST });
    try {
        const response = await axios.put(`${baseURL}/api/wallet/deposit`, null, {
            params: {
                orderId: orderId,
                paymentId: paymentId
            },
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        dispatch({ type: actionTypes.DEPOSIT_WALLET_SUCCESS, payload: response.data });
        navigate('/wallet');
    } catch (error) {
        dispatch({ type: actionTypes.DEPOSIT_WALLET_FAILURE, payload: error.message });
    }
};

export const paymentHandler = (token, amount, paymentMethod) => async (dispatch) => {
    dispatch({ type: actionTypes.DEPOSIT_WALLET_REQUEST });
    try {
        const response = await axios.post(`${baseURL}/api/payment/${paymentMethod}/amount/${amount}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        window.location.href = response.data.payment_url;
        // dispatch({
        //     type: actionTypes.DEPOSIT_WALLET_SUCCESS,
        //     payload: response.data
        // });
    } catch (error) {
        dispatch({ type: actionTypes.DEPOSIT_WALLET_FAILURE, payload: error.message });
    }
};
export const transferMoney = (token, walletId, reqData) =>
    async (dispatch) => {
        dispatch({ type: actionTypes.TRANSFER_MONEY_REQUEST });
        try {
            const response = await axios.put(`${baseURL}/api/${walletId}/transfer`, reqData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({ type: actionTypes.TRANSFER_MONEY_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: actionTypes.TRANSFER_MONEY_FAILURE, payload: error.message });
        }
    };