import axios from 'axios'
import {
  TRANSACTION_LIST_FAIL,
  TRANSACTION_LIST_MY_FAIL,
  TRANSACTION_LIST_MY_REQUEST,
  TRANSACTION_LIST_MY_SUCCESS,
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
} from '../constants/transactionConstants'
import { logout } from './userActions'

export const listTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/transactions`, config)

    dispatch({
      type: TRANSACTION_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload: message,
    })
  }
}

export const listMyTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/mpesa/mytransactions`, config)

    dispatch({
      type: TRANSACTION_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRANSACTION_LIST_MY_FAIL,
      payload: message,
    })
  }
}
