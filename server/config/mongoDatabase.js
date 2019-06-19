const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    process.env.MONGO_URI || 'mongodb://localhost/studentadda',
    {
      useNewUrlParser: true,
      keepAlive: true,
      reconnectTries: Number.MAX_SAFE_INTEGER,
      reconnectInterval: 1000
    }
  );

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Connection Error:'));
  db.once('open', () => {
    console.log('Connected to Database!');
  });
};
