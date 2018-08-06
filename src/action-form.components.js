import * as React from 'react';
import PropTypes from 'prop-types';

export function getActiveActionForm({ services, activeService, activeAction }) {
  return activeService && activeAction ? services[activeService].forms[activeAction] : [];
}

export function renderFormInput(fieldName, updateFieldValue) {
  return (
    <div className="field" key={fieldName}>
      <div className="control">
        <input
          className="input is-medium"
          id={fieldName}
          type="text"
          onChange={updateFieldValue}
          placeholder={fieldName}
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
      submit
    </button>
  );
}

ActionSubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
