import { Action, createReducer } from '../src/redux';

export const types = {
  someAction: 'someAction',
};

const someAction = (fieldA, fieldB) => (dispatch) => {
  dispatch(Action(types.someAction, { payload: { fieldA, fieldB } }));
};

export const actions = {
  someAction,
};

export const INITIAL_STATE = {};

function someActionHandler(state, data) {
  return { ...state, ...data.payload };
}

export const reducer = createReducer(INITIAL_STATE, {
  [types.someAction]: (state, action) => someActionHandler(state, action),
});
