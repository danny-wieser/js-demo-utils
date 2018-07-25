import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from './redux';
import * as components from './components';
// TODO: add jest config file

configure({ adapter: new Adapter() });

const testServices = {
  serviceA: {
    types: {
      typeA: 'typeA',
      typeB: 'typeB',
      typeC: 'typeC',
    },
  },
  serviceB: {
    types: {
      typeD: 'typeD',
      typeE: 'typeE',
      typeF: 'typeF',
    },
  },
};

test('will add an option for each service type to the action select', () => {
  const wrapper = shallow(components.createActionSelect(testServices));
  expect(wrapper.find('option')).toHaveLength(6);
});
