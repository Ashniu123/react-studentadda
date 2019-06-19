const crypto = require('crypto');

const SALT_LENGTH = 64;

function createHash(password) {
  const salt = generateSalt(SALT_LENGTH);
  const hash = md5(password + salt);
  return salt + hash;
}

function validateHash(hash, password) {
  const salt = hash.substr(0, SALT_LENGTH);
  const validHash = salt + md5(password + salt);
  return hash === validHash;
}

function generateSalt(len) {
  const set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  let salt = '';
  for (let i = 0; i < len; i++) {
    let p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
}

function md5(string) {
  return crypto
    .createHash('md5')
    .update(string)
    .digest('hex');
}

module.exports = {
  hash: createHash,
  validate: validateHash
};
