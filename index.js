const express = require("express");
const router = require("./routes/auth.routes");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const upload = multer();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use("/auth", require("./routes/auth.routes"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
