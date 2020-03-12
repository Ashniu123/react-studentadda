const Sets = require("../../models/sets");
const User = require("../../models/user");

module.exports = async ({ body }, res) => {
  const { title, description, color } = body;
  if (title && title.length > 0 && description.length >= 0 && color) {
    try {
      const newSet = await new Sets({
        title,
        description,
        color,
      }).save();
      await User.updateOne({ _id: res.locals.user._id }, { $push: { sets: newSet._id } });
      const messageToSend = responseMessage.SUCCESS.SUCCESS;
      messageToSend.payload = { id: newSet._id.toString() };
      res.json(messageToSend);
    } catch (e) {
      console.error(`addSet: ${e}`);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
