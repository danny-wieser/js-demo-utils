/* eslint-disable import/no-extraneous-dependencies */
import * as $ from 'jquery';

/* function dispatchAction(services, store) {
  const selectedAction = $('#action-select').val();
  const service = selectedAction.substr(0, selectedAction.indexOf(SEPARATOR));
  const action = selectedAction.substr(selectedAction.indexOf(SEPARATOR) + SEPARATOR.length);
  services[service].handleDispatch(action, store);
}

function handleSelection(services) {
  const selectedAction = $('#action-select').val();
  const actionTemplate = $('#action-template');
  actionTemplate.empty();
  const service = selectedAction.substr(0, selectedAction.indexOf(SEPARATOR));
  const type = selectedAction.substr(selectedAction.indexOf(SEPARATOR) + SEPARATOR.length);
  services[service].handleSelection(type, actionTemplate);
}

export function eventHandlers(services, store) {
  $('#dispatch').on('click', () => dispatchAction(services, store));
  $('#action-select').on('change', () => handleSelection(services));
  handleSelection(services);
} */

const textTmplt = field => `<input id="${field}" type="text" placeholder="${field}"/>`;

export function createActionTemplate(actionFields) {
  const reducer = (template, field) => `${template}<div class="auto cell">${textTmplt(field)}<div>`;
  return actionFields.reduce(reducer, '');
}

export function appendActionTemplate(actionsFields, container) {
  $(createActionTemplate(actionsFields)).appendTo(container);
}

export const fieldVal = fieldName => $(`#${fieldName}`).val();

export function fieldVals(fieldNames) {
  const reducer = (accumulator, currentValue) => {
    accumulator[currentValue] = fieldVal(currentValue);
    return accumulator;
  };
  return fieldNames.reduce(reducer, {});
}
