import actionTypes from 'store/actionTypes'
import Request from 'utils/request'
import {makeActionCreator} from 'utils/redux'

const actions = {
  setToggleSideBar: makeActionCreator(actionTypes.TOGGLE_SIDEBAR, 'toggleSideBar'),
  logOut: makeActionCreator(actionTypes.LOGOUT),
  removeToken: makeActionCreator(actionTypes.REMOVE_TOKEN),
  rememberMe: makeActionCreator(actionTypes.REMEMBER_ME, 'rememberMe'),

  getOtp: (username) => ({
    types: [actionTypes.GET_OTP_REQUEST, actionTypes.GET_OTP_SUCCESS, actionTypes.GET_OTP_FAIL],
    callAPI: (state) => Request.post(state, '/identity/otp', {}, username, false)
  }),

  loginOtp: (data) => ({
    types: [actionTypes.LOGIN_OTP_REQUEST, actionTypes.LOGIN_OTP_SUCCESS, actionTypes.LOGIN_OTP_FAILED],
    callAPI: (state) => Request.post(state, '/identity/sing-in', {}, data, false)
  }),
  uploadFile: (data) => ({
    types: [actionTypes.UPLOAD_FILE_REQUEST, actionTypes.UPLOAD_FILE_SUCCESS, actionTypes.UPLOAD_FILE_FAILED],
    callAPI: (state) => Request.post(state, '/uploadFile', {}, data, true)
  }),
  avatar: () => ({
    types: [actionTypes.AVATAR_FILE_REQUEST, actionTypes.AVATAR_FILE_SUCCESS, actionTypes.AVATAR_FILE_FAILED],
    callAPI: (state) => Request.get(state, '/avatar', {}, {}, true)
  }),
  getConfig: () => ({
    types: [actionTypes.GET_CONFIG_REQUEST, actionTypes.GET_CONFIG_SUCCESS, actionTypes.GET_CONFIG_FAILED],
    callAPI: (state) => Request.get(state, '/identity/GetConfig', {}, {}, false)
  }),
  refreshToken: () => ({
    types: [actionTypes.REFRESH_TOKEN_REQUEST, actionTypes.REFRESH_TOKEN_REQUEST, actionTypes.REFRESH_TOKEN_FAILED],
    callAPI: (state) => Request.post(state, '/refresh-tokens/use', {}, {}, false)
  }),
  changeRole: (data) => ({
    types: [actionTypes.CHANGE_ROLE_REQUEST, actionTypes.CHANGE_ROLE_SUCCESS, actionTypes.CHANGE_ROLE_FAILED],
    shouldCallAPI: (state) => state.auth.isLoggedIn,
    callAPI: (state) => Request.post(state, '/changerole', {}, data, true)
  })
}
export default actions
