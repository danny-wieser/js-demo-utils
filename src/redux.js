import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { config } from './config';

export function initializeDemoStore(state) {
  const allReducers = combineReducers(state);
  return createStore(allReducers, applyMiddleware(thunk, logger));
}

export const Action = (type, data) => ({ type, ...data });

export function createReducer(initialState, handlerMap) {
  return (state = initialState, action) => {
    const handler = (action && action.type) ? handlerMap[action.type] : undefined;
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
}
