import React from 'react';
import Main from './Main.js';
import rootReducer from './rootReducer.js';
import createProvider from './createProvider.js';

export default function App() {
  const ReduxProvider = createProvider(rootReducer);
  return (
    <ReduxProvider>
      <Main />
    </ReduxProvider>
  )
}
