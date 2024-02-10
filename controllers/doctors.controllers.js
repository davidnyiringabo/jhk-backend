const { client } = require("../config/database/connect");
const { v4: uuidv4 } = require("uuid");
const sendWelcomeEmail = require("../utils/welcomeEmail");

exports.getAllDoctors = async (req, res) => {
  const query = "SELECT * FROM doctors";
  try {
    const doctors = await client.query(query);
    return res.status(200).send({ data: doctors.rows, status: 200 });
  } catch (err) {
    console.log("Error occurred while getting doctors!", err);
    return res
      .status(500)
      .send({ message: "Error occurred while getting doctors!", status: 500 });
  }
};

exports.getDoctorById = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const query = "SELECT * FROM doctors WHERE id = $1";
  try {
    const appointments = await client.query(query, [id]);
    return res.status(200).send({ data: appointments.rows, status: 200 });
  } catch (err) {
    console.log("Error occurred while getting doctors!", err);
    return res
      .status(500)
      .send({ message: "Error occurred while getting doctors!", status: 500 });
  }
};

exports.createDoctor = async (req, res) => {
  const { name, age, email, phone, gender, specialisation, image } = req.body;
  if (!name || !age || !email || !phone || !gender || !specialisation) {
    return res
      .status(400)
      .send({ message: "Please provide all credentials!", status: 400 });
  }
  console.log(req.body);
  const id = uuidv4();
  console.log(id);
  const query =
    "INSERT INTO doctors (id,name, age, email, phone, gender, specialisation, image) VALUES ($1,$2,$3,$4,$5,$6,$7, $8);";
  try {
    const appointments = await client.query(query, [
      id,
      name,
      age,
      email,
      phone,
      gender.toUpperCase(),
      specialisation,
      image
    ]);
    if (sendWelcomeEmail())
      return res
        .status(200)
        .send({ message: "Inserted doctor successfully!", status: 200 });
  } catch (err) {
    console.log("Error occurred while inserting doctors!", err);
    if ((err.constraint = "doctors_email_key")) {
      return res.status(500).send({
        message: "The doctor already exists!",
        status: 500,
      });
    }
    return res.status(500).send({
      message: "Error occurred while inserting doctors!",
      status: 500,
    });
  }
};

exports.updateDoctor = async (req, res) => {
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
