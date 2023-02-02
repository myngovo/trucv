import {
  TRANSACTION_LIST_FAIL,
  TRANSACTION_LIST_MY_FAIL,
  TRANSACTION_LIST_MY_REQUEST,
  TRANSACTION_LIST_MY_RESET,
  TRANSACTION_LIST_MY_SUCCESS,
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
} from '../constants/transactionConstants'

export const transactionListReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LIST_REQUEST:
      return {
        loading: true,
      }
    case TRANSACTION_LIST_SUCCESS:
      return {
        loading: false,
        transactions: action.payload,
      }
    case TRANSACTION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const transactionListMyReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case TRANSACTION_LIST_MY_SUCCESS:
      return {
        loading: false,
        transactions: action.payload,
      }
    case TRANSACTION_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TRANSACTION_LIST_MY_RESET:
      return { transactions: [] }
    default:
      return state
  }
}
