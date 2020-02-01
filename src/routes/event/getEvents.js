const User = require("../../models/user");

module.exports = async (_req, res) => {
  try {
    const data = await User.aggregate([
      {
        $match: { _id: res.locals.user._id },
      },
      {
        $lookup: {
          from: "events",
          localField: "events",
          foreignField: "_id",
          as: "events",
        },
      },
      {
        $project: { events: 1, _id: 0 },
      },
    ]);
    const messageToSend = responseMessage.SUCCESS.SUCCESS;
    messageToSend.payload = data[0];
    res.json(messageToSend);
  } catch (e) {
    console.error(`getEvents: ${e}`);
    res.json(responseMessage.FAIL.SOMETHING_WRONG);
  }
};
