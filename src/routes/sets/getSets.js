const User = require("../../models/user");

module.exports = async (_req, res) => {
  try {
    const data = await User.aggregate([
      {
        $match: { _id: res.locals.user._id },
      },
      {
        $lookup: {
          from: "sets",
          localField: "sets",
          foreignField: "_id",
          as: "sets",
        },
      },
      {
        $project: {
          sets: { createdAt: 0, updatedAt: 0, __v: 0, notes: 0 },
          _id: 0,
          events: 0,
          avatar: 0,
          email: 0,
          password: 0,
          name: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ]);
    console.log(`getSets: data: ${JSON.stringify(data)}`);
    const messageToSend = responseMessage.SUCCESS.SUCCESS;
    messageToSend.payload = data[0];
    res.json(messageToSend);
  } catch (e) {
    console.error(`getSets: ${e}`);
    res.json(responseMessage.FAIL.SOMETHING_WRONG);
  }
};
