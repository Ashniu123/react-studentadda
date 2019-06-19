/* eslint-disable */
module.exports = exports = {};

exports.addNotificationToQueue = (id, message) => {
  console.log('notification added');
  message.timestamp = Date.now();
  redisClient.RPUSH(id, JSON.stringify(message), (err, reply) => {
    //add to end of queue
    if (err) {
      console.error(err);
    } else {
      console.log('[ADD] REPLY:', reply);
      return reply;
    }
  });
};

exports.getNotificationFromQueue = (id) => {
  return new Promise((resolve, reject) => {
    redisClient.LINDEX(id, 0, (err, reply) => {
      err ? reject(err) : resolve(reply);
    });
  });
};

exports.removeNotificationFromQueue = (id) => {
  redisClient.LPOP(id, (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log('[REMOVE] REPLY:', reply);
      return reply;
    }
  });
  console.log('remove!');
};
