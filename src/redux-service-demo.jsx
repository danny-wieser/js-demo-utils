import * as React from 'react';
import { ActionForm } from './action-form';
import { config } from './config';

export function renderActionOption(optionName) {
  return (
    <option key={optionName} value={optionName}>
      {optionName}
    </option>
  );
}

export function renderTab(serviceName, activeService, handleServiceSelect) {
  const activeClass = activeService === serviceName ? 'is-active' : '';
  return (
    <li key={serviceName} className={activeClass}>
      <a id={serviceName} onClick={handleServiceSelect}>{serviceName}</a>
    </li>
  );
}

export const ServiceTabs = ({ services, activeService, handleServiceSelect }) => {
  const serviceNames = Object.keys(services);
  return (
    <div className="tabs is-centered">
      <ul>
        { serviceNames.map(item => renderTab(item, activeService, handleServiceSelect)) }
      </ul>
    </div>
  );
}

export const ActionSelect = ({ services, activeService, handleActionSelect }) => {
  const allActions = Object.keys(services[activeService].types);
  return (
    <div className="field">
      <div className="select is-fullwidth is-medium">
        <select id="action-select" onChange={handleActionSelect}>
          { allActions.map(item => renderActionOption(item)) }
        </select>
      </div>
    </div>
  );
}

export const StateMonitor = ({ stateString })=> {
  return (
    <div>
      <pre className="state">{ stateString }</pre>
    </div>
  );
}

const stateToString = state => JSON.stringify(state, null, 2);

export class ReduxServiceDemo extends React.Component {
  constructor(props) {
    super(props);
    const allServices = Object.keys(props.services);
    const activeService = allServices[0];
    const activeAction = Object.keys(props.services[activeService].types)[0];

    this.state = {
      activeService,
      activeAction,
      stateString: stateToString(props.store.getState())
    };
    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.handleServiceSelect = this.handleServiceSelect.bind(this);
    props.store.subscribe(state => this.setState({ stateString: stateToString(props.store.getState()) }));
  }

  handleActionSelect(event) {
    const activeAction = event.target.value;
    this.setState({ activeAction });
  }

  handleServiceSelect(event) {
    const activeService = event.target.id;
    const activeAction = Object.keys(this.props.services[activeService].types)[0];
    this.setState({ activeService, activeAction });
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">{config.title}</h1>
          <ServiceTabs
            services={this.props.services}
            activeService={this.state.activeService}
            handleServiceSelect={this.handleServiceSelect}/>
          <ActionSelect
            services={this.props.services}
            activeService={this.state.activeService}
            handleActionSelect={this.handleActionSelect}
          />
          <ActionForm
            activeService={this.state.activeService}
            activeAction={this.state.activeAction}
            services={this.props.services}
            store={this.props.store}
          />
          <StateMonitor
            stateString={this.state.stateString}
          />
        </div>
      </section>
    );
  }
}
