import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { config } from './config';

export function initializeDemoStore(services) {
  const servicesReducer = (state, service) => ({ ...state, [service]: services[service].reducer });
  const allServiceReducers = Object.keys(services).reduce(servicesReducer, {});
  const combinedReducers = combineReducers(allServiceReducers);
  const middlewares = [thunk];
  if (config.useLogger) {
    middlewares.push(logger);
  }
  return createStore(combinedReducers, applyMiddleware(...middlewares));
}

const OK = 'ok';
const FAIL = 'fail';

export const Action = (type, data) => ({ type, ...data });
export const ok = type => `${type}.${OK}`;
export const fail = type => `${type}.${FAIL}`;

export function createReducer(initialState, handlerMap) {
  return (state = initialState, action) => {
    const handler = (action && action.type) ? handlerMap[action.type] : undefined;
    return handler ? handler(state, action) : state;
  };
}
