const User = require('../../../../models/user');
const Event = require('../../../../models/event');

module.exports = ({ args, context }) => {
  const { res } = context;
  const { title, start, end, description, dow } = args.record;
  return new Promise((resolve, reject) => {
    if (title && title.length > 0 && start && end && dow && description) {
      const newEvent = new Event({
        title,
        start,
        end,
        dow: dow || [],
        description: description || ''
      });
      newEvent.save((err, doc) => {
        if (err) {
          console.error(err);
          resolve(responseMessage.FAIL.SOMETHING_WRONG);
        } else {
          User.updateOne(
            { _id: res.locals.user._id },
            { $push: { events: doc._id } },
            (err, result) => {
              if (err) {
                console.error(err);
                resolve(responseMessage.FAIL.SOMETHING_WRONG);
              } else if (result.nModified > 0) {
                const messageToSend = responseMessage.SUCCESS.SUCCESS;
                messageToSend._id = doc._id.toString();
                resolve(messageToSend);
              } else {
                resolve(responseMessage.FAIL.SOMETHING_WRONG);
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
