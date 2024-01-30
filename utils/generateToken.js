const jwt = require("jsonwebtoken");

const generateToken = (email, id) => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY is not defined in the environment.");
    }

    const token = jwt.sign(
      {
        email: email,
        id: id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      process.env.JWT_KEY,
    );

    console.log(token);
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    return null;
  }
};

generateToken("nyiringabodavid62@gmail.com", "lakj12-3ljhf8-lkajsdfh-83839sj");

module.exports = generateToken;
