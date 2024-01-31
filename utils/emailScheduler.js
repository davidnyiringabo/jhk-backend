const cron = require("node-cron");
const { client } = require("../config/database/connect");

const emailSchedule = async () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("Starting to fetch");
      const data = await client.query(
        "SELECT * FROM users WHERE verified = false",
      );
      console.log(data.rows);
    } catch (error) {
      console.error("Error during database query:", error);
    }
  });
};

module.exports = emailSchedule;
