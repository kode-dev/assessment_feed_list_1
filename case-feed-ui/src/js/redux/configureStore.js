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
  // Router middleware
  const middleware = applyMiddleware(routerMiddleware(history));
  const asyncMiddleware = applyMiddleware(thunk);

  // compose() strings together store enhancers in an elegant way.
  // "A store enhancer is a higher-order function that composes a store creator to return a
  // new, enhanced store creator. This is similar to middleware in that it allows you to alter
  // the store interface in a composable way. Store enhancers are much the same concept as
  // higher-order components in React, which are also occasionally called “component enhancers.
  // -  - https://paulkogel.gitbooks.io/redux-docs/content/docs/Glossary.html#store-enhancer
  const composedStoreEnhancer = compose(
    middleware,
    reduxDevTool(),
    asyncMiddleware,
  );

  const store = composedStoreEnhancer(createStore)(rootReducer, initialState);

  // Hot loading: "React Hot Loader is a plugin that allows React components to be live reloaded
  // without the loss of state. It works with Webpack and other bundlers that
  // support both Hot Module Replacement (HMR) and Babel plugins."
  // Reference: https://gaearon.github.io/react-hot-loader/getstarted/.
  if (module.hot) {
    module.hot.accept('./rootReducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
