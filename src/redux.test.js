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

test('generates a list of all types included in the services object', () => {
  const allTypes = redux.allActionsForService(testServices);
  expect(allTypes).toHaveLength(6);
  expect(allTypes[0]).toEqual('serviceA:typeA');
});

test('will add an option for each service type to the action select', () => {
  const wrapper = shallow(components.createActionSelect(testServices));
  expect(wrapper.find('option')).toHaveLength(6);
});
