export default {
  serviceA: {
    reducer: 'typeAReducer',
    types: {
      typeA: 'typeA',
      typeB: 'typeB',
    },
    actions: {
      typeA: 'typeAActionFunc',
      typeB: 'typeBActionFunc',
    },
    forms: {
      typeA: ['fieldA', 'fieldB'],
      typeB: ['fieldC', 'fieldD'],
    },
  },
  serviceB: {
    reducer: 'typeBReducer',
    types: {
      typeD: 'typeD',
      typeE: 'typeE',
      typeF: 'typeF',
    },
    actions: {
      typeD: 'typeDActionFunc',
      typeE: 'typeEActionFunc',
      typeF: 'typeFActionFunc',
    },
    forms: {
      typeD: ['fieldG', 'fieldH'],
      typeE: ['fieldI', 'fieldJ'],
      typeF: ['fieldK', 'fieldL'],
    },
  },
};
