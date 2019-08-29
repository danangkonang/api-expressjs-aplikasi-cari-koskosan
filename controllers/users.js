//const connection = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const models = require('../models')
const User = models.user
const Room = models.room

exports.index=(req, res)=>{
    User.findAll({
        attributes: ['id', 'email','password']
    }).then(users=>res.send(users))
}

exports.delete=(req, res)=>{
    User.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(() => {
          res.send(`Data with id ${req.params.id} success deleted`);
        })
        .catch(err => {
          res.send(err.message)
        })
}

exports.login =(req,res)=>{
    const { email,password } = req.body
    User.findAll({
        attributes: ['id','email', 'password'],
        where: {
            email: email
          }
    }).then((data)=>{
        if(data.length > 0){
            const passwordHansed = data[0].password
            const dataId = data[0].id
            const dataEmail = data[0].email
            bcrypt.compare(password, passwordHansed, function(error, respose) {
                if(error){
                    console.log(error)
                    res.send({'succes':false,'message':'error ferivy'})
                }
                if(respose == true){
                    jwt.sign({ email:email }, 'secret_key',(err,token)=>{
                        res.send({
                            id:dataId,
                            email:dataEmail,
                            token:token
                        })
                    })
                }else{
                    res.send({
                        message:"password salah"
                    })
                }
            })
        }else{
            res.send({'succes':false,'message':'email not found'})
        }
    })
}

exports.registrasi=(req,res)=>{
    const { email,password } = req.body
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            User.create({
                email: email,
                password: hash
            }).then((user)=>{
                jwt.sign({ email:email }, 'secret_key',(err,token)=>{
                    res.send({
                        id:user.id,
                        email:user.email,
                        token:token
                    })
                })
            })
            .catch(err => res.send(err))
            
        })
    })
}






















// exports.tambah = (req, res) => {
//     const {name, email, password, phone} = req.body
//     User.create({
//         name: name,
//         email: email,
//         password: password,
//         phone:phone
//     }).then(user=> res.send(user))
//     .catch(err => res.send(err))
// }

// //join left
// exports.join =(req, res)=>{
//     Room.findAll({
//         attributes: ['room.id', 'room.name','room.address','user.phone'],
//         include: [{
//             model: User,
//             as: "user"
//         }]
//     }).then(user=> res.send(user))
// }

// exports.login2 = (req, res) => {
//     const { email,password } = req.body
//     connection.query("SELECT password FROM users WHERE email=?",
//     [email],(err,row)=>{
//         if(err){
//             console.log(err)
//             res.send({'succes':false,'message':'db error'})
//         }
//         if(row.length > 0){
//             const passwordBcrypt = row[0].password
//             verifyPassword(password, passwordBcrypt)
//         }else{
//             res.send({'succes':false,'message':'email not found'})
//         }
//     })

//     async function verifyPassword(password, passwordBcrypt) {
//         await bcrypt.compare(password, passwordBcrypt,(error, respose)=> {
//                 if(error){
//                     console.log(error)
//                     res.send({'succes':false,'message':'error ferivy'})
//                 }
//                 if(respose == true){
//                     jwt.sign({ email:email }, 'secret_key',(err,token)=>{
//                         res.send({token:token})
//                     })
//                 }else{
//                     res.send({
//                         message:"password salah"
//                     })
//                 }
//             })
//       }
    
// }



// exports.register = (req, res) => {
//     const { email,password } = req.body 
    
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         bcrypt.hash(password, salt, function(err, hash) {
            
//             connection.query(`INSERT INTO users (email,password) VALUES ('${email}', '${hash}')`, (err)=> {
//                 if (err) throw err
//                 res.send({
//                     success: true,
//                     data: req.body.email
//                 })
//             })
//         });
//     });
// }


// exports.verify =(req, res)=> {

//     const passwordHansed = "$2b$10$/CpC.RVaZZNFES4vuXemmuuFktEJq1mx7vsvUhyiGQgvgO2rvBcH6"
//     const { email,password } = req.body
//     bcrypt.compare(password, passwordHansed, function(err, respose) {
//         if(respose ==true){
//             res.send({
//                 message:"password benar"
//             })
//         }else{
//             res.send({
//                 message:"password salah"
//             })
//         }
//     });
// }

// exports.index = (req, res) => {
//     jwt.verify(req.token, 'secret_key',(err, authData)=>{
//         if(err){
//             res.sendStatus(403)
//         }else{
//             connection.query('SELECT * FROM users', (err, rows)=> {
//                 if (err) throw err
              
//                 res.send(authData)
//             })  
//         }
//     })
      
// }

