import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import ReduxServiceDemo from './redux-service-demo';
import { configure, config } from './config';

function initializeDemoStore(services) {
  const servicesReducer = (state, service) => ({ ...state, [service]: services[service].reducer });
  const allServiceReducers = Object.keys(services).reduce(servicesReducer, {});
  const combinedReducers = combineReducers(allServiceReducers);
  const middlewares = [thunk];
  if (config.useLogger) {
    middlewares.push(logger);
  }
  return createStore(combinedReducers, applyMiddleware(...middlewares));
}

const renderDemo = (services, container) => {
  const demoStore = initializeDemoStore(services);
  ReactDOM.render(<ReduxServiceDemo services={services} store={demoStore} />, container);
  return demoStore;
};

export {
  initializeDemoStore,
  renderDemo,
  configure,
  config,
};
