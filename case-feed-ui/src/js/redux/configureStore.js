import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducers';

// Redux DevTools Extension for Chrome and Firefox
const reduxDevTool = () => {
  if (window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    return window.devToolsExtension();
  }
  return f => f;
};

export default function configureStore(initialState, history) {
  const middleware = applyMiddleware(routerMiddleware(history));
  const asyncMiddleware = applyMiddleware(thunk);

  const composedStoreEnhancer = compose(
    middleware,
    reduxDevTool(),
    asyncMiddleware,
  );

  const store = composedStoreEnhancer(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./rootReducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
