const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    port: 465,
    secure: true,
  });
};

const sendEmail = async (email, code) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_NAME,
      to: email,
      subject: "JHK Hospital Account Verification Code",
      html: `<h1>JHK Hospital Account verification code. </br> <p>This is your verification code ${code}</p></h1>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;
