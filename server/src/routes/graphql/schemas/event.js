const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Event = require('../../../models/event');

const customOptions = {};
const eventTC = composeWithMongoose(Event, customOptions);

eventTC.addResolver({
  kind: 'query',
  name: 'fetchAllQuery',
  description: 'Fetch all events of the user by using findById and populate',
  args: {},
  type: [eventTC],
  resolve: require('../resolvers/event/fetchAllQuery')
});

eventTC.addResolver({
  kind: 'mutation',
  name: 'removeOneMutation',
  description:
    'Remove one document: 1) Remove with hooks via deleteOne. 2) Return Success / Failure',
  args: { _id: 'ID!' },
  type: 'Json',
  resolve: require('../resolvers/event/removeOneMutation')
});

eventTC.addResolver({
  kind: 'mutation',
  name: 'createOneMutation',
  description:
    'Create one document with mongoose defaults, setters, hooks and validation. Return Id',
  args: {
    record: eventTC
      .getResolver('createOne')
      .getArgTC('record')
      .removeField(['updatedAt', 'createdAt'])
  },
  type: 'Json',
  resolve: require('../resolvers/event/createOneMutation')
});

schemaComposer.rootQuery().addFields({
  eventAll: eventTC.getResolver('fetchAllQuery').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next(rp);
    }
    return responseMessage.FAIL.UNAUTHORISED;
  })
});

schemaComposer.rootMutation().addFields({
  createOneEvent: eventTC.getResolver('createOneMutation').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next(rp);
    }
    return responseMessage.FAIL.UNAUTHORISED;
  }),
  removeOneEvent: eventTC.getResolver('removeOneMutation').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next(rp);
    }
    return responseMessage.FAIL.UNAUTHORISED;
  }),
  updateOneEvent: eventTC
    .getResolver('updateOne')
    .removeArg(['skip', 'sort'])
    .setType('Json')
    .wrapResolve((next) => (rp) => {
      if (rp.context.res.locals.user) {
        return next(rp)
          .then((result) => {
            console.log(result);
            const messageToSend = responseMessage.SUCCESS.SUCCESS;
            messageToSend.recordId = result.recordId;
            return messageToSend;
          })
          .catch((err) => responseMessage.FAIL.SOMETHING_WRONG);
      }
      return responseMessage.FAIL.UNAUTHORISED;
    })
});

module.exports = schemaComposer.buildSchema();
