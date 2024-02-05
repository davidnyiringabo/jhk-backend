const express = require("express");
const router = require("./routes/auth.routes");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const upload = multer();
const { client } = require("./config/database/connect.js");
const authMiddleWare = require("./middlewares/auth.js");
dotenv.config();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect postgres database
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database", err)),
  app.use(cors());

app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/user", require("./routes/user.routes"));
app.use("/api/v1/appointment", require("./routes/appointments.routes.js"));
app.use("/api/v1/patient", require("./routes/patients.routes.js"));
app.use("/api/v1/doctor", require("./routes/doctors.routes.js"));
app.use("/api/v1/medicine", require("./routes/medicines.routes.js"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
