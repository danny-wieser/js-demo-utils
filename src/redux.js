import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export function initializeDemoStore(state) {
  const allReducers = combineReducers(state);
  return createStore(allReducers, applyMiddleware(thunk, logger));
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
