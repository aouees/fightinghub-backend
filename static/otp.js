const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
   user: '',
    pass: '',

  },
});
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const sendOTP = (email, otp) => {
  const mailOptions = {
    from: '',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for authentication is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
module.exports = { sendOTP, generateOTP }