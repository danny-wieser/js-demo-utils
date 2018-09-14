import * as React from 'react';
import PropTypes from 'prop-types';
import { fieldValueForDisplay } from './util';

export function getDefaultFormValues(fieldNames, params) {
  if (!fieldNames) {
    return {};
  }
  const formValueReducer = (valueObj, fieldName) => {
    const fieldValue = params && params[fieldName] ? params[fieldName] : '';
    return { ...valueObj, [fieldName]: fieldValue };
  };
  return fieldNames.reduce(formValueReducer, {});
}

export function getActiveActionForm(services, activeService, activeAction) {
  const forms = activeService && activeAction ? services[activeService].forms[activeAction] : [];
  return forms || [];
}

export function formInput(fieldName, fieldValue, handleFieldUpdate) {
  const displayFieldValue = fieldValueForDisplay(fieldValue);
  return (
    <div className="field" key={fieldName}>
      <div className="control">
        <input
          className="input is-medium"
          id={fieldName}
          type="text"
          value={displayFieldValue}
          placeholder={fieldName}
          onChange={handleFieldUpdate}
        />
      </div>
    </div>
  );
}

export function ActionSubmitButton({ handleSubmit }) {
  return (
    <button
      onClick={handleSubmit}
      className="button is-primary is-medium is-fullwidth"
      type="button"
    >
      dispatch
    </button>
  );
}

ActionSubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
