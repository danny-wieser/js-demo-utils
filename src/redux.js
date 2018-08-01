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
