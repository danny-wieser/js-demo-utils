import { allActionTypesForServices } from './redux';
import * as React from 'react';

function renderOption(optionName) {
  return (
    <option key={optionName} value={optionName}>
      {optionName}
    </option>
  );
}

function ActionSelect({ actions }) {
  return (
    <select id="action-select">
      { actions.map(item => renderOption(item)) }
    </select>
  );
}

export function createActionSelect(services) {
  const allActions = allActionTypesForServices(services);
  return (
    <ActionSelect actions={allActions} />
  );
}
