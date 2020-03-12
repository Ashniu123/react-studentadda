const Event = require("../../models/event");

module.exports = async ({ body }, res) => {
  const { id, title, start, end, dow, description } = body;
  console.log(body);
  if (
    id &&
    id.length > 0 &&
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
      await Event.updateOne({ _id: id }, { title, start, end, dow, description }).exec();
      res.json(responseMessage.SUCCESS.SUCCESS);
    } catch (e) {
      console.error(`updateEvent: ${e}`);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
