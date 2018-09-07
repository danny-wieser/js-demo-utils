import * as React from 'react';
import PropTypes from 'prop-types';

export const servicePropType = PropTypes.shape({
  types: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  forms: PropTypes.array.isRequired,
});

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
      <a
        id={serviceName}
        onClick={handleServiceSelect}
        onKeyPress={handleServiceSelect}
        role="button"
        tabIndex="-1"
      >
        {serviceName}
      </a>
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
};
ServiceTabs.propTypes = {
  services: PropTypes.shape({ servicePropType }).isRequired,
  activeService: PropTypes.string.isRequired,
  handleServiceSelect: PropTypes.func.isRequired,
};

export const ActionSelect = ({
  services,
  activeService,
  activeAction,
  handleActionSelect,
}) => {
  const allActions = Object.keys(services[activeService].types);
  return (
    <div className="field">
      <div className="select is-fullwidth is-medium">
        <select id="action-select" onChange={handleActionSelect} value={activeAction}>
          { allActions.map(item => renderActionOption(item, activeAction)) }
        </select>
      </div>
    </div>
  );
};
ActionSelect.propTypes = {
  services: PropTypes.shape({ servicePropType }).isRequired,
  activeService: PropTypes.string.isRequired,
  activeAction: PropTypes.string.isRequired,
  handleActionSelect: PropTypes.func.isRequired,
};

export const StateMonitor = ({ stateString }) => (
  <div>
    <pre className="state">
      {stateString}
    </pre>
  </div>
);
StateMonitor.propTypes = {
  stateString: PropTypes.string,
};
StateMonitor.defaultProps = {
  stateString: '',
};

export const stateToString = state => JSON.stringify(state, null, 2);
