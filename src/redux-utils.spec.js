import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as utils from './redux-utils';
import { configure } from './config';

jest.mock('redux', () => ({
  createStore: jest.fn(),
  combineReducers: jest.fn(),
  applyMiddleware: jest.fn(),
}));

beforeEach(() => {
  createStore.mockClear();
  combineReducers.mockClear();
  applyMiddleware.mockClear();
});

test('creates a redux store with logging enabled using the provided state', () => {
  const state = { a: {}, b: {} };
  configure({
    useLogger: true,
  });
  utils.initializeDemoStore(state);
  expect(combineReducers.mock.calls[0][0]).toEqual(state);
  expect(applyMiddleware.mock.calls[0][0]).toEqual(thunk, logger);
  expect(createStore.mock.calls).toHaveLength(1);
});

test('creates a redux store with logging disabled using the provided state', () => {
  const state = { a: {}, b: {} };
  configure({
    useLogger: false,
  });
  utils.initializeDemoStore(state);
  expect(combineReducers.mock.calls[0][0]).toEqual(state);
  expect(applyMiddleware.mock.calls[0][0]).toEqual(thunk);
  expect(createStore.mock.calls).toHaveLength(1);
});

test('creates a reducer map', () => {
  const aHandler = jest.fn();
  const bHandler = jest.fn();
  const cHandler = jest.fn();
  const initialState = { foo: 'bar' };
  const handlerMap = { aHandler, bHandler, cHandler };
  const funcResult = utils.createReducer({ foo: 'bar' }, handlerMap);

  funcResult(initialState, { type: 'aHandler' });
  expect(aHandler.mock.calls).toHaveLength(1);

  const bState = { b: 'theb' };
  bHandler.mockReturnValue(bState);
  const bResult = funcResult(initialState, { type: 'bHandler' });
  expect(aHandler.mock.calls).toHaveLength(1);
  expect(bResult).toEqual(bState);

  // invalid handler, default state
  const result = funcResult(initialState, { type: 'invalidHandler' });
  expect(aHandler.mock.calls).toHaveLength(1);
  expect(result).toBe(initialState);

  // c handler never invoked
  expect(cHandler.mock.calls).toHaveLength(0);
});

test('returns a valid action object', () => {
  const data = { foo: 'bar' };
  expect(utils.Action('anAction', data)).toEqual({ type: 'anAction', foo: 'bar' });
});

test('returns a valid ok string', () => expect(utils.ok('typeName')).toBe('typeName.ok'));
test('returns a valid fail string', () => expect(utils.fail('typeName')).toBe('typeName.fail'));
