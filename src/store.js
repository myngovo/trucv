import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  orderPayMpesaReducer,
  orderPayMpesaCallbackReducer,
} from './reducers/payReducers'

import {
  transactionListReducer,
  transactionListMyReducer,
} from './reducers/transactionReducers'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userForgotPasswordReducer
} from './reducers/userReducers'

const reducer = combineReducers({
  orderPayMpesa: orderPayMpesaReducer,
  orderPayMpesaCallback: orderPayMpesaCallbackReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  transactionList: transactionListReducer,
  transactionListMy: transactionListMyReducer,
  userForgotPassword:  userForgotPasswordReducer
  
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
