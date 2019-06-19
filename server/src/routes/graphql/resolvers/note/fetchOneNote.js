const Sets = require('../../../../models/sets');

module.exports = ({ context, args }) => {
  const { res } = context;
  const { _id, pageno } = args;
  return new Promise((resolve, reject) => {
    Sets.findOne({ _id, 'notes.pageno': pageno }, { notes })
      .exec()
      .then((docs) => {
        console.log(docs);
        resolve(docs.notes[0].objectref);
      })
      .catch((err) => {
        resolve(responseMessage.FAIL.SOMETHING_WRONG);
      });
  });
};
