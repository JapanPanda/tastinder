const logger = require('./winston');
const typediLoader = require('./typedi');
const expressLoader = require('./express');
const sequelizeLoader = require('./sequelize');

module.exports = async (expressApp, server) => {
  try {
    const sequelize = await sequelizeLoader();
    logger.info('Loaded Sequelize!');

    // model loaders
    const roomModel = {
      name: 'Room',
      model: await require('../models/room')(sequelize),
    };

    const roomDataModel = {
      name: 'RoomData',
      model: require('../models/roomData')(sequelize, roomModel.model),
    };

    sequelize.sync({ force: true });

    typediLoader(sequelize, [roomModel, roomDataModel]);
    logger.info('Loaded TypeDI!');

    expressLoader(expressApp, server);
    logger.info('Loaded Express!');
  } catch (e) {
    logger.error(e.stack);
    process.exit(1);
  }
};
