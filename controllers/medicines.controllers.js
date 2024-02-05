const { client } = require("../config/database/connect");
const { v4: uuidv4 } = require("uuid");
const sendWelcomeEmail = require("../utils/welcomeEmail");

exports.getAllMedicines = async (req, res) => {
  const query = "SELECT * FROM medicines";
  try {
    const medicines = await client.query(query);
    return res.status(200).send({ data: medicines.rows, status: 200 });
  } catch (err) {
    console.log("Error occurred while getting medicines!", err);
    return res.status(500).send({
      message: "Error occurred while getting medicines!",
      status: 500,
    });
  }
};

exports.getMedicineById = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const query = "SELECT * FROM medicines WHERE id = $1";
  try {
    const medicines = await client.query(query, [id]);
    return res.status(200).send({ data: medicines.rows, status: 200 });
  } catch (err) {
    console.log("Error occurred while getting medicines!", err);
    return res.status(500).send({
      message: "Error occurred while getting medicines!",
      status: 500,
    });
  }
};

exports.createMedicine = async (req, res) => {
  const { name, age, email, phone, gender, blood } = req.body;
  if (!name || !age || !email || !phone || !gender || !blood) {
    return res
      .status(400)
      .send({ message: "Please provide all credentials!", status: 400 });
  }
  console.log(req.body);
  const id = uuidv4();
  console.log(id);
  const query =
    "INSERT INTO medicines (id,name, age, email, phone, gender) VALUES ($1,$2,$3,$4,$5,$6);";
  try {
    const appointments = await client.query(query, [
      id,
      name,
      age,
      email,
      phone,
      gender.toUpperCase(),
    ]);
    if (sendWelcomeEmail())
      return res
        .status(200)
        .send({ message: "Inserted medicine successfully!", status: 200 });
  } catch (err) {
    console.log("Error occurred while inserting medicines!", err);
    if ((err.constraint = "medicines_email_key")) {
      return res.status(500).send({
        message: "The medicine already exists!",
        status: 500,
      });
    }
    return res.status(500).send({
      message: "Error occurred while inserting medicines!",
      status: 500,
    });
  }
};

exports.updateMedicine = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .send({ message: "Please provide an id!", status: 400 })
      .status(400);
  }
  const query = "UPDATE appointments SET feepaid = true WHERE id = $1";
  try {
    const appointments = await client.query(query, [id]);
    return res
      .status(200)
      .send({ message: "Updated Successfully", status: 200 });
  } catch (err) {
    console.log("Error occurred while updating appointments!", err);
    return res.status(500).send({
      message: "Error occurred while updating appointments!",
      status: 500,
    });
  }
};
