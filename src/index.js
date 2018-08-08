import * as ReactDOM from 'react-dom';
import * as React from 'react';
import ReduxServiceDemo from './redux-service-demo';
import { initializeDemoStore } from './redux-utils';
import { configure, config } from './config';

const renderDemo = (state, services, container) => {
  const store = initializeDemoStore(state);
  ReactDOM.render(<ReduxServiceDemo services={services} store={store} />, container);
};

export { renderDemo, configure, config };
