import * as React from 'react';
import PropTypes from 'prop-types';
import * as components from './action-form.components';
import { parseFieldValue } from './util';

export default class ActionForm extends React.Component {
  constructor(props) {
    super(props);
    const formFields = components.getActiveActionForm(props.services,
      props.activeService, props.activeAction);
    const formValues = components.getDefaultFormValues(formFields, props.params);
    this.state = {
      formFields,
      formValues,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fieldChange = this.handleFieldUpdate.bind(this);
  }

  componentWillReceiveProps({
    services,
    activeService,
    activeAction,
    params,
  }) {
    const formFields = components.getActiveActionForm(services, activeService, activeAction);
    const formValues = components.getDefaultFormValues(formFields, params);
    this.setState({ formFields, formValues });
  }

  handleFieldUpdate(event) {
    const { formValues } = this.state;
    const fieldValue = parseFieldValue(event.target.value);
    const updatedFormValues = {
      ...formValues,
      [event.target.id]: fieldValue,
    };
    this.setState({ formValues: updatedFormValues });
  }

  handleSubmit() {
    const {
      services,
      activeService,
      activeAction,
      store,
    } = this.props;
    const { formFields, formValues } = this.state;
    const service = services[activeService];
    const actionDispatch = service.actions[activeAction];
    const params = Object.values(formValues);
    console.info(`handleSubmit|${activeService}|${activeAction}|`, formValues);
    store.dispatch(actionDispatch(...params));
    const resetFormValues = components.getDefaultFormValues(formFields);
    this.setState({ formValues: resetFormValues });
  }

  render() {
    const { formFields, formValues } = this.state;
    return (
      <div>
        {formFields.map(field => components.formInput(field, formValues[field], this.fieldChange))}
        <components.ActionSubmitButton handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

ActionForm.propTypes = {
  services: PropTypes.object.isRequired,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  params: PropTypes.object.isRequired,
  activeService: PropTypes.string.isRequired,
  activeAction: PropTypes.string.isRequired,
};
