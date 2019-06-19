const { schemaComposer, GraphQLJSON } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Sets = require('../../../models/sets');

const customOptions = {};
const noteTC = composeWithMongoose(Sets, customOptions);

const noteTCwithNotesData = noteTC.addFields({ notes: GraphQLJSON });

noteTC.addResolver({
  kind: 'query',
  name: 'fetchAllSets',
  description: 'Fetch all sets (no data) of the user. Return array of jsons',
  args: {},
  type: [noteTCwithNotesData],
  resolve: require('../resolvers/note/fetchAllSets')
});

noteTC.addResolver({
  kind: 'query',
  name: 'fetchOneNote',
  description: 'Fetch next note of the set. Return page objectref',
  args: {
    _id: 'ID!',
    pageno: 'Int!'
  },
  type: 'String',
  resolve: require('../resolvers/note/fetchOneNote')
});

noteTC.addResolver({
  kind: 'mutation',
  name: 'createOneSet',
  description: 'Create one set. Return Id',
  args: {
    record: noteTC
      .getResolver('createOne')
      .getArgTC('record')
      .removeField(['updatedAt', 'createdAt', 'notes'])
  },
  type: 'Json',
  resolve: require('../resolvers/note/createOneSet')
});

noteTC.addResolver({
  kind: 'mutation',
  name: 'updateOneSet',
  description: 'Update one set. Return new set',
  args: {
    record: noteTC
      .getResolver('updateOne')
      .getArgTC('record')
      .removeField(['updatedAt', 'createdAt', 'notes']),
    id: 'ID!'
  },
  type: 'Json',
  resolve: require('../resolvers/note/updateOneSet')
});

noteTC.addResolver({
  kind: 'mutation',
  name: 'removeOneSet',
  description: 'Remove one set. Return success/failure',
  args: {
    _id: 'ID!'
  },
  type: 'Json',
  resolve: require('../resolvers/note/removeOneSet')
});

noteTC.addResolver({
  kind: 'mutation',
  name: 'addOneNote',
  description: 'Add one note. Return Id',
  args: {
    _id: 'ID!',
    file: 'String!',
    filename: 'String!'
  },
  type: 'Json',
  resolve: require('../resolvers/note/addOneNote')
});

noteTC.addResolver({
  kind: 'mutation',
  name: 'removeOneNote',
  description: 'Remove one note. Return success/failure',
  args: {
    _id: 'ID!'
  },
  type: 'Json',
  resolve: require('../resolvers/note/removeOneNote')
});

schemaComposer.rootQuery().addFields({
  setsAll: noteTC.getResolver('fetchAllSets').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next(rp);
    }
    return responseMessage.FAIL.UNAUTHORISED;
  }),
  notesOne: noteTC.getResolver('fetchOneNote').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next(rp);
    }
    return responseMessage.FAIL.UNAUTHORISED;
  })
});

schemaComposer.rootMutation().addFields({
  createOneSet: noteTC.getResolver('createOneSet').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next(rp);
    }
    return responseMessage.FAIL.UNAUTHORISED;
  }),
  updateOneSet: noteTC.getResolver('updateOneSet').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next(rp);
    }
    return responseMessage.FAIL.UNAUTHORISED;
  }),
  removeOneSet: noteTC.getResolver('removeOneSet').wrapResolve((next) => (rp) => {
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
  }),
  addNote: noteTC.getResolver('addOneNote').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next(rp);
    }
    return responseMessage.FAIL.UNAUTHORISED;
  }),
  removeNote: noteTC.getResolver('removeOneNote').wrapResolve((next) => (rp) => {
    if (rp.context.res.locals.user) {
      return next(rp);
    }
    return responseMessage.FAIL.UNAUTHORISED;
  })
});

module.exports = schemaComposer.buildSchema();
