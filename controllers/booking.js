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
   upload(req, res, (err) => {
      if(err){
         res.send({"message":"error db file"})
      }else{
         if(req.files == undefined){
            res.send({"message":"file undefined"})
         }else{
            const imageName1 = req.files[0].fieldname
            const imageName2 = req.files[1].fieldname
            Room.create({
               images:{
                  imageName1,
                  imageName2
              }
            })
            .then(room=> res.send(room))
            .catch(err => res.send(err))
         }
      }
   })
}