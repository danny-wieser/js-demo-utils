import * as React from 'react';
import { mount } from 'enzyme';
import ReduxServiceDemo from './redux-service-demo';
import services from './example-services';

jest.mock('./action-form');
jest.mock('./redux-service-demo.components', () => ({
  ServiceTabs: () => null,
  ActionSelect: () => null,
  StateMonitor: () => null,
  stateToString: () => 'stateToStringMock',
}));
jest.mock('./config', () => ({
  config: { title: 'mocked title' },
}));

let store;
let subscribeCallback;

beforeEach(() => {
  store = {
    getState: jest.fn(),
    subscribe: jest.fn((callback) => {
      subscribeCallback = callback;
    }),
  };
});

describe('the ReduxServiceDemo class', () => {
  let wrapper;
  let params;
  beforeEach(() => {
    params = {};
    wrapper = mount(
      <ReduxServiceDemo
        services={services}
        store={store}
        params={params}
      />,
    );
  });

  test('displays the page title based on the configuration', () => {
    expect(wrapper.find('h1.title').text()).toBe('mocked title');
  });

  test('defaults activeService/activeType to first defined service, first type', () => {
    expect(wrapper.state().activeService).toBe('serviceA');
    expect(wrapper.state().activeAction).toBe('typeA');
  });

  test('updates the state active service, type on a call to handleServiceSelect', () => {
    wrapper.instance().handleServiceSelect({ target: { id: 'serviceB' } });
    expect(wrapper.state().activeService).toBe('serviceB');
    expect(wrapper.state().activeAction).toBe('typeD');
  });

  test('updates the state active type on a call to handleActionSelect', () => {
    wrapper.instance().handleActionSelect({ target: { value: 'typeB' } });
    expect(wrapper.state().activeAction).toBe('typeB');
  });

  test('should update the state string on subscribe callback', () => {
    subscribeCallback();
    expect(wrapper.state().stateString).toBe('stateToStringMock');
  });
});

describe('parameter overrides for default values', () => {
  test('defaults service based on parameter provided with a key of service', () => {
    const params = { service: 'serviceB' };
    const wrapper = mount(
      <ReduxServiceDemo
        services={services}
        store={store}
        params={params}
      />,
    );
    expect(wrapper.state().activeService).toBe('serviceB');
    expect(wrapper.state().activeAction).toBe('typeD');
  });

  test('defaults service/action based on parameter provided with a key of service/action', () => {
    const params = { service: 'serviceB', action: 'typeF' };
    const wrapper = mount(
      <ReduxServiceDemo
        services={services}
        store={store}
        params={params}
      />,
    );
    expect(wrapper.state().activeService).toBe('serviceB');
    expect(wrapper.state().activeAction).toBe('typeF');
  });
});
