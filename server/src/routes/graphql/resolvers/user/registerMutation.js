const User = require('../../../../models/user');
const passwordGenerator = require('../../../../utils/passwordGenerator').hash;

module.exports = ({ args, context }) => {
  const { req, res } = context;
  return new Promise((resolve, reject) => {
    if (
      args.email &&
      args.email.length > 0 &&
      args.password &&
      args.password.length > 0 &&
      args.name &&
      args.name.firstName &&
      args.name.firstName.length > 0 &&
      args.name.lastName &&
      args.name.lastName.length > 0
    ) {
      const password = passwordGenerator(args.password);
      const userData = new User({
        name: args.name,
        password,
        email: args.email
      });
      userData.save((err, result) => {
        if (err) {
          console.error(err);
          resolve(responseMessage.FAIL.USER.EXISTS);
        } else {
          resolve(responseMessage.SUCCESS.SUCCESS);
        }
      });
    } else {
      resolve(responseMessage.FAIL.INC_INV_DATA);
    }
  });
};
