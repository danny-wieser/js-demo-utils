/* eslint-env browser */
import 'url-search-params-polyfill';
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

function getParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const params = Array.from(searchParams.entries());
  const reducer = (allParams, entry) => {
    const key = entry[0];
    const value = entry[1];
    return { ...allParams, [key]: value };
  };
  return params.reduce(reducer, {});
}

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
  const params = getParams();
  ReactDOM.render(<ReduxServiceDemo
    services={services}
    store={demoStore}
    params={params}
  />, container);
  return demoStore;
};

export {
  initializeDemoStore,
  renderDemo,
  configure,
  config,
};
