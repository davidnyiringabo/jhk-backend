const bcrypt = require("bcrypt");
const { client } = require("../config/database/connect");
const { v4: uuidv4 } = require("uuid");
const credsSchema = require("../utils/joiSchema.js");
const { generateOTP } = require("../utils/generateOTP.js");
const checkUserExistance = require("../utils/exists.js");
const generateToken = require("../utils/generateToken.js");
const sendEmail = require("../utils/sendEmail.js");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send({ message: "Provide all required credentials!" });
    return;
  }

  try {
    const query = "SELECT * FROM users where email = $1";
    const data = await client.query(query, [email]);

    if (data.rows.length === 0) {
      res
        .status(401)
        .send({ message: "Invalid email or password", status: 401 });
      return;
    }

    const user = data.rows[0];
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res
        .status(401)
        .send({ message: "Invalid email or password", status: 401 });
      return;
    }

    const token = generateToken(email, user.id);
    console.log(token);
    res
      .status(200)
      .send({ message: "Successfully logged in", data: { token: token } });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Provide all required credentials" });
    return;
  }

  try {
    if (await checkUserExistance(email)) {
      res.status(400).send({
        message: "User with the same email exists. Login to continue.",
      });
      return;
    }
    const userId = uuidv4();

    try {
      const validated = await credsSchema.validateAsync({
        email: email,
        password: password,
      });

      const encrypted = await bcrypt.hash(password, 15);
      const insertQuery =
        "INSERT INTO users (email, password, id) VALUES ($1, $2, $3)";
      const insertData = await client.query(insertQuery, [
        email,
        encrypted,
        userId,
      ]);
      console.log("User inserted:", insertData.rows[0]);
      const otp = await generateOTP(email, res);
      console.log(otp);
      if (sendEmail(email, otp)) {
        res.status(201).send({
          message:
            "Your Account has been successfully created! Navigate to your email to verify account!",
        });
      }
    } catch (err) {
      console.error(err.details);
      res.status(400).send({ message: err.details ?? [0].message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error!");
  }
};

exports.sendResetCode = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).send({ message: "Provide email" });
    return;
  }

  if (!checkUserExistance(email)) {
    res
      .status(400)
      .send({ message: "User With the same email doesn't exist!" });
  }

  try {
    const otpCode = await generateOTP("nyiringabodavid62@gmail.com", res);
    console.log(otpCode);

    if (sendEmail(email, otpCode)) {
      return res
        .status(200)
        .send({ message: `Verification Code sent successfully to ${email}!` });
    } else {
      return res.status(200).send({
        message: `An error occured while sending verification code to ${email}! Try again later.`,
      });
    }
  } catch (err) {
    console.log("Error occured when sending verification code", err);
    res.status(400).send({
      message:
        "An error occured while sending verification code! Try again later.",
    });
  }
};

exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    res.status(400).send({
      message: "Please send all the required credentials!",
      status: 400,
    });
  }

  try {
    if (!checkUserExistance(email)) {
      res.status(400).send({ message: "Invalid user email!", status: 400 });
    }

    const retrieveQuery = "SELECT * FROM otp WHERE email = $1";
    const retrievedCode = await client.query(retrieveQuery, [email]);
    if (retrievedCode.rows.length !== 0) {
      if (retrievedCode.rows[0].otp === code) {
        return res
          .status(200)
          .send({ message: "Verified account successfully!", status: 200 });
      }
      return res.status(400).send({ message: "Invalid Code", status: 400 });
    }

    res.status(400).send({ message: "Invalid user email!", status: 400 });
  } catch (err) {
    console.log("Error occured in verifying code!", err);
    res.status(400).send({
      message: "An error occured when verifying code! Try again later!",
    });
  }
};
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    res
      .status(400)
      .send({ message: "Please Provide all credentials!", status: 200 });
  }

  if (!checkUserExistance(email)) {
    res.status(400).send({ message: "User Not Found!", status: 200 });
  }

  try {
    const retrieveUserQuery = "SELECT * FROM users WHERE email = $1";
    const retrievedUser = await client.query(retrieveUserQuery, [email]);

    if (retrievedUser.rows.length !== 0) {
      const newEncryptedPassword = await bcrypt.hash(newPassword, 15);

      // Fix the table name in the UPDATE query and use different placeholders for email and password
      const updatePasswordQuery =
        "UPDATE users SET password = $1 WHERE email = $2";
      const updatedRows = await client.query(updatePasswordQuery, [
        newEncryptedPassword,
        email,
      ]);
      return res
        .status(200)
        .send({ message: "Reset password successfully!", status: 200 });
    }

    return res.status(400).send({ message: "User not found!", status: 400 });
  } catch (err) {
    console.log("Error occured when resetting password!", err);
    return res.status(400).send({
      message: "Error occured when resetting password! Try again later!",
      status: 400,
    });
  }
};

const updateProfile = (req, res) => {
  const { firstName, lastName, email, position, phone } = req.body;

  if (!firstName || !lastName || !email || !position || !phone) {
    return res
      .status(400)
      .send({ message: "Please Provide all credentials!", status: 400 });
  }

  if (!checkUserExistance(email)) {
    return res
      .status(400)
      .send({ message: "Please Provide all credentials!", status: 400 });
  }
};
