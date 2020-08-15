const Sequelize = require('sequelize');

module.exports = async (sequelize) => {
  const Room = await sequelize.define(
    'Room',
    {
      roomName: {
        type: Sequelize.TEXT,
        notNull: true,
        notEmpty: true,
        primaryKey: true,
      },
      players: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      endVotes: {
        type: Sequelize.INTEGER,
        notNull: true,
        notEmpty: true,
      },
      location: {
        type: Sequelize.TEXT,
      },
      keyword: {
        type: Sequelize.TEXT,
      },
    },
    {}
  );

  return Room;
};
