import * as React from 'react';
import { ActionForm } from './action-form';

function getDefaultAction(defaultService) {
  return Object.keys(defaultService.types)[0];
}

function renderActionOption(optionName) {
  return (
    <option key={optionName} value={optionName}>
      {optionName}
    </option>
  );
}

function renderTab(serviceName, activeService, handleServiceSelect) {
  const activeClass = activeService === serviceName ? 'is-active' : '';
  return (
    <li key={serviceName} className={activeClass}>
      <a id={serviceName} onClick={handleServiceSelect}>{serviceName}</a>
    </li>
  );
}

const ServiceTabs = ({ services, activeService, handleServiceSelect }) => {
  const serviceNames = Object.keys(services);
  return (
    <div className="tabs is-centered">
      <ul>
        { serviceNames.map(item => renderTab(item, activeService, handleServiceSelect)) }
      </ul>
    </div>
  );
}

const ActionSelect = ({ services, activeService, handleActionSelect }) => {
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

export class ReduxServiceDemo extends React.Component {
  constructor(props) {
    super(props);
    const allServices = Object.keys(props.services);
    this.state = {
      activeService: allServices[0],
      activeAction: getDefaultAction(props.services[allServices[0]])
    };
    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.handleServiceSelect = this.handleServiceSelect.bind(this);
  }

  handleActionSelect(event) {
    const activeAction = event.target.value;
    this.setState({ activeAction });
  }

  handleServiceSelect(event) {
    const activeService = event.target.id;
    const activeAction = getDefaultAction(this.props.services[activeService]);
    this.setState({ activeService, activeAction });
  }

  render() {
    return (
      <div className="container">
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
      </div>
    );
  }
}
