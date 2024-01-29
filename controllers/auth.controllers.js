const bcrypt = require("bcrypt");
const { client } = require("../config/database/connect");
const { v4: uuidv4 } = require("uuid");
const credsSchema = require("../utils/joiSchema.js");
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send({ message: "Provide all required credentials!" });
    return;
  }

  try {
    const query = "SELECT * FROM users where email = $1";
    const data = await client.query(query, [email]);
    console.log(data);

    if (data.rows.length === 0) {
      res.status(401).send({ message: "Invalid email or password" });
      return;
    }

    const user = data.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid email or password" });
      return;
    }

    console.log("login endpoint called");
    res.send("Successfully logged in");
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
  } else {
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const id = uuidv4();
      const data = client.query(query, [email]);

      if (data?.row?.length === 0) {
        res
          .status(400)
          .send({
            message: "User with the same email exist. Login to continue.",
          });
        return;
      } else {
        try {
          const validated = await credsSchema.validateAsync({
            email: email,
            password: password,
          });
          res
            .status(201)
            .send({ message: "Your account is About to be created!" });
          const encrypted = await bcrypt.hash(password, 15);
          console.log(encrypted);
          const insert = "INSERT INTO users values ()";
        } catch (err) {
          res.status(400).send({ message: err.details[0].message });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error!");
    }
  }
};
