const Sets = require('../../../../models/sets');
const { addFile } = require('../../../../utils/fileHelper');

module.exports = ({ args, context }) => {
  const { res } = context;
  const { _id, file, filename } = args;
  return new Promise((resolve, reject) => {
    if (_id && _id.length > 0 && file && file.length > 0) {
      Sets.findById(_id, { notes: 1 })
        .exec()
        .then((notesData) => {
          if (notesData) {
            console.log(notesData);
            addFile(filename, file, res.locals.user._id)
              .then((objectref) => {
                console.log('objectref: ', objectref);
                const newNote = {
                  pageno: notesData.length + 1,
                  objectref
                };
                Sets.findByIdAndUpdate(_id, { $push: { notes: newNote } }, { new: true })
                  .exec()
                  .then((newSet) => {
                    const messageToSend = responseMessage.SUCCESS.SUCCESS;
                    messageToSend.pageno = newNote.pageno;
                    messageToSend.objectref = newNote.objectref;
                    messageToSend.noteId = newSet.notes.filter(
                      (note) => note.pageno === newNote.pageno
                    )._id;
                    resolve(messageToSend);
                  })
                  .catch((err) => {
                    resolve(responseMessage.FAIL.SOMETHING_WRONG);
                  });
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(responseMessage.FAIL.INC_INV_DATA);
          }
        })
        .catch((err) => {
          resolve(responseMessage.FAIL.SOMETHING_WRONG);
        });
    } else {
      resolve(responseMessage.FAIL.INC_INV_DATA);
    }
  });
};
