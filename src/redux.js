import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import renderjson from 'renderjson';

const defaultSeparator = '::';
const config = {
  separator: defaultSeparator,
};

// TODO: configure?
// renderjson.set_show_to_level('all');

export function configure(opts) {
  config.separator = opts.separator || defaultSeparator;
}

export function initializeStore(state) {
  const allReducers = combineReducers(state);
  return createStore(allReducers, applyMiddleware(thunk, logger));
}

export function monitorState($container, store) {
  store.subscribe(() => {
    $container.empty();
    $container.append(renderjson(store.getState()));
  });
}

export function allActionsForService(services) {
  const serviceKeys = Object.entries(services);
  const serviceReducer = (types, [serviceName, service]) => {
    const actionTypes = Object.keys(service.types);
    actionTypes.forEach(actionType => types.push(`${serviceName}${config.separator}${actionType}`));
    return types;
  };
  return serviceKeys.reduce(serviceReducer, []);
}
