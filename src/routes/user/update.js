module.exports = async ({ body }, res) => {
  if (body.avatar || (body.name && body.name.firstName && body.name.lastName)) {
    try {
      const doc = await User.findById({ _id: res.locals.user._id });
      if (body.avatar) {
        doc.avatar = body.avatar;
      }
      if (body.name.firstName) {
        doc.name.firstName = body.name.firstName;
      }
      if (body.name.lastName) {
        doc.name.lastName = body.name.lastName;
      }
      await doc.save();
      res.json(responseMessage.SUCCESS.SUCCESS);
    } catch (e) {
      console.error(err);
      resolve(responseMessage.FAIL.SOMETHING_WRONG);
    }
  } else {
    res.json(responseMessage.FAIL.INC_INV_DATA);
  }
};
