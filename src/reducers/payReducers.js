import {
  PAY_MPESA_CALLBACK_FAIL,
  PAY_MPESA_CALLBACK_REQUEST,
  PAY_MPESA_CALLBACK_RESET,
  PAY_MPESA_CALLBACK_SUCCESS,
  PAY_MPESA_FAIL,
  PAY_MPESA_REQUEST,
  PAY_MPESA_RESET,
  PAY_MPESA_SUCCESS,
} from '../constants/payConstants'

export const orderPayMpesaReducer = (state = { transaction: {} }, action) => {
  switch (action.type) {
    case PAY_MPESA_REQUEST:
      return {
        loading: true,
      }
    case PAY_MPESA_SUCCESS:
      return {
        loading: false,
        transaction: action.payload,
      }
    case PAY_MPESA_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PAY_MPESA_RESET:
      return {}
    default:
      return state
  }
}

export const orderPayMpesaCallbackReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_MPESA_CALLBACK_REQUEST:
      return {
        loading: true,
      }
    case PAY_MPESA_CALLBACK_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PAY_MPESA_CALLBACK_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PAY_MPESA_CALLBACK_RESET:
      return {}
    default:
      return state
  }
}
