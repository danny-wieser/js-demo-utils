import { Action, ok, createReducer } from '../src/redux';

export const types = {
  actionType1: 'actionType1',
  thunkAction2: 'thunkAction2',
};

// a non-async action, just sets the passed in parameters as the state
const actionType1 = payload => Action(types.actionType1, { payload });

// a thunk (async) action, returns a loading state and then the payload after a timeout
const thunkAction2 = payload => (dispatch) => {
  dispatch(Action(types.thunkAction2, { payload }));
  return setTimeout(() => {
    dispatch(Action(ok(types.thunkAction2), { payload }));
  }, 5000);
};

export const actions = {
  actionType1,
  thunkAction2,
};

export const INITIAL_STATE = {};

function actionType1Handler(state, data) {
  return { ...state, ...data.payload };
}

function thunkAction2LoadingHandler(state) {
  return { ...state, isLoading: true };
}

function thunkAction2OKHandler(state, data) {
  return { ...state, isLoading: false, ...data.payload };
}

export const reducer = createReducer(INITIAL_STATE, {
  [types.actionType1]: (state, action) => actionType1Handler(state, action),
  [types.thunkAction2]: (state, action) => thunkAction2LoadingHandler(state, action),
  [ok(types.thunkAction2)]: (state, action) => thunkAction2OKHandler(state, action),
});
