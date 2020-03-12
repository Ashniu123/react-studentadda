const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = async ({ params }, res) => {
  const { id } = params;
  if (id && id.length > 0) {
    try {
      await Event.deleteOne({ _id: id });
      await User.updateOne({ _id: res.locals.user._id }, { $pull: { events: id } });
      res.json(responseMessage.SUCCESS.SUCCESS);
    } catch (e) {
      console.error(e);
      console.error(`removeEvent: ${e}`);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
