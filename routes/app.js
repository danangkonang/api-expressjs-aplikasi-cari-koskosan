const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')
//const jwt = require('jsonwebtoken')

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: './images/rooms',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
// }).single('myImage');
}).array('userPhoto',2)

function checkFileType(file, cb){
const filetypes = /jpeg|jpg|png|gif/
const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
const mimetype = filetypes.test(file.mimetype)

if(mimetype && extname){
    return cb(null,true)
    } else {
        cb('Error: Images Only!')
    }
}

const app = express()
app.use(bodyParser.json())





const ControllersRoom = require('../controllers/rooms')
const ControllersUser = require('../controllers/users')
const ControllersBooking = require('../controllers/booking')

app.get('/', (req, res) => res.send('Hello Danang'))
app.post('/input', ControllersRoom.input)
app.group("/api/v1",(router)=>{
    router.get('/rooms', ControllersRoom.index)
    router.get('/room/:id', ControllersRoom.show)
    router.post('/room',verifyToken, ControllersRoom.store)
    router.patch('/room/:id',verifyToken, ControllersRoom.update)    
    router.delete('/room/:id',verifyToken, ControllersRoom.delete)
})

app.group("/user", (router) => {
    router.post('/login', ControllersUser.login)    
    router.post('/registrasi', ControllersUser.registrasi)
    router.post('/booking',verifyToken, ControllersBooking.booking)
    router.post('/uploads', ControllersBooking.upload)
})


function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}


















//lokasi image
// filename: 'myImage-1566822930593.png',
// path: './images/rooms/myImage-1566822930593.png',

// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if(err){
//                 res.send({"message":"error 1"})
//             } else {
//             if(req.files == undefined){
//                 res.send({"message":"error 2"})
//             } else {
//                 const imageName1 = req.files[0].fieldname
//                 const imageName2 = req.files[1].fieldname
//                 res.send({"message":"sukses"})
//             }   
//         }
//     })
// })


// app.get('/', (req, res, next) => res.send({message:'Hello World!'}))
// //ambil semua data kamar
// app.get('/rooms',ControllersRoom.index)
// //menampilkan detai by id
// app.get('/room/:id',ControllersRoom.show)
// //input user
// app.post('/tambah',ControllersUser.tambah)



//join 
//app.get('/join',ControllersUser.join)





//router.get('/',verifyToken, ControllersUser.index)
// app.post('/api/service',verifyToken,(req, res) => {
//     jwt.verify(req.token, 'secret_key',(err, authData) => {
//         if(err){
//             res.sendStatus(403);
//         }else{
//             res.json({
//                 message: 'Access ok',
//                 authData
//             });
//         }
//     });
// });





module.exports = app;