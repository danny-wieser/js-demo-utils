/* eslint-env browser */
import * as ReactDOM from 'react-dom';
import demoServices from '../src/test-data';
import { ReduxServiceDemo } from '../src';
import * as React from 'react';

ReactDOM.render(
  <ReduxServiceDemo services={demoServices} />, document.getElementById('container')
);
