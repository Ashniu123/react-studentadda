const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'f41049cf6c5448',
    pass: '47e457de79fdc3'
  }
});

const mailData = (sender, subject, text, html) => {
  return {
    from: '"Studentadda Staff" <noreply@studentadda.com>',
    to: sender,
    subject,
    html,
    text
  };
};

const sendMail = (mailData) => {
  console.log('[NODEMAILER] ', mailData);
  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Message sent:', info.messageId);
      // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  });
};

module.exports = {
  sendMail: sendMail,
  mailData: mailData
};
