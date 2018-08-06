import * as React from 'react';
import { mount } from 'enzyme';
import ActionForm from './action-form';
import services from './example-services';
import { getActiveActionForm } from './action-form.components';

jest.mock('./action-form.components', () => ({
  ActionSubmitButton: () => null,
  renderFormInput: () => null,
  getActiveActionForm: jest.fn(),
}));

describe('the ActionForm class', () => {
  let store;
  let wrapper;
  getActiveActionForm.mockReturnValue(['firstField', 'secondField']);
  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
    };
    wrapper = mount(
      <ActionForm
        services={services}
        store={store}
        activeService="serviceA"
        activeAction="typeD"
      />,
    );
  });

  test('properly initializes the form fields for the active service and type', () => {
    expect(wrapper.state().formFields).toEqual(['firstField', 'secondField']);
  });

  test('will update the form fields when the activeService prop is updated', () => {
    getActiveActionForm.mockReturnValue(['newFieldOne', 'newFieldTwo']);
    wrapper.setProps({ activeService: 'serviceB' });
    expect(wrapper.state().formFields).toEqual(['newFieldOne', 'newFieldTwo']);
  });

  test('will update the state field values on a call to updateFieldValue', () => {
    expect(wrapper.state().fieldValues.firstField).toBeUndefined();
    const changeEventOne = { target: { id: 'firstField', value: 'changedValue' } };
    wrapper.instance().updateFieldValue(changeEventOne);

    const changeEventTwo = { target: { id: 'secondField', value: 'AnotherChangedValue' } };
    wrapper.instance().updateFieldValue(changeEventTwo);

    expect(wrapper.state().fieldValues.firstField).toEqual('changedValue');
    expect(wrapper.state().fieldValues.secondField).toEqual('AnotherChangedValue');
  });

  describe('on a call to handleSubmit', () => {
    beforeEach(() => {
      services.serviceA.actions = { typeD: jest.fn() };
      wrapper.setState({ fieldValues: { firstField: 'value1', secondField: 'value2' } });
      wrapper.instance().handleSubmit();
    });

    test('will dispatch the action method with field value parameters', () => {
      expect(store.dispatch.mock.calls).toHaveLength(1);
      expect(services.serviceA.actions.typeD.mock.calls).toHaveLength(1);
      expect(services.serviceA.actions.typeD.mock.calls[0][0]).toEqual('value1');
    });

    test('will reset state field values', () => {
      expect(wrapper.state().fieldValues).toEqual({});
    });
  });
});
