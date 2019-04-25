import React from 'react';
import devTools from 'remote-redux-devtools';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

const { NODE_ENV } = process.env;

export function _getStore(reducer, initialStore = {}) {
  const enhancerMiddlewares = [];
  const entityMiddlewares = [];
  const coreMiddlewares = [];

  const allMiddlewares = [
    ...enhancerMiddlewares,
    ...entityMiddlewares,
    ...coreMiddlewares
  ];

  if (NODE_ENV === 'development') {
    return createStore(
      reducer,
      initialStore,
      compose(
        applyMiddleware(...allMiddlewares),
        devTools({
          name: Platform.OS,
          hostname: 'localhost',
          port: 5678
        })
      )
    );
  } else {
    return createStore(
      reducer,
      initialStore,
      compose(
        applyMiddleware(...allMiddlewares)
      )
    );
  }
}

const ReduxProvider = (reducer, initialStore) => {
  const store = _getStore(reducer, initialStore);
  console.log({store})
  return ({children}) =>
    <Provider store={store}>
      {children}
    </Provider>;
}

export default ReduxProvider;
