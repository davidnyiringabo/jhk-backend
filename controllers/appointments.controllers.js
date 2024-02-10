const { client } = require("../config/database/connect");
const { v4: uuidv4 } = require("uuid");

exports.getAllAppointments = async (req, res) => {
  const query = "SELECT * FROM appointments";
  try {
    const appointments = await client.query(query);
    return res.status(200).send({ data: appointments.rows, status: 200 });
  } catch (err) {
    console.log("Error occurred while getting appointments!", err);
    return res.status(500).send({
      message: "Error occurred while getting appointments!",
      status: 500,
    });
  }
};
exports.createAppointment = async (req, res) => {
  const { patient, doctor, date, time, feesPaid } = req.body;
  if (!patient || !doctor || !date || !time || !feesPaid === undefined) {
    return res
      .status(400)
      .send({
        message: "Please provide all full credentials!" + " " + patient,
        doctor,
        date,
        time,
        feesPaid,
        status: 400,
      });
  }

  console.log(req.body);
  const id = uuidv4();
  console.log(id);
  const query =
    "INSERT INTO appointments (id,patient, doctor, date, time, feepaid) VALUES ($1,$2,$3,$4,$5,$6);";
  try {
    const appointments = await client.query(query, [
      id,
      JSON.parse(patient),
      JSON.parse(doctor),
      date,
      time,
      feesPaid,
    ]);
    return res
      .status(200)
      .send({ message: "Created appointment successfully!", status: 200 });
  } catch (err) {
    console.log("Error occurred while creating appointments!", err);
    return res.status(500).send({
      message: "Error occurred while creating appointments!",
      status: 500,
    });
  }
};

exports.updateFeeStatus = async (req, res) => {
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

exports.deleteAppointmentById = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(400)
      .send({
        message: "Please provide all full credentials!" + " " + patient,
        doctor,
        date,
        time,
        feesPaid,
        status: 400,
      });
  }
  const query = "DELETE FROM appointments WHERE id = $1";
  try {
    const appointments = await client.query(query, [id]);
    return res
      .status(200)
      .send({ message: "Deleted appointment successfully!", status: 200 });
  } catch (err) {
    console.log("Error occurred while Deleting appointments!", err);
    return res.status(500).send({
      message: "Error occurred while Deleting appointments!",
      status: 500,
    });
  }
};
