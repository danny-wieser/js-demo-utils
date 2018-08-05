import * as React from 'react';

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

export const stateToString = state => JSON.stringify(state, null, 2);
