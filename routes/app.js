const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')
const models = require('../models')
const Room = models.room
// const jwt = require('jsonwebtoken')
const multer = require('multer')
const app = express()
const path = require('path')

// app.use("/public", express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
   destination: './public/image',
   filename: function(req, file, cb){
       cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
   }
});

var upload = multer({storage: storage});
var uploadimg = upload.array('myImage',3)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

const ControllersRoom = require('../controllers/rooms')
const ControllersUser = require('../controllers/users')
const ControllersBooking = require('../controllers/booking')

app.group("/api/v1",(router)=>{
    router.get('/rooms', ControllersRoom.index)
    router.get('/room/:id', ControllersRoom.show)
    router.post('/room',verifyToken, ControllersRoom.store)
    router.patch('/room/:id',verifyToken, ControllersRoom.update)    
    router.delete('/room/:id', ControllersRoom.delete)
    
})

app.group("/user", (router) => {
    router.post('/login', ControllersUser.login)    
    router.post('/registrasi', ControllersUser.registrasi)
    router.post('/booking', verifyToken, ControllersBooking.booking)
    router.post('/uploads', ControllersBooking.upload)
    router.get('/i/:id', ControllersUser.getById)
    // router.get('/i/:id', (req,res)=>{
    //     res.send('testing')
    //     console.log(req.params)
    // })
})

app.get('/', (req, res) => {
    // var h = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmFuZ0BlbWFpbC5jb20iLCJpYXQiOjE1NjgxMDk3Mjl9.GWv7Y4oit29xrx7XM53GawPhLp3s27G8yQrZhmpY578','secret_key')
    // console.log(h)
    res.send('Hello Danang')
})

app.post('/input', (req, res) => {
   uploadimg(req, res, (err) => {
      if(err){
              res.send({"message":"error db file"})
          } else {
          if(req.files == undefined){
              res.send({"message":"file undefined"})
          } else {
              const imageName1 = req.files[0].filename
              const imageName2 = req.files[1].filename
              const imageName3 = req.files[1].filename
              const totalImages = imageName1+ " , " +imageName2+ " , " +imageName3
              console.log(req.body)
              res.send("message")
            //   Room.create({
            //     //   name: req.body.nameKos,
            //     //   address: req.body.addresKos,
            //     //   logitude: req.body.longitude,
            //     //   lotitude: req.body.latitude,
            //     //   userId: req.body.userId,
            //     //   management: req.body.direktore,
            //     //   phoneManagement: req.body.phoneDirektore,
            //       images: totalImages,
            //       long: req.body.long,
            //       wide: req.body.wide,
            //       price: req.body.price
            //    }).then(room=> res.send(room))
            //    .catch(err => res.send(err))
          }   
      }
  })
   
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(404);
    }
}

module.exports = app;
