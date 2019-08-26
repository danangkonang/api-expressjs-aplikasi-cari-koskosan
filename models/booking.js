'use strict';
module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('booking', {
    userBookingId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    dateIn: DataTypes.DATE,
    dateOut: DataTypes.DATE,
    longBooking: DataTypes.INTEGER
  }, {});
  booking.associate = function(models) {
    // associations can be defined here
  };
  return booking;
};