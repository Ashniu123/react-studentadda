const Sets = require('../../../../models/sets');
const Users = require('../../../../models/user');

module.exports = ({ context, args }) => {
  const { res } = context;
  const { title, description, color } = args.record;
  return new Promise((resolve, reject) => {
    if (title && title.length > 0 && description.length >= 0) {
      const newSet = new Sets({
        title,
        description,
        color
      });
      newSet
        .save()
        .then((doc) => {
          console.log(doc);
          Users.updateOne({ _id: res.locals.user._id }, { $push: { sets: doc._id } })
            .exec()
            .then((result) => {
              if (result.nModified > 0) {
                const messageToSend = responseMessage.SUCCESS.SUCCESS;
                messageToSend.setId = doc._id;
                resolve(messageToSend);
              } else {
                resolve(responseMessage.FAIL.SOMETHING_WRONG);
              }
            })
            .catch((err) => {
              console.log(err);
              resolve(responseMessage.FAIL.SOMETHING_WRONG);
            });
        })
        .catch((err) => {
          console.log(err);
          resolve(responseMessage.FAIL.SOMETHING_WRONG);
        });
    } else {
      console.log(responseMessage.FAIL.INC_INV_DATA);
      resolve(responseMessage.FAIL.INC_INV_DATA);
    }
  });
};
