const Sequelize = require('sequelize');

module.exports = (sequelize, roomModel) => {
  const RoomData = sequelize.define(
    'RoomData',
    {
      yelpData: {
        type: Sequelize.JSON,
        notNull: true,
      },
      likes: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
    },
    {}
  );

  roomModel.hasMany(RoomData, {
    foreignKey: 'roomName',
    as: 'roomData',
  });

  RoomData.belongsTo(roomModel, {
    foreignKey: 'roomName',
    as: 'room',
  });

  return RoomData;
};
