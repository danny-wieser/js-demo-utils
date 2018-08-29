/* eslint-env browser */
import 'babel-polyfill';
import { configure, renderDemo } from '../src';
import * as todos from './todos-service';
import * as anotherService from './another-service';
import '../src/index.scss';

configure({
  useLogger: true,
  title: 'Redux Service Demo',
});

const services = {
  todos: {
    reducer: todos.reducer,
    types: todos.types,
    actions: todos.actions,
    forms: {
      fetchTodoById: ['id'],
      addTodo: ['userId', 'title'],
    },
  },
  anotherService: {
    reducer: anotherService.reducer,
    types: anotherService.types,
    actions: anotherService.actions,
    forms: {
      someAction: ['fieldA', 'fieldB'],
    },
  },
};

renderDemo(services, document.getElementById('container'));
