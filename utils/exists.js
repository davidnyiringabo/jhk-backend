const {client} = require("../config/database/connect.js")

const checkUserExistance = async (email)=>{
    const queryExistingUser = "SELECT * FROM users WHERE email = $1";
    const existingUserData = await client.query(queryExistingUser, [email]);

    if (existingUserData.rows.length !== 0) {
      return true;
    }

    return false;
}

module.exports = checkUserExistance;