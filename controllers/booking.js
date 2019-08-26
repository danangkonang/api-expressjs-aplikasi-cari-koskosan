const models = require('../models')

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// const User = models.user
// const Room = models.room
const Booking = models.booking

exports.booking=(req, res)=>{
   const {userId, roomId, dataIn, dateOut,longBooking} = req.body
   Booking.create({
      userId: userId,
      roomId: roomId,
      dataIn:dataIn,
      dateOut:dateOut,
      longBooking:longBooking
   }).then(booking=> res.send(booking))
   .catch(err => res.send(err))
}

exports.upload=(req, res)=>{
   
}