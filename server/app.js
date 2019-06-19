const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

require('./config/mongoDatabase')(); // Connection to Database

// global configs
global.notificationMessage = require('./config/notification');
global.responseMessage = require('./config/responseMessage.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('morgan')('dev'));
app.use(require('cors')());

// app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'client' , 'build', 'index.html'));
});

app.use('/api', require('./src/routes/routes'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}!`);
});

module.exports = app;