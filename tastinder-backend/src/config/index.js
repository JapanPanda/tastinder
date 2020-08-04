const dotenv = require("dotenv").config();

if (!dotenv) {
  throw new Error("Couldn't find .env file");
}

module.exports = {
  port: parseInt(process.env.PORT, 10),
  database_uri: process.env.DATABASE_URI,
  api_prefix: process.env.API_PREFIX,
};
