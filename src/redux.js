import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import renderjson from 'renderjson';

const defaultSeparator = ':';
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

const actionTypeTemplate = (serviceName, actionType) => `${serviceName}${config.separator}${actionType}`;
const serviceReducer = (allTypes, [serviceName, service]) => {
  const typeKeys = Object.keys(service.types)
  return allTypes.concat(typeKeys.map(type => actionTypeTemplate(serviceName, type)));
}
export const allActionTypesForServices = services => Object.entries(services).reduce(serviceReducer, []);
