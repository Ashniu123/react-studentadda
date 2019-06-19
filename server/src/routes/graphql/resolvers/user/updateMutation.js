const User = require('../../../../models/user');
const passwordGenerator = require('../../../../utils/passwordGenerator').hash;

module.exports = ({ args, context }) => {
  const { req, res } = context;
  return new Promise((resolve, reject) => {
    User.findById({ _id: res.locals.user._id }, (err, doc) => {
      if (err) {
        console.error(err);
        resolve(responseMessage.FAIL.SOMETHING_WRONG);
      } else {
        if (args.record.avatar) {
          doc.avatar = args.record.avatar;
        }
        if (args.record.name.firstName) {
          doc.name.firstName = args.record.name.firstName;
        }
        if (args.record.name.lastName) {
          doc.name.lastName = args.record.name.lastName;
        }
        doc.save((err, result) => {
          if (err) {
            console.error(err);
            resolve(responseMessage.FAIL.SOMETHING_WRONG);
          } else {
            resolve(responseMessage.SUCCESS.SUCCESS);
          }
        });
      }
    });
  });
};
