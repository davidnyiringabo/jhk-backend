const { client } = require("../config/database/connect");
const { v4: uuidv4 } = require("uuid");
const sendWelcomeEmail = require("../utils/welcomeEmail");

exports.getAllMedicines = async (req, res) => {
  const query = "SELECT * FROM products";
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
  const query = "SELECT * FROM products WHERE id = $1";
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
  const { name, type, price, quantity, manufacturer, expiryDate } = req.body;
  if (!name || !type || !price || !quantity || !expiryDate || !manufacturer) {
    return res
      .status(400)
      .send({ message: "Please provide all credentials!", status: 400 });
  }
  console.log(req.body);
  const id = uuidv4();
  console.log(id);
  const query =
    "INSERT INTO products (id,product_name, type, price, quantity, manufacturer, expirely_date) VALUES ($1,$2,$3,$4,$5,$6, $7);";
  try {
    const appointments = await client.query(query, [
      id,
      name,
      type,
      price,
      quantity,
      manufacturer,
      expiryDate
    ]);
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

exports.updateMedicine= async (req, res) => {
  const { id,name, type, price, quantity, manufacturer, expiryDate } = req.body;
  if (!id || !name || !type || !price || !quantity || !expiryDate || !manufacturer) {
    return res
      .status(400)
      .send({ message: "Please provide full data!", status: 400 });
  }

  const query =
    "UPDATE products SET product_name= $2 , type = $3 , price = $4 , quantity = $5 , manufacturer = $6 , expirely_date = $7 WHERE id = $1;";
  try {
    const appointments = await client.query(query, [
      id,
      name,
      type,
      price,
      quantity,
      manufacturer,
      expiryDate
    ]);
      return res
        .status(200)
        .send({ message: "Updated medicine successfully!", status: 200 });
  } catch (err) {
    console.log("Error occurred while updating medicines!", err);
    return res.status(500).send({
      message: "Error occurred while updating medicines!",
      status: 500,
    });
  }
};

exports.deleteMedicine = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .send({ message: "Please provide an id!", status: 400 })
      .status(400);
  }
  const query = "DELETE FROM products WHERE id = $1";
  try {
    const appointments = await client.query(query, [id]);
    return res
      .status(200)
      .send({ message: "Deleted Successfully", status: 200 });
  } catch (err) {
    console.log("Error occurred while deleting Medicine!", err);
    return res.status(500).send({
      message: "Error occurred while deleting Medicine!",
      status: 500,
    });
  }
};
