import {applyMiddleware, compose, createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootReducer from 'store/reducers'
import {callAPIMiddleware} from 'utils/redux'
import logger from 'redux-logger'
import {isProduction} from 'utils/enviroment'

const persistConfig = {
    key: 'root',
    storage
  },
  middleware = [thunk, callAPIMiddleware],
  composedEnhancers = compose(applyMiddleware(...middleware, logger)),
  persistedReducer = persistReducer(persistConfig, rootReducer)
if (!isProduction) {
  middleware.push(logger)
}

export default () => {
  const store = createStore(persistedReducer, composedEnhancers),
    persistor = persistStore(store)
  return {store, persistor}
}
