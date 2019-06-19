const mongoose = require('mongoose');
const Event = require('../../../../models/event');
const User = require('../../../../models/user');

module.exports = ({ args, context }) => {
  const { res } = context;
  return new Promise((resolve, reject) => {
    if (args._id) {
      Event.deleteOne({ _id: args._id }, (err, data) => {
        if (err) {
          console.error(err);
          resolve(responseMessage.FAIL.SOMETHING_WRONG);
        } else {
          User.updateOne(
            { _id: res.locals.user._id },
            { $pull: { events: args._id } },
            (err, result) => {
              if (err) {
                console.error(err);
                resolve(responseMessage.FAIL.SOMETHING_WRONG);
              } else {
                resolve(responseMessage.SUCCESS.SUCCESS);
              }
            }
          );
        }
      });
    } else {
      resolve(responseMessage.FAIL.INC_INV_DATA);
    }
  });
};
