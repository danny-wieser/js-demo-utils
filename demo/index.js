/* eslint-env browser */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ReduxServiceDemo, initializeDemoStore } from '../src';
import * as serviceA from './servicea';
import * as serviceB from './serviceb';
import '../src/index.scss';

const state = { serviceA: serviceA.reducer, serviceB: serviceB.reducer };
const store = initializeDemoStore(state);

const services = {
  serviceA: {
    types: serviceA.types,
    actions: serviceA.actions,
    forms: {
      actionType1: ['action1FieldA', 'action1FieldB'],
      thunkAction2: ['action2FieldA', 'action2FieldB'],
    },
  },
  serviceB: {
    types: serviceB.types,
    actions: serviceB.actions,
    forms: {
      typeB: ['fieldB-1', 'fieldB-2'],
    },
  },
};

ReactDOM.render(
  <ReduxServiceDemo services={services} store={store} />, document.getElementById('container'),
);
