const User = require('../../../../models/user');

module.exports = ({ args, context }) => {
  const { req, res } = context;
  const query = { _id: args._id ? args._id : res.locals.user._id };
  return new Promise((resolve, reject) => {
    User.findOne(query, (err, data) => {
      if (err) {
        console.error(err);
        resolve(err);
      } else {
        console.log(data);
        resolve(data);
      }
    });
  });
};
