import { shallow } from 'enzyme';
import * as serviceDemo from './redux-service-demo';
// import testServices from './test-data';

test('will render an action option select control', () => {
  const wrapper = shallow(serviceDemo.renderActionOption('theOption'));
  expect(wrapper).toHaveLength(1);
  expect(wrapper.prop('value')).toEqual('theOption');
  expect(wrapper.text()).toEqual('theOption');
});

describe('the renderTab function', () => {
  const theHandler = jest.fn();
  test('will render an anchor for the provided service name', () => {
    const wrapper = shallow(serviceDemo.renderTab('theService', 'anotherService', theHandler));
    expect(wrapper.find('a').prop('id')).toEqual('theService');
    expect(wrapper.find('a').text()).toEqual('theService');
  });

  test('will connect the onClick action to the provided handler', () => {
    const wrapper = shallow(serviceDemo.renderTab('theService', 'anotherService', theHandler));
    expect(wrapper.find('a').prop('onClick')).toEqual(theHandler);
  });

  test('will add the is-active class to the list item for an inactive service', () => {
    const wrapper = shallow(serviceDemo.renderTab('theService', 'theService', theHandler));
    expect(wrapper.find('li').hasClass('is-active')).toEqual(true);
  });

  test('will not add the is-active class to the list item for an inactive service', () => {
    const wrapper = shallow(serviceDemo.renderTab('theService', 'anotherService', theHandler));
    expect(wrapper.find('li').hasClass('is-active')).toEqual(false);
  });

  test('will invoke the click handler on click of the anchor', () => {
    const wrapper = shallow(serviceDemo.renderTab('theService', 'anotherService', theHandler));
    wrapper.find('a').simulate('click');
    expect(theHandler.mock.calls).toHaveLength(1);
  });
});
