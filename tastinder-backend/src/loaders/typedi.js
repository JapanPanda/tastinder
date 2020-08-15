const { Container } = require('typedi');
const logger = require('./winston');
const roomService = require('../services/roomService');

module.exports = (sequelize, models) => {
  models.forEach((model) => {
    Container.set(model.name, model.model);
  });

  Container.set('logger', logger);
  Container.set('sequelize', sequelize);
  Container.set(
    'roomService',
    new roomService(logger, models[0].model, models[1].model)
  );
};
