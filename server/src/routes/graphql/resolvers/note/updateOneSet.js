const Sets = require('../../../../models/sets');
const Users = require('../../../../models/user');

module.exports = ({ context, args }) => {
  const { res } = context;
  const { title, description, color } = args.record;
  const { id } = args;
  return new Promise((resolve, reject) => {
    if (
      title &&
      title.length > 0 &&
      description &&
      description.length >= 0 &&
      color &&
      color.length > 0 &&
      id &&
      id.length > 0
    ) {
      Users.findOne({ _id: res.locals.user._id, sets: id })
        .exec()
        .then((userData) => {
          console.log(userData);
          if (userData) {
            Sets.updateOne({ _id: id }, { $set: { title, description, color } })
              .exec()
              .then((results) => {
                console.log(results);
                if (results.nModified) {
                  resolve(responseMessage.SUCCESS.SUCCESS);
                } else {
                  resolve(responseMessage.FAIL.INC_INV_DATA);
                }
              })
              .catch((err) => {
                console.log(err);
                resolve(responseMessage.FAIL.SOMETHING_WRONG);
              });
          } else {
            resolve(responseMessage.FAIL.UNAUTHORISED);
          }
        })
        .catch((err) => {
          console.log(err);
          resolve(responseMessage.FAIL.SOMETHING_WRONG);
        });
    }
  });
};
