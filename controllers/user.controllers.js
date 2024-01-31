const { client } = require("../config/database/connect");

exports.updateUser = async (req, res) => {
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

  const updateQuery =
    "UPDATE users SET firstName = $1, lastName = $2, email = $3, position = $4, phone = $5 WHERE email = $3";
  const updatedUser = await client.query(updateQuery, [
    firstName,
    lastName,
    email,
    position,
    phone,
  ]);

  console.log(updatedUser);
};
