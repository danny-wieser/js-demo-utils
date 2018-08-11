import * as ReactDOM from 'react-dom';
import * as React from 'react';
import ReduxServiceDemo from './redux-service-demo';
import { initializeDemoStore } from './redux-utils';
import { configure, config } from './config';

let demoStore;
const renderDemo = (services, container) => {
  demoStore = initializeDemoStore(services);
  ReactDOM.render(<ReduxServiceDemo services={services} store={demoStore} />, container);
};

export { renderDemo, configure, config, demoStore };
