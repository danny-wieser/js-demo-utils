/* eslint-env browser */
import * as ReactDOM from 'react-dom';
import * as demoUtils from '../src';
import demoServices from '../src/test-data';

ReactDOM.render(demoUtils.createActionSelect(demoServices), document.getElementById('action-select'));
