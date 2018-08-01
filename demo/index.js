/* eslint-env browser */
import * as ReactDOM from 'react-dom';
import demoServices from '../src/test-data';
import { ReduxServiceDemo } from '../src';
import * as React from 'react';
import '../src/index.scss'

ReactDOM.render(
  <ReduxServiceDemo services={demoServices} />, document.getElementById('container')
);
