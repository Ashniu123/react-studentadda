const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../config/jwtSecretKey');
const User = require('../models/user');

module.exports = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err || !decoded) {
        //decoded undefined means key is wrong
        console.error(err);
        // res.status(500).json(responseMessage.FAIL.INVALID_TOKEN);
        res.locals.err = responseMessage.FAIL.INVALID_TOKEN;
        next();
      } else {
        // Get user data and save it for use in other routes
        User.findOne({ _id: decoded.data }, (err, data) => {
          if (data) {
            res.locals.user = data;
          } else {
            // res.status(400).json(responseMessage.FAIL.USER.NOT_EXISTS);
            res.locals.err = responseMessage.FAIL.USER.NOT_EXISTS;
          }
          next();
        });
      }
    });
  } else {
    // if there is no token return error
    // res.status(401).json(responseMessage.FAIL.INVALID_TOKEN);
    res.locals.err = responseMessage.FAIL.INVALID_TOKEN;
    next();
  }
};
