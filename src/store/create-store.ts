import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import createReducer from './reducer'
import { reducers } from './reducer-index'

export default function configureStore(initialState = {}) {
  let composeEnhancers = compose

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    composeEnhancers = composeWithDevTools({})
  }

  /* setup for middlewares */
  const middlewares = []

  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(
    createReducer(reducers),
    initialState,
    composeEnhancers(...enhancers),
  )

  return store
}
