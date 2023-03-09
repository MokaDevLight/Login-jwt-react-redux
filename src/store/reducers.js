import {combineReducers} from 'redux'
import auth from 'store/auth/reducers'
import customer from 'store/customer/reducers'
import organization from 'store/organization/reducers'
import merchant from 'store/merchant/reducers'
import company from 'store/company/reducers'

const appReducer = combineReducers({
    auth: auth,
    customer: customer,
    organization: organization,
    merchant: merchant,
    company: company
  }),
  rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      return appReducer(undefined, action)
    }
    return appReducer(state, action)
  }

export default (state, action) => rootReducer(action.type === 'LOGOUT' ? undefined : state, action)
