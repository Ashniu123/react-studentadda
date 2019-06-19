const User = require('../../../../models/user');
const passwordValidator = require('../../../../utils/passwordGenerator').validate;
const tokenGenerator = require('../../../../utils/tokenGenerator');

module.exports = ({ args, context }) =>
  new Promise((resolve, reject) => {
    if (args.email && args.email.length > 0 && args.password && args.password.length > 0) {
      User.findOne({ email: args.email }, { _id: 1, password: 1, name: 1 }, (err, data) => {
        if (err) {
          console.error(err);
          resolve(responseMessage.FAIL.SOMETHING_WRONG);
        } else if (data) {
          if (passwordValidator(data.password, args.password)) {
            console.log(data);
            const messageToSend = responseMessage.SUCCESS.LOGIN;
            messageToSend.token = tokenGenerator(data._id.toString());
            messageToSend.name = data.name;
            resolve(messageToSend);
          } else {
            resolve(responseMessage.FAIL.INVALID_CRED);
          }
        } else {
          resolve(responseMessage.FAIL.INVALID_CRED);
        }
      });
    } else {
      resolve(responseMessage.FAIL.INC_INV_DATA);
    }
  });
