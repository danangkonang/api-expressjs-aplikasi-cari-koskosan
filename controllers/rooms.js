//const connection = require('../db')
const models = require('../models')
const Room = models.room

exports.index=(req, res)=>{
    Room.findAll({
        attributes: ['id', 'name','address','price','images']
    }).then(rooms=>res.send(rooms))
}

exports.show = (req,res)=>{
    Room.findAll({
        attributes: [
        'id',
        'name',
        'address',
        'price',
        'images',
        'logitude',
        'lotitude',
        'long',
        'wide',
        'phoneManagement'
    ],
        where: {
            id: req.params.id
        }
    }).then(room=> res.send(room))
}

exports.store=(req, res)=>{
    const {
        name,
        address,
        logitude,
        lotitude,
        userId,
        management,
        phoneManagement,
        long,
        wide,
        price,
    } = req.body

    upload(req, res, (err) => {
        if(err){
                res.send({"message":"error db file"})
            } else {
            if(req.files == undefined){
                res.send({"message":"file undefined"})
            } else {
                const imageName1 = req.files[0].fieldname
                const imageName2 = req.files[1].fieldname
                Room.create({
                    name: name,
                    address: address,
                    logitude:logitude,
                    lotitude:lotitude,
                    userId: userId,
                    management: management,
                    phoneManagement:phoneManagement,
                    images:{
                        imageName1,
                        imageName2
                    },
                    long:long,
                    wide:wide,
                    price:price
                 }).then(room=> res.send(room))
                 .catch(err => res.send(err))
                // res.send({"message":"sukses"})
            }   
        }
    })

    
 }

exports.update=(req, res)=>{
    const {
        name,
        address,
        logitude,
        lotitude,
        userId,
        management,
        phoneManagement,
        long,
        wide,
        price,
    } = req.body
    upload(req, res, (err) => {
        if(err){
                res.send({"message":"error db file"})
            } else {
            if(req.files == undefined){
                res.send({"message":"file undefined"})
            } else {

            Room.update({
                name: name,
                address: address,
                logitude:logitude,
                lotitude:lotitude,
                userId: userId,
                management: management,
                phoneManagement:phoneManagement,
                images:{
                    imageName1,
                    imageName2
                },
                long:long,
                wide:wide,
                price:price
                }, 
                {
                where: {
                    id: req.params.id
                }
                })
                .then(() => {
                    res.send(`Data with id ${req.params.id} success to updated`);
                })
                .catch(err => {
                    res.send(err.message);
                });
            }   
        }
    })
}

exports.delete=(req, res)=>{
    Room.destroy({
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

exports.input = (req, res) => {
        const {
            name,
            address,
            logitude,
            lotitude,
            userId,
            management,
            phoneManagement,
            long,
            wide,
            price,} = req.body
        Room.create({
            name: name,
            address: address,
            logitude:logitude,
            lotitude:lotitude,
            userId: userId,
            management: management,
            phoneManagement:phoneManagement,
            long:long,
            wide:wide,
            price:price
        }).then(room=> res.send(room))
        .catch(err => res.send(err))
        //res.send({"tes":"ting"})
    }
