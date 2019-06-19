// const Sets = require('../../../../models/sets');
const Users = require('../../../../models/user');

module.exports = ({ context }) => {
  const { res } = context;
  return new Promise((resolve, reject) => {
    Users.findById(res.locals.user._id)
      .populate('sets')
      .exec()
      .then((docs) => {
        console.log(docs.sets);
        resolve(docs.sets);
      })
      .catch((err) => {
        console.log(err);
        resolve(responseMessage.FAIL.SOMETHING_WRONG);
      });
  });
};
