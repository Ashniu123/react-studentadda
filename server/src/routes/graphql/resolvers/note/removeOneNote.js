const Sets = require('../../../../models/sets');
const { removeFile } = require('../../../../utils/fileHelper');

module.exports = ({ args, context }) => {
  const { res } = context;
  const { _id, noteId } = args;
  return new Promise((resolve, reject) => {
    Sets.findById(_id)
      .exec()
      .then((setData) => {
        if (setData) {
          removeFile(setData.notes[noteId].objectref, res.locals.user._id)
            .then((relativePath) => {
              console.log(relativePath);
              const newNotes = setData.notes.filter((note) => note._id !== noteId);
              setData.notes = newNotes.map((note, index) => {
                note.pageno = index + 1;
                return note;
              });
              setData
                .save()
                .exec()
                .then((results) => {
                  console.log(results);
                  resolve(responseMessage.SUCCESS.SUCCESS);
                })
                .catch((err) => {
                  console.error(err);
                  resolve(responseMessage.FAIL.SOMETHING_WRONG);
                });
            })
            .catch((err) => {
              console.error(err);
              resolve(responseMessage.FAIL.SOMETHING_WRONG);
            });
        } else {
          resolve(responseMessage.FAIL.INC_INV_DATA);
        }
      })
      .catch((setErr) => {
        resolve(responseMessage.FAIL.SOMETHING_WRONG);
      });
  });
};
