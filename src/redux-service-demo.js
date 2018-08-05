import * as React from 'react';
import PropTypes from 'prop-types';
import { ActionForm } from './action-form';
import { config } from './config';
import {
  ServiceTabs,
  ActionSelect,
  StateMonitor,
  stateToString,
} from './redux-service-demo.components';

export default class ReduxServiceDemo extends React.Component {
  constructor(props) {
    super(props);
    const allServices = Object.keys(props.services);
    const activeService = allServices[0];
    const activeAction = Object.keys(props.services[activeService].types)[0];
    const stateString = stateToString(props.store.getState());
    const { store } = props;
    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.handleServiceSelect = this.handleServiceSelect.bind(this);
    this.state = { activeService, activeAction, stateString };
    store.subscribe(() => this.setState({ stateString: stateToString(store.getState()) }));
  }

  handleActionSelect(event) {
    const activeAction = event.target.value;
    this.setState({ activeAction });
  }

  handleServiceSelect(event) {
    const activeService = event.target.id;
    const { services } = this.props;
    const activeAction = Object.keys(services[activeService].types)[0];
    this.setState({ activeService, activeAction });
  }

  render() {
    const { services, store } = this.props;
    const { activeService, activeAction, stateString } = this.state;
    const { handleServiceSelect, handleActionSelect } = this;
    return (
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">
            {config.title}
          </h1>
          <ServiceTabs
            services={services}
            activeService={activeService}
            handleServiceSelect={handleServiceSelect}
          />
          <ActionSelect
            services={services}
            activeService={activeService}
            handleActionSelect={handleActionSelect}
          />
          <ActionForm
            activeService={activeService}
            activeAction={activeAction}
            services={services}
            store={store}
          />
          <StateMonitor
            stateString={stateString}
          />
        </div>
      </section>
    );
  }
}

const servicePropType = PropTypes.shape({
  types: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  forms: PropTypes.array.isRequired,
});

ReduxServiceDemo.propTypes = {
  services: PropTypes.shape({ servicePropType }).isRequired,
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
};
