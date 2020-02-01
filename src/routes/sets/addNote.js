const Sets = require("../../models/sets");

module.exports = async ({ body, params }, res) => {
  console.log(body.pageno, params);
  if (body.pageno >= 0 && params.id && body.note) {
    try {
      await Sets.updateOne({ _id: params.id }, { $push: { notes: body.note } });
      const messageToSend = responseMessage.SUCCESS.SUCCESS;
      res.json(messageToSend);
    } catch (e) {
      console.error(`addNote: ${e}`);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
