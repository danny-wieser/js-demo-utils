/* eslint-disable import/no-extraneous-dependencies */
import 'whatwg-fetch';
import {
  ActionAsync,
  createReducer,
  asyncInvoke,
  ReducerAsyncActions,
} from 'redux-service-util';

// an example redux data service using the todos api here: http://jsonplaceholder.typicode.com/
const todosPath = 'https://jsonplaceholder.typicode.com/todos';
const getTodoByIdPath = id => `${todosPath}/${id}`;

export const types = {
  allTodos: 'allTodos',
  fetchTodoById: 'fetchTodoById',
  addTodo: 'addTodo',
};

// service implementations
const doFetch = async (path) => {
  const response = await fetch(path);
  return response.ok ? response.json() : Promise.reject(response.status);
};

const doPost = async (body) => {
  const response = await fetch(todosPath, {
    method: 'POST',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.ok ? response.json() : Promise.reject(response.status);
};

const fetchAllTodos = async () => {
  const { ok, error, data } = await asyncInvoke(doFetch, todosPath);
  const todoReduce = (todos, todo) => ({ ...todos, [todo.id]: { ...todo } });
  const payload = data.reduce(todoReduce, {});
  return { ok, error: { status: error }, payload };
};

const fetchTodo = async (idToRetrieve) => {
  const { ok, error, data } = await asyncInvoke(doFetch, getTodoByIdPath(idToRetrieve));
  const { id } = data || {};
  const payload = ok ? { [id]: { ...data } } : {};
  return { ok, error: { status: error }, payload };
};

const postTodo = async (userId, title) => {
  const body = JSON.stringify({ title, userId, completed: false });
  const { ok, error, data } = await asyncInvoke(doPost, body);
  const { id } = data || {};
  const payload = ok ? { [id]: { ...data } } : {};
  return { ok, error: { status: error }, payload };
};

// action creators
const allTodos = id => ActionAsync(types.allTodos, fetchAllTodos, id);
const fetchTodoById = id => ActionAsync(types.fetchTodoById, fetchTodo, id);
const addTodo = (userId, title) => ActionAsync(types.fetchTodoById, postTodo, userId, title);

export const actions = {
  allTodos,
  fetchTodoById,
  addTodo,
};

// reducer map, handled by ReducerAsyncActions
export const INITIAL_STATE = { isLoading: false };
const asyncActions = [types.allTodos, types.fetchTodoById];
export const reducer = createReducer(INITIAL_STATE, {
  ...ReducerAsyncActions(asyncActions),
});
