const Sets = require("../../models/sets");

module.exports = async ({ params }, res) => {
  console.log(params);
  const { id } = params;
  let { pageno } = params;
  pageno = parseInt(pageno, 10);
  if (pageno >= 0 && id) {
    try {
      await Sets.updateOne({ _id: id }, { $unset: { [`notes.${pageno}`]: 1 } });
      await Sets.updateOne({ _id: id }, { $pull: { notes: null } });
      res.json(responseMessage.SUCCESS.SUCCESS);
    } catch (e) {
      console.error(`removeNote: ${e}`);
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
