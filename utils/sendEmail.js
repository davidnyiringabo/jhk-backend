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
      html: `
        <div style="font-family: poppins,'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333; text-align: center;">JHK Hospital Account Verification</h2>
          <p style="color: #555; text-align: center;">This is your verification code:</p>
          <div style="text-align: center; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #007BFF; font-size: 36px; margin: 0;">${code}</h1>
          </div>
          <p style="color: #555; text-align: center; margin-top: 20px;">Use this code to verify your account at JHK Hospital.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = sendEmail;
