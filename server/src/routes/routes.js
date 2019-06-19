const express = require('express');

const router = express.Router();
const graphQLHTTP = require('express-graphql');

const verifyMiddleware = require('../utils/verifyMiddleware');
const userSchema = require('./graphql/schemas/user');
const eventSchema = require('./graphql/schemas/event');
const noteSchema = require('./graphql/schemas/note');

router.all('/', (req, res) => {
  res.json(responseMessage.SUCCESS.IT_WORKS);
});

router.post(
  '/user',
  verifyMiddleware,
  graphQLHTTP((req, res) => ({
    schema: userSchema,
    context: { req, res },
    graphiql: process.env.NODE_ENV !== 'production'
  }))
);

router.post(
  '/event',
  verifyMiddleware,
  graphQLHTTP((req, res) => ({
    schema: eventSchema,
    context: { req, res },
    graphiql: process.env.NODE_ENV !== 'production'
  }))
);

router.all(
  '/note',
  verifyMiddleware,
  graphQLHTTP((req, res) => ({
    schema: noteSchema,
    context: { req, res },
    graphiql: process.env.NODE_ENV !== 'production'
  }))
);

module.exports = router;
