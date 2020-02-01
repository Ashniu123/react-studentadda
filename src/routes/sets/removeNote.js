const Sets = require("../../models/sets");

module.exports = async ({ params }, res) => {
  console.log(params);
  const { pageno, id } = params;
  if (pageno >= 0 && id) {
    try {
      await Sets.updateOne({ _id: id }, { $unset: { [`sets.${pageno}`]: 1 } });
      await Sets.updateOne({ _id: id }, { $pull: { sets: null } });
      res.json(responseMessage.SUCCESS.SUCCESS);
    } catch (e) {
      res.json(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
