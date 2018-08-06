import * as React from 'react';
import PropTypes from 'prop-types';
import * as components from './action-form.components';

export default class ActionForm extends React.Component {
  constructor(props) {
    super(props);
    const formFields = components.getActiveActionForm(props);
    this.state = {
      formFields,
      fieldValues: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFieldValue = this.updateFieldValue.bind(this);
  }

  componentWillReceiveProps({ services, activeService, activeAction }) {
    const formFields = components.getActiveActionForm(services, activeService, activeAction);
    this.setState({ formFields });
  }

  handleSubmit() {
    const {
      services,
      activeService,
      activeAction,
      store,
    } = this.props;
    const { fieldValues } = this.state;
    const service = services[activeService];
    const actionDispatch = service.actions[activeAction];
    const fieldVals = Object.values(fieldValues);
    store.dispatch(actionDispatch(...fieldVals));
    this.setState({ fieldValues: {} });
  }

  updateFieldValue(event) {
    const fieldName = event.target.id;
    const fieldVal = event.target.value;
    const { fieldValues } = this.state;
    this.setState({ fieldValues: { ...fieldValues, [fieldName]: fieldVal } });
  }

  render() {
    const { formFields } = this.state;
    return (
      <div>
        {formFields.map(item => components.renderFormInput(item, this.updateFieldValue))}
        <components.ActionSubmitButton
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

ActionForm.propTypes = {
  services: PropTypes.object.isRequired,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  activeService: PropTypes.string.isRequired,
  activeAction: PropTypes.string.isRequired,
};
