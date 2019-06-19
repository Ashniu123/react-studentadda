// const notifier = require('node-notifier');
const notificationsHelper = require('../utils/notificationsHelper');

module.exports = (req, res, next) => {
  res.sseSetup = () => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    // notificationsHelper.addSubscriber(res.locals.user._id);
  };

  const handshakeInterval = setInterval(() => {
    res.write(': sse-handshake');
  }, 3000);

  const closeNotificationListener = () => {
    console.log(res.locals.user._id, 'stopped listening for notifications!');
    // notificationsHelper.removeSubscriber(res.locals.user._id);
    delete activeNotificationSubscribersResponse[res.locals.user._id];
    clearInterval(handshakeInterval);
  };

  res.on('finish', () => closeNotificationListener());
  res.on('close', () => closeNotificationListener());

  res.sseSend = (json) => {
    res.write('\n');
    res.write(`retry: 3000\n`);
    res.write(`data: ${json}\n\n`);
    // notifier.notify(JSON.stringify(data));
    notificationsHelper.removeNotificationFromQueue(res.locals.user._id.toString());
  };

  next();
};
