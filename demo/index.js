/* eslint-env browser */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { configure, ReduxServiceDemo, initializeDemoStore } from '../src';
import * as todos from './todos-service';
import * as anotherService from './another-service';
import '../src/index.scss';

configure({
  useLogger: true,
  title: 'Redux Service Demo',
});

const state = {
  todos: todos.reducer,
  anotherService: anotherService.reducer,
};
const store = initializeDemoStore(state);

const services = {
  todos: {
    types: todos.types,
    actions: todos.actions,
    forms: {
      fetchTodoById: ['id'],
      addTodo: ['userId', 'title'],
    },
  },
  anotherService: {
    types: anotherService.types,
    actions: anotherService.actions,
    forms: {
      someAction: ['fieldA', 'fieldB'],
    },
  },
};

ReactDOM.render(
  <ReduxServiceDemo services={services} store={store} />, document.getElementById('container'),
);
