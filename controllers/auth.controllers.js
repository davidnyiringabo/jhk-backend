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
