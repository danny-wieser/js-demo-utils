import * as React from 'react';

function getActiveActionForm(services, activeService, activeAction) {
  return activeService && activeAction ? services[activeService].forms[activeAction] : [];
}

function renderFormInput(fieldName, updatePayload) {
  return (
    <div className="field" key={fieldName}>
      <div className="control">
        <input
          className="input is-medium"
          id={fieldName}
          type="text"
          onChange={updatePayload}
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
      payload: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePayload = this.updatePayload.bind(this);
  }

  componentWillReceiveProps({ services, activeService, activeAction }) {
    const formFields = getActiveActionForm(services, activeService, activeAction);
    this.setState({ formFields });
  }

  handleSubmit() {
    const service = this.props.services[this.props.activeService];
    const actionDispatch = service.actions[this.props.activeAction];
    this.props.store.dispatch(actionDispatch(this.state.payload));
  }

  updatePayload(event) {
    const fieldName = event.target.id;
    const fieldVal = event.target.value;
    this.setState({ payload: { ...this.state.payload, [fieldName]: fieldVal } });
  }

  render() {
    return (
      <div>
        {this.state.formFields.map(item => renderFormInput(item, this.updatePayload))}
        <ActionSubmitButton
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
