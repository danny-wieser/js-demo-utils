import * as React from 'react';

function getActiveActionForm(services, activeService, activeAction) {
  return activeService && activeAction ? services[activeService].forms[activeAction] : [];
}

function renderFormInput(fieldName, updateFieldValue) {
  return (
    <div className="field" key={fieldName}>
      <div className="control">
        <input
          className="input is-medium"
          id={fieldName}
          type="text"
          onChange={updateFieldValue}
          placeholder={fieldName}/>
      </div>
    </div>
  )
}

function ActionSubmitButton({ handleSubmit }) {
  return (
    <button
      onClick={handleSubmit}
      className="button is-primary is-medium is-fullwidth">submit</button>
  )
}

export class ActionForm extends React.Component {
  constructor(props) {
    super(props);
    const formFields = getActiveActionForm(props.services, props.activeService, props.activeAction);
    this.state = {
      formFields,
      fieldValues: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFieldValue = this.updateFieldValue.bind(this);
  }

  componentWillReceiveProps({ services, activeService, activeAction }) {
    const formFields = getActiveActionForm(services, activeService, activeAction);
    this.setState({ formFields });
  }

  handleSubmit() {
    const service = this.props.services[this.props.activeService];
    const actionDispatch = service.actions[this.props.activeAction];
    const fieldVals = Object.values(this.state.fieldValues);
    this.props.store.dispatch(actionDispatch.apply(null, fieldVals));
    this.setState({ fieldValues: {} });
  }

  updateFieldValue(event) {
    const fieldName = event.target.id;
    const fieldVal = event.target.value;
    this.setState({ fieldValues: { ...this.state.fieldValues, [fieldName]: fieldVal } });
  }

  render() {
    return (
      <div>
        {this.state.formFields.map(item => renderFormInput(item, this.updateFieldValue))}
        <ActionSubmitButton
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
