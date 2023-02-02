import axios from 'axios'
import {
  PAY_MPESA_CALLBACK_FAIL,
  PAY_MPESA_CALLBACK_REQUEST,
  PAY_MPESA_CALLBACK_SUCCESS,
  PAY_MPESA_FAIL,
  PAY_MPESA_REQUEST,
  PAY_MPESA_SUCCESS,
} from '../constants/payConstants'

export const lipaNaMpesa =
  (phone, amount, subscription) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAY_MPESA_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const id = userInfo._id

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        '/api/mpesa/stk',
        {
          params: { phone, amount, id, subscription },
        },
        config
      )

      dispatch({
        type: PAY_MPESA_SUCCESS,
        payload: data,
      })

      console.log(data)
    } catch (error) {
      console.log(error)
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        console.log('not auth')
      }
      dispatch({
        type: PAY_MPESA_FAIL,
        payload: message,
      })
    }
  }

export const lipaNaMpesaCallback = (token) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAY_MPESA_CALLBACK_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post('/api/mpesa/stk_callback', config)

    console.log('callback response ', data)

    dispatch({
      type: PAY_MPESA_CALLBACK_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      //   dispatch(logout())
      console.log('not auth')
    }
    dispatch({
      type: PAY_MPESA_CALLBACK_FAIL,
      payload: message,
    })
  }
}
