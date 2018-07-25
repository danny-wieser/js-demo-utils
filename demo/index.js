/* eslint-env browser */
import * as ReactDOM from 'react-dom';
import * as reduxUtils from '../src/redux';

const demoServices = {
  serviceA: {
    types: {
      typeA: 'typeA',
      typeB: 'typeB',
      typeC: 'typeC',
    },
  },
  serviceB: {
    types: {
      typeD: 'typeD',
      typeE: 'typeE',
      typeF: 'typeF',
    },
  },
};

ReactDOM.render(reduxUtils.createActionSelect(demoServices), document.getElementById('content'));
