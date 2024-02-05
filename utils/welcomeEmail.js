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

const sendWelcomeEmail = async (email, code) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_NAME,
      to: email,
      subject: "JHK Hospital Account Verification Code",
      html: `
      <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f9f9f9; border-radius: 15px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF; text-align: center; font-size: 32px; margin-bottom: 15px;">🌟 Welcome to JHK Hospital! 🌟</h2>
      <p style="color: #666; text-align: center; font-size: 18px; line-height: 1.6;">We are delighted to have you on board! You've been successfully registered in our application, and we're here to support you on your journey to wellness.</p>
      <div style="text-align: center; padding: 25px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #007BFF; font-size: 40px; margin: 0;">Wishing You a Speedy Recovery! 🌈</h1>
      </div>
      <p style="color: #666; text-align: center; margin-top: 20px; font-size: 18px; line-height: 1.6;">As you embark on your journey with JHK Hospital, our team is here to provide exceptional care. If you ever need assistance or have questions, feel free to reach out.</p>
      <p style="color: #666; text-align: center; margin-top: 20px; font-size: 18px; line-height: 1.6;">Your health is our priority!</p>
      <p style="color: #666; text-align: center; margin-top: 20px; font-size: 18px; line-height: 1.6;">Best Wishes for Your Health and Well-being,<br/>The JHK Hospital Team 🌟</p>
        </div>
  
      `,
    };

    const info = await transporter.sendWelcomeEmail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = sendWelcomeEmail;
