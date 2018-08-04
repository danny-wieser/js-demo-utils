import { Action, createReducer } from '../src/redux';

export const types = {
  typeB: 'typeB',
};

const typeB = payload => (dispatch) => {
  dispatch(Action(types.typeB, { payload }));
  return { ...payload };
};

export const actions = {
  typeB,
};

export const INITIAL_STATE = {};

function typeBHandler(state, data) {
  return { ...state, ...data.payload };
}

export const reducer = createReducer(INITIAL_STATE, {
  [types.typeB]: (state, action) => typeBHandler(state, action),
});
