import { Action } from '../src/redux';
import { createReducer } from '../src/redux';

export const types = {
  actionType1: 'actionType1',
  actionType2: 'actionType2',
};

const actionType1 = payload => dispatch => {
  dispatch(Action(types.actionType1, { payload }));
  return { ...payload };
};

const actionType2 = payload => dispatch => {
  dispatch(Action(types.actionType2, { payload }));
  return { ...payload };
};

export const actions = {
  actionType1,
  actionType2
};

export const INITIAL_STATE = {};

function actionType1Handler(state, data) {
  return { ...state, ...data.payload };
}

function actionType2Handler(state, data) {
  return { ...state, ...data.payload };
}

export const reducer = createReducer(INITIAL_STATE, {
  [types.actionType1]: (state, action) => actionType1Handler(state, action),
  [types.actionType2]: (state, action) => actionType2Handler(state, action),
});
