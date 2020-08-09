const Sequelize = require('sequelize');

module.exports = (sequelize, roomModel) => {
  const RoomData = sequelize.define(
    'RoomData',
    {
      YelpData: {
        type: Sequelize.JSON,
        notNull: true,
      },
      Likes: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
    },
    {}
  );

  roomModel.hasMany(RoomData, {
    foreignKey: 'roomName',
  });

  RoomData.belongsTo(roomModel);

  return RoomData;
};
