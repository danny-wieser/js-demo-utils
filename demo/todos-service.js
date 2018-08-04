import 'whatwg-fetch';
import { Action, ok, fail, createReducer } from '../src/redux';

//an example redux data service using the todos api here: http://jsonplaceholder.typicode.com/
const todosPath = 'https://jsonplaceholder.typicode.com/todos';
const getTodoByIdPath = id => `${todosPath}/${id}`;

export const types = {
  fetchTodoById: 'fetchTodoById',
  addTodo: 'addTodo',
};

const retrieveTodo = async(id) => {
  const response = await fetch(getTodoByIdPath(id));
  return response.ok ? response.json() : Promise.reject(new Error(response.status));
}

const createTodo = async(userId, title) => {
  const response = await fetch(todosPath, {
    method: 'POST',
    body: JSON.stringify({ title, userId, completed: false }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  return response.ok ? response.json() : Promise.reject(new Error(response.status));
}

export const fetchTodoById = id => async (dispatch) => {
  dispatch(Action(types.fetchTodoById, { payload: { id }}));
  try {
    const payload = await retrieveTodo(id);
    dispatch(Action(ok(types.fetchTodoById), { payload }));
  } catch (error) {
    dispatch(Action(fail(types.fetchTodoById), { payload: { error }}));
  }
};

export const addTodo = (userId, title) => async (dispatch) => {
  dispatch(Action(types.addTodo, { payload: { userId, title }}));
  try {
    const payload = await createTodo(userId, title);
    dispatch(Action(ok(types.addTodo), { payload }));
  } catch (error) {
    dispatch(Action(fail(types.addTodo), { payload: { error }}));
  }
};

export const actions = {
  fetchTodoById,
  addTodo,
};

export const INITIAL_STATE = {};

function fetchTodoByIdLoading(state, action) {
  return { ...state, isLoading: true };
}

function fetchTodoByIdOK(state, action) {
  const { id } = action.payload;
  return { ...state, isLoading: false, [id]: { ...action.payload } };
}

function fetchTodoByIdFail(state, action) {
  //in a real service we would do something with this error of course
  return { ...state, isLoading: false, hasError: true };
}

function addTodoLoading(state, action) {
  return { ...state, isLoading: true };
}

function addTodoOK(state, action) {
  const { id } = action.payload;
  return { ...state, isLoading: false, [id]: { ...action.payload } };
}

function addTodoFail(state, action) {
  //in a real service we would do something with this error of course
  return { ...state, isLoading: false, hasError: true };
}

export const reducer = createReducer(INITIAL_STATE, {
  [types.fetchTodoById]: (state, action) => fetchTodoByIdLoading(state, action),
  [ok(types.fetchTodoById)]: (state, action) => fetchTodoByIdOK(state, action),
  [fail(types.fetchTodoById)]: (state, action) => fetchTodoByIdFail(state, action),
  [types.addTodo]: (state, action) => addTodoLoading(state, action),
  [ok(types.addTodo)]: (state, action) => addTodoOK(state, action),
  [fail(types.addTodo)]: (state, action) => addTodoFail(state, action),
});
