import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { isPlainObject } from "./utils";

function configureStore(options = {}) {
  const { reducer, preloadState } = options;
  const middlewares = options.middlewares || [thunk];
  let rootReducer = reducer;
  if (isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer);
  }

  return createStore(rootReducer, preloadState, applyMiddleware(...middlewares));
}

export default configureStore;
