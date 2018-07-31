import { allTypesForServices } from './redux';
import { config } from './config';
import * as React from 'react';

const getServiceName = selectVal => selectVal.substr(0, selectVal.indexOf(config.separator));
const getActionName = selectVal => selectVal.substr(selectVal.indexOf(config.separator) + 1);

function getActiveActionForm(services, activeAction) {
  const serviceName = getServiceName(activeAction);
  const actionName = getActionName(activeAction);
  return activeAction ? services[serviceName].forms[actionName] : [];
}

function renderActionOption(optionName) {
  return (
    <option key={optionName} value={optionName}>
      {optionName}
    </option>
  );
}

export const ActionSelect = ({ allActions, handleActionSelect }) => {
  return (
    <div class="field">
      <div class="select is-fullwidth is-medium">
        <select id="action-select" onChange={handleActionSelect}>
          { allActions.map(item => renderActionOption(item)) }
        </select>
      </div>
    </div>
  );
}

function renderFormInput(fieldName) {
  return (
    <div class="field">
      <div class="control">
        <input
          class="input is-medium"
          key={fieldName}
          id={fieldName}
          type="text"
          placeholder={fieldName}/>
      </div>
    </div>
  )
}

export function ActionForm({ services, activeAction }) {
  const formFields = getActiveActionForm(services, activeAction);
  return (
    formFields.map(item => renderFormInput(item))
  );
}

export class ReduxServiceDemo extends React.Component {
  constructor(props) {
    super(props);
    const allActions = allTypesForServices(props.services);
    this.state = {
      allActions,
      activeAction: allActions[0],
    };
    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleActionSelect(event) {
    const activeAction = event.target.value;
    this.setState({ activeAction });
  }

  handleSubmit(event) {
    console.log('form submit');
  }

  render() {
    return (
      <div class="container">
        <ActionSelect
          allActions={this.state.allActions}
          handleActionSelect={this.handleActionSelect}
        />
        <ActionForm
          activeAction={this.state.activeAction}
          services={this.props.services}
        />
      </div>
    );
  }
}
