const { Container } = require('typedi');
const logger = require('./winston');

module.exports = (sequelize) => {
  Container.set('logger', logger);
  Container.set('sequelize', sequelize);
};
