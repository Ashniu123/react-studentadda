const Sets = require('../../../../models/sets');
const Users = require('../../../../models/user');
const { removeFile } = require('../../../../utils/fileHelper');

module.exports = ({ args, context }) => {
  const { res } = context;
  const { _id } = args;
  return new Promise((resolve, reject) => {
    if (_id && _id.length > 0) {
      Sets.findByIdAndRemove(_id)
        .exec()
        .then((doc) => {
          console.log(doc);
          const deleteFilePromises = doc.notes.map((note) =>
            removeFile(note.objectref, res.locals.user._id)
          );
          Promise.all(deleteFilePromises)
            .then((success) => {
              Users.findByIdAndUpdate(res.locals.user._id, { $pull: { sets: _id } }, { new: true })
                .exec()
                .then((userDoc) => {
                  const messageToSend = responseMessage.SUCCESS.SUCCESS;
                  messageToSend.setId = doc._id;
                  resolve(responseMessage.SUCCESS.SUCCESS);
                })
                .catch((err) => {
                  resolve(responseMessage.FAIL.SOMETHING_WRONG);
                });
            })
            .catch((err) => {
              resolve(responseMessage.FAIL.SOMETHING_WRONG);
            });
        })
        .catch((err) => {
          resolve(responseMessage.FAIL.SOMETHING_WRONG);
        });
    } else {
      resolve(responseMessage.FAIL.INC_INV_DATA);
    }
  });
};
