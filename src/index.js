import React from 'react'
import ReactDOM from 'react-dom'
import 'styles/index.scss'
import reportWebVitals from 'reportWebVitals'
import factory from 'store'
import {Provider} from 'react-redux'
import Routes from 'routes/routes'
import {BrowserRouter} from 'react-router-dom'
import {ToastProvider} from 'react-toast-notifications'
import {removeLogs} from 'utils/enviroment'
const {store} = factory()

removeLogs()
ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </React.StrictMode>
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
