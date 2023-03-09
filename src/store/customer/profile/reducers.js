import {combineReducers} from 'redux'
import actionTypes from 'store/actionTypes'
const profile = (state = '', action) => {
    switch (action.type) {
      case actionTypes.GET_PROFILE_SUCCESS:
        return action.response
      default:
        return state
    }
  },
  reducers = combineReducers({
    profile
  })

export default reducers
