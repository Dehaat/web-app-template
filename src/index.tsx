import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'react-app-polyfill/ie11'

import configureStore from 'store/create-store'
import App from './app/App'
import './index.css'

const MOUNT_NODE = document.getElementById('app')

const store = configureStore()

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    MOUNT_NODE,
  )
}

if (module.hot) {
  module.hot.accept()
  if (MOUNT_NODE) ReactDOM.unmountComponentAtNode(MOUNT_NODE)
  render()
} else {
  render()
}
