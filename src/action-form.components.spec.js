import { shallow } from 'enzyme';
import * as components from './action-form.components';
import services from './example-services';

test('returns the correct active action form fields, given a service object, service name and action type', () => {
  const result = components.getActiveActionForm(services, 'serviceA', 'typeB');
  expect(result).toEqual(['fieldC', 'fieldD']);
});

test('provides a state object with default field values, given an array of fields', () => {
  const result = components.getDefaultFormValues(['fieldA', 'fieldB', 'fieldC']);
  expect(result).toEqual({
    fieldA: '',
    fieldB: '',
    fieldC: '',
  });
});

test('returns a blank array of fields, given an undefined service name and type', () => {
  const result = components.getActiveActionForm(services, undefined, undefined);
  expect(result).toEqual([]);
});

describe('rendering a form input field', () => {
  let wrapper;
  let updateFunction;
  beforeEach(() => {
    updateFunction = jest.fn();
    wrapper = shallow(components.formInput('fieldName', 'fieldVal', updateFunction));
  });

  test('adds a key of the field name', () => {
    expect(wrapper.find('div').at(0).key()).toBe('fieldName');
  });

  test('sets the input ID to the field name', () => {
    expect(wrapper.find('input').prop('id')).toBe('fieldName');
  });

  test('sets the input placeholder to the field name', () => {
    expect(wrapper.find('input').prop('placeholder')).toBe('fieldName');
  });

  test('sets the value of the field', () => {
    expect(wrapper.find('input').props().value).toBe('fieldVal');
  });

  test('sets the the update function as the onChange handler', () => {
    expect(wrapper.find('input').prop('onChange')).toBe(updateFunction);
  });
});

describe('rendering the action form button', () => {
  let wrapper;
  let handleSubmit;
  beforeEach(() => {
    handleSubmit = jest.fn();
    wrapper = shallow(components.ActionSubmitButton({ handleSubmit }));
  });

  test('sets the the function as the onClick handler', () => {
    expect(wrapper.find('button').prop('onClick')).toBe(handleSubmit);
  });
});
