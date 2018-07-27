import { allTypesForServices } from './redux';
import * as React from 'react';

function selectAction(event) {
  return (
    <div>{event.target.value}</div>
  );
}

function renderOption(optionName) {
  return (
    <option key={optionName} value={optionName}>
      {optionName}
    </option>
  );
}

function ActionSelect({ actions }) {
  return (
    <select id="action-select" onChange={selectAction}>
      { actions.map(item => renderOption(item)) }
    </select>
  );
}

function ActionForm() {
  return (
    <div>Form</div>
  );
}

export function createActionSelect(services) {
  const allActions = allTypesForServices(services);
  return (
    <ActionSelect actions={allActions} />
  );
}
