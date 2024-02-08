const pg = require("pg");
const { Pool } = pg;

exports.client = new Pool({
  connectionString:
    "postgres://default:v9li1QyAupHD@ep-silent-rice-a45gz1pr.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});
