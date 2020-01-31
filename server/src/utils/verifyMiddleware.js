const jwt = require("jsonwebtoken");
const jwtSecretKey = require("../../config/jwtSecretKey");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecretKey());
      if (decoded) {
        const data = await User.findOne({ _id: decoded.data }, { _id: 1 });
        console.log(`verifyMiddleware: data: ${JSON.stringify(data)}`);
        res.locals.user = data;
        next();
      } else {
        res.json(responseMessage.FAIL.INVALID_TOKEN);
      }
    } catch (e) {
      console.error(`verifyMiddleware: ${e}`);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INVALID_TOKEN);
  }
};
