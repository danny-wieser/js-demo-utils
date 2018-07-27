import { shallow } from 'enzyme';
import * as components from './components';
import testServices from './test-data';

test('will add an option for each service type to the action select', () => {
  const wrapper = shallow(components.createActionSelect(testServices));
  expect(wrapper.find('option')).toHaveLength(6);
});
