const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../config/jwtSecretKey');

module.exports = (data) => {
  const start = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const jwtOptions = { expiresIn: end.getTime() - start.getTime() };
  return jwt.sign({ data }, jwtSecretKey, jwtOptions); // sign and return secretKey
};
