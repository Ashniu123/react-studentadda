const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = async ({ body }, res) => {
  const { title, start, end, dow, description } = body;
  if (
    title &&
    title.length > 0 &&
    start &&
    start.length > 0 &&
    end &&
    end.length > 0 &&
    dow.length >= 0 &&
    description.length >= 0
  ) {
    try {
      const newEvent = await new Event({
        title,
        start,
        end,
        dow: dow || [],
        description: description || "",
      }).save();
      await User.updateOne(
        { _id: res.locals.user._id },
        { $push: { events: newEvent._id } },
      ).exec();
      const messageToSend = responseMessage.SUCCESS.SUCCESS;
      messageToSend.payload = { id: newEvent._id.toString() };
      res.json(messageToSend);
    } catch (e) {
      console.error(`addEvent: ${e}`);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
