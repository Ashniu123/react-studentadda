const { validate } = require("../../utils/passwordGenerator");
const tokenGenerator = require("../../utils/tokenGenerator");
const User = require("../../models/user");

module.exports = async ({ body }, res) => {
  if (body.email && body.email.length && body.password && body.password.length) {
    try {
      const data = await User.findOne({ email: body.email });
      console.log(`login: data: ${JSON.stringify(data)}`);
      if (!data) {
        res.json(responseMessage.FAIL.USER.NOT_EXISTS);
      } else if (validate(data.password, body.password)) {
        const messageToSend = responseMessage.SUCCESS.LOGIN;
        messageToSend.payload = { name: data.name, token: tokenGenerator(data._id.toString()) };
        console.log(`login: messageToSend: ${JSON.stringify(messageToSend)}`);
        res.json(messageToSend);
      } else {
        res.json(responseMessage.FAIL.INVALID_CRED);
      }
    } catch (e) {
      console.error(err);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
