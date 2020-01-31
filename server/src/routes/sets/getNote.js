const { Types } = require("mongoose");
const Sets = require("../../models/sets");

module.exports = async ({ params }, res) => {
  const { id, pageno } = params;
  if (id && id.length && pageno >= 0) {
    try {
      const notes = await Sets.aggregate([
        {
          $match: { _id: Types.ObjectId(id) },
        },
        {
          $project: {
            _id: 0,
            note: { $arrayElemAt: ["$notes", parseInt(pageno)] },
          },
        },
      ]);
      const messageToSend = responseMessage.SUCCESS.SUCCESS;
      messageToSend.payload = { note: notes[0].note };
      res.json(messageToSend);
    } catch (e) {
      console.error(`getNote: ${e}`);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
