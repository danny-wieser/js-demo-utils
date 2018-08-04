import { ReduxServiceDemo } from './redux-service-demo';
import * as redux from './redux';
import { configure, config } from './config'

export { ReduxServiceDemo, configure, config };

export const {
  initializeDemoStore,
  allTypesForServices,
} = redux;
