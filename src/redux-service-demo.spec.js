import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ActionForm } from './action-form';
import { ReduxServiceDemo } from './redux-service-demo';
jest.mock('./action-form')

const services = {
  serviceA: {
    types: {
      typeA: 'typeA',
      typeB: 'typeB',
    },
    forms: {
      typeA: ['fieldA', 'fieldB'],
      typeB: ['fieldC', 'fieldD'],
    },
  },
  serviceB: {
    types: {
      typeD: 'typeD',
      typeE: 'typeE',
      typeF: 'typeF',
    },
    forms: {
      typeD: ['fieldG', 'fieldH'],
      typeE: ['fieldI', 'fieldJ'],
      typeF: ['fieldK', 'fieldL'],
    },
  },
};

describe('the ReduxServiceDemo class', () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = {
      getState: jest.fn(),
      subscribe: jest.fn(),
    };
    wrapper = mount(
      <ReduxServiceDemo
        services={services}
        store={store}
      />,
    );
  });

  test('will render the service tabs', () => {
    expect(wrapper.find('div.tabs').find('li')).toHaveLength(2);
  });

  test('will default the active service to the first defined service', () => {
    expect(wrapper.find('li').at(0).hasClass('is-active')).toEqual(true);
  });

  test('will default to the type selections for the first defined service', () => {
    const select = wrapper.find('select');
    expect(select.find('option').at(0).text()).toEqual('typeA');
    expect(select.find('option').at(1).text()).toEqual('typeB');
  });

  test('will subscribe to store changes', () => {
    expect(store.subscribe.mock.calls).toHaveLength(1);
  });

  describe('when the active service is changed', () => {
    beforeEach(() => {
      wrapper.find('div.tabs').find('a').at(1).simulate('click');
    });

    test('will set the is-active class on the active service', () => {
      expect(wrapper.find('li').at(1).hasClass('is-active')).toEqual(true);
    });

    test('will update the type selections based on the active service', () => {
      const select = wrapper.find('select');
      expect(select.find('option').at(0).text()).toEqual('typeD');
      expect(select.find('option').at(1).text()).toEqual('typeE');
      expect(select.find('option').at(2).text()).toEqual('typeF');
    });

    test('will update the form based on the ', () => {

    });
  });
});
