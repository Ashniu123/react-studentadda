const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const User = require('../../../models/user');

const customOptions = {};
const userTC = composeWithMongoose(User, customOptions).removeField([
  'password',
  'createdAt',
  'updatedAt',
  '_id'
]);

userTC.addResolver({
  kind: 'query',
  name: 'loginQuery',
  args: {
    email: 'String!',
    password: 'String!'
  },
  type: 'Json',
  resolve: require('../resolvers/user/loginQuery')
});

userTC.addResolver({
  kind: 'mutation',
  name: 'registerMutation',
  args: {
    email: 'String!',
    password: 'String!',
    name: `input name { firstName: String!, lastName: String! }`
  },
  type: 'Json',
  resolve: require('../resolvers/user/registerMutation')
});

userTC.addResolver({
  kind: 'mutation',
  name: 'updateMutation',
  args: {
    record: userTC
      .getResolver('updateOne')
      .getArgTC('record')
      .removeOtherFields(['name', 'avatar'])
  },
  type: 'Json',
  resolve: require('../resolvers/user/updateMutation')
});

schemaComposer.rootQuery().addFields({
  userOne: userTC.getResolver('findOne').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next();
    }
    return responseMessage.FAIL.UNAUTHORISED;
  }),
  login: userTC.getResolver('loginQuery')
});

schemaComposer.rootMutation().addFields({
  register: userTC.getResolver('registerMutation'),
  updateUser: userTC.getResolver('updateMutation').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next();
    }
    return responseMessage.FAIL.UNAUTHORISED;
  })
});

module.exports = schemaComposer.buildSchema();
