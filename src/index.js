import * as ReactDOM from 'react-dom';
import * as React from 'react';
import ReduxServiceDemo from './redux-service-demo';
import { initializeDemoStore } from './redux-utils';
import { configure, config } from './config';

const renderDemo = (services, container) => {
  const store = initializeDemoStore(services);
  ReactDOM.render(<ReduxServiceDemo services={services} store={store} />, container);
};

export { renderDemo, configure, config };
