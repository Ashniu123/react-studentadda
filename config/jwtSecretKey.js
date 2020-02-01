const fs = require("fs");
const path = require("path");

const pathToSecret = path.join(__dirname, "secret.key");
const generatedRandomString = () => fs.readFileSync(pathToSecret);

module.exports = generatedRandomString;
