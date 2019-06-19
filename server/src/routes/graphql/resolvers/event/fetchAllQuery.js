const User = require('../../../../models/user');

module.exports = ({ args, context }) => {
  const { res } = context;
  return new Promise((resolve, reject) => {
    User.findById(res.locals.user._id)
      .populate('events')
      .select({ events: 1, _id: 0 })
      .exec((err, data) => {
        if (err) {
          console.error(err);
          resolve(responseMessage.FAIL.SOMETHING_WRONG);
        } else {
          console.log(data);
          resolve(data.events);
        }
      });
  });
};
