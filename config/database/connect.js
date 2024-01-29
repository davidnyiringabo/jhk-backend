const { Client } = require("pg");

exports.client = new Client({
  user: "postgres",
  host: "localhost",
  database: "jhk-hospital",
  password: "1234123",
  port: "5432",
});
