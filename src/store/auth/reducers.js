import {combineReducers} from 'redux'
import actionTypes from 'store/actionTypes'
import SecureStorage, {tokenType} from 'utils/secureStorage'

const data = (state = '', action) => {
    switch (action.type) {
      case actionTypes.GET_OTP_SUCCESS:
        return action.response
      default:
        return state
    }
  },
  toggleSideBar = (state = false, action) => {
    switch (action.type) {
      case actionTypes.TOGGLE_SIDEBAR:
        return !state
      default:
        return state
    }
  },
  logout = (state = '', action) => {
    switch (action.type) {
      case actionTypes.LOGOUT:
        localStorage.clear()
        return state
      default:
        return state
    }
  },
  token = (state = null, action) => {
    let token = null
    switch (action.type) {
      case actionTypes.LOGIN_OTP_SUCCESS:
      case actionTypes.CHANGE_ROLE_SUCCESS:
        token = action.response.accessToken
        SecureStorage.setToken(tokenType.JWT, token).catch((error) => console.log('LOGIN_OTP_ERROR', error))
        return token
      case actionTypes.REMOVE_TOKEN:
        return ''
      default:
        return state
    }
  },
  refreshToken = (state = null, action) => {
    let token = null
    switch (action.type) {
      case actionTypes.LOGIN_OTP_SUCCESS:
      case actionTypes.CHANGE_ROLE_SUCCESS:
        token = action.response.refreshToken
        SecureStorage.setToken(tokenType.JWT, token).catch((error) => console.log('LOGIN_OTP_ERROR', error))
        return token
      default:
        return state
    }
  },
  config = (state = null, action) => {
    switch (action.type) {
      case actionTypes.GET_CONFIG_SUCCESS:
        return action.response
      default:
        return state
    }
  },
  getOtpToken = (state = null, action) => {
    switch (action.type) {
      case actionTypes.GET_OTP_SUCCESS:
        return action.response.token
      default:
        return state
    }
  },
  isLoggedIn = (state = false, action) => {
    switch (action.type) {
      case actionTypes.LOGIN_OTP_SUCCESS:
        return true
      case actionTypes.LOGOUT:
        return false
      default:
        return state
    }
  },
  menu = (state = false, action) => {
    switch (action.type) {
      case actionTypes.LOGIN_OTP_SUCCESS:
      case actionTypes.CHANGE_ROLE_SUCCESS:
        if (typeof action.response.menu === 'object') {
          SecureStorage.setToken(tokenType.MENU, JSON.stringify(action.response.menu)).catch((error) =>
            console.log('SAVE_MENU_ERROR', error)
          )
        }
        return action.response.menu
      case actionTypes.LOGOUT:
        return false
      default:
        return state
    }
  },
  rememberMe = (state = false, action) => {
    switch (action.type) {
      case actionTypes.REMEMBER_ME:
        return !state
      default:
        return state
    }
  },
  avatar = (state = '', action) => {
    switch (action.type) {
      case actionTypes.AVATAR_FILE_SUCCESS:
        return action.response
      case actionTypes.AVATAR_FILE_FAILED:
        return ''
      default:
        return state
    }
  },
  reducers = combineReducers({
    data,
    token,
    config,
    getOtpToken,
    toggleSideBar,
    logout,
    refreshToken,
    isLoggedIn,
    menu,
    rememberMe,
    avatar
  })

export default reducers
