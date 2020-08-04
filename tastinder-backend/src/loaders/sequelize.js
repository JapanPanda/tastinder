const { Sequelize } = require('sequelize');
const config = require('../config');
const logger = require('./winston');

module.exports = async () => {
  const sequelize = new Sequelize(config.database_uri);
  try {
    await sequelize.authenticate();
    return sequelize;
  } catch (e) {
    logger.error(e);
  }
  return null;
};
