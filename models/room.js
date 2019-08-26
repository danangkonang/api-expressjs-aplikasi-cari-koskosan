'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    logitude: DataTypes.STRING,
    lotitude: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    management: DataTypes.STRING,
    phoneManagement: DataTypes.STRING,
    images: DataTypes.STRING,
    long: DataTypes.INTEGER,
    wide: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  room.associate = function(models) {
    // associations can be defined here
    room.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'userId',
    })
  };
  return room;
};