const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("./config/mongoDatabase")(); // Connection to Database

global.responseMessage = require("./config/responseMessage.json");

const app = express();

app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(require("morgan")("common"));
app.use(require("cors")());

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api", require("./src/routes"));

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

module.exports = app;
