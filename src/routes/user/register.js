const User = require("../../models/user");
const { hash } = require("../../utils/passwordGenerator");

module.exports = async ({ body }, res) => {
  if (
    body.email &&
    body.email.length &&
    body.password &&
    body.password.length &&
    body.name &&
    body.name.firstName &&
    body.name.firstName.length &&
    body.name.lastName &&
    body.name.lastName.length
  ) {
    try {
      const data = await User.findOne({ email: body.email }, { _id: 1 });
      console.log(`register: data: ${JSON.stringify(data)}`);
      if (!data) {
        const newUser = await User.create({
          email: body.email,
          password: hash(body.password),
          name: body.name,
          events: [],
          sets: [],
        });
        console.log(`register: newUser: ${JSON.stringify(newUser)}`);
        res.json(responseMessage.SUCCESS.REGISTER);
      } else {
        res.json(responseMessage.FAIL.USER.EXISTS);
      }
    } catch (err) {
      console.error(err);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
