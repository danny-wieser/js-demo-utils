import * as ReactDOM from 'react-dom';
import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { renderDemo, initializeDemoStore } from './index';
import services from './example-services';
import { configure } from './config';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

jest.mock('redux', () => ({
  createStore: jest.fn(),
  combineReducers: jest.fn(),
  applyMiddleware: jest.fn(),
}));

const expectedReducers = {
  serviceA: services.serviceA.reducer,
  serviceB: services.serviceB.reducer,
};
const containerMock = {};
const mockStore = {
  getState: jest.fn(),
  subscribe: jest.fn(),
};

beforeEach(() => {
  ReactDOM.render.mockClear();
  createStore.mockClear();
  createStore.mockReturnValue(mockStore);
  combineReducers.mockClear();
  applyMiddleware.mockClear();
});

test('renderDemo initializes the store', () => {
  renderDemo(services, containerMock);
});

test('renderDemo renders the DOM', () => {
  renderDemo(services, containerMock);
  expect(ReactDOM.render.mock.calls).toHaveLength(1);
});

test('creates a redux store with logging enabled using the provided services object', () => {
  configure({ useLogger: true });
  initializeDemoStore(services);
  expect(combineReducers.mock.calls[0][0]).toEqual(expectedReducers);
  expect(applyMiddleware.mock.calls[0][0]).toEqual(thunk, logger);
  expect(createStore.mock.calls).toHaveLength(1);
});

test('creates a redux store with logging disabled using the provided state', () => {
  configure({ useLogger: false });
  initializeDemoStore(services);
  expect(combineReducers.mock.calls[0][0]).toEqual(expectedReducers);
  expect(applyMiddleware.mock.calls[0][0]).toEqual(thunk);
  expect(createStore.mock.calls).toHaveLength(1);
});
