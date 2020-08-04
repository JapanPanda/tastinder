const logger = require('./winston');
const typediLoader = require('./typedi');
const expressLoader = require('./express');
const sequelizeLoader = require('./sequelize');

module.exports = async (expressApp) => {
  const sequelize = await sequelizeLoader();
  logger.info('Loaded Sequelize!');

  typediLoader(sequelize);
  logger.info('Loaded TypeDI!');

  expressLoader(expressApp);
  logger.info('Loaded Express!');
};
