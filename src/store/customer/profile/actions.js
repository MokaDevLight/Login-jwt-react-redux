import actionTypes from 'store/actionTypes'
import Request from 'utils/request'

const actions = {
  getProfile: () => ({
    types: [actionTypes.GET_PROFILE_REQUEST, actionTypes.GET_PROFILE_SUCCESS, actionTypes.GET_PROFILE_FAILED],
    callAPI: (state) => Request.get(state, '/profile', {}, {}, true)
  }),
  saveProfile: (data) => ({
    types: [actionTypes.SAVE_PROFILE_REQUEST, actionTypes.SAVE_PROFILE_SUCCESS, actionTypes.SAVE_PROFILE_FAILED],
    callAPI: (state) => Request.post(state, '/Profile', {}, data, true)
  }),
  sendEmailOtp: (email) => ({
    types: [actionTypes.SEND_EMAIL_OTP_REQUEST, actionTypes.SEND_EMAIL_OTP_SUCCESS, actionTypes.SEND_EMAIL_OTP_FAILED],
    callAPI: (state) => Request.post(state, '/profile/sendemailcode', {}, email, true)
  }),
  verifyEmail: (data) => ({
    types: [actionTypes.VERIFY_EMAIL_REQUEST, actionTypes.VERIFY_EMAIL_SUCCESS, actionTypes.VERIFY_EMAIL_FAILED],
    callAPI: (state) => Request.post(state, '/profile/verifyemail', {}, data, true)
  }),
  saveProfilePicture: (data) => ({
    types: [
      actionTypes.SAVE_PROFILE_PICTURE_REQUEST,
      actionTypes.SAVE_PROFILE_PICTURE_SUCCESS,
      actionTypes.SAVE_PROFILE_PICTURE_FAILED
    ],
    callAPI: (state) => Request.post(state, '/Profilepic', {}, data, true)
  })
}

export default actions
