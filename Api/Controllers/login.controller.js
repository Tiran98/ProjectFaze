const buyer = require('../Models/buyer.model.js');
const seller = require('../Models/seller.model.js');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signup(req, res){
    if(req.body.usertype == "Buyer"){
        buyer.findOne(req.body.email, (err, data) => {
            if(data){
                res.status(409).json({
                    message: "Email already exists!",
                });
            }else{
                bcryptjs.genSalt(10, function(err, salt){
                    bcryptjs.hash(req.body.password, salt, function(err, hash){
                        const user = {
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            age: req.body.age,
                            country: req.body.country,
                            address: req.body.address,
                            usertype: req.body.usertype,
                            mobile_number: req.body.mobile_number
                        }
                        buyer.create(user, (err, data) => {
                            if(err){
                                console.log(err);
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while creating the Buyer"
                                });
                            }
                            else res.send(data);
                        }); 
                    });
                });       
            }
        })
    }else{
        seller.findOne(req.body.email, (err, data) => {
            if(data){
                res.status(409).json({
                    message: "Email already exists!",
                });
            }else{
                bcryptjs.genSalt(10, function(err, salt){
                    bcryptjs.hash(req.body.password, salt, function(err, hash){
                        const user = {
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            age: req.body.age,
                            country: req.body.country,
                            address: req.body.address,
                            usertype: req.body.usertype,
                            mobile_number: req.body.mobile_number,
                        }
                        seller.create(user, (err, data) => {
                            if(err){
                                console.log(err);
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while creating the Seller"
                                });
                            }
                            else res.send(data);
                        }); 
                    });
                });       
            }
        });
    }
}

function login(req, res){
    console.log(req.body);
    buyer.findOne(req.body.email, (err, data) => {
        if(err){
            console.log("this buyer email");
            seller.findOne(req.body.email, (serr, sdata) => {
                if(serr){
                    console.log("this seller email");
                    res.status(401).json({
                        message: "Invalid Credentials!",
                    });
                }else{
                    //var sellerData = JSON.parse(sdata);
                    console.log(sdata[0].password);
                    console.log(req.body.password);
                    bcryptjs.compare(req.body.password,sdata[0].password).then((result)=> {
                        if(result){
                            const token = jwt.sign({
                                email:sdata[0].email,
                                userId:sdata[0].id
                            }, 'secret', function(err, token){
                                res.status(200).json({
                                    message: "Authentication Successfull!",
                                    token: token
                                })
                            });
                        }else{
                            console.log(result);
                            console.log("this seller password");
                            res.status(401).json({
                                message: "Invalid Credentials!",
                            });
                        }
                    })
                }
            })
        }else{
            //var buyerData = JSON.parse(JSON.stringify(data));
            console.log(data[0].password);
            console.log(req.body.password);
            bcryptjs.compare(req.body.password,data[0].password).then((result)=> {
                if(result){
                    const token = jwt.sign({
                        email:data[0].email,
                        userId:data[0].id
                    }, 'secret', function(err, token){
                        res.status(200).json({
                            message: "Authentication Successfull!",
                            token: token
                        })
                    });
                }else{
                    console.log(data[0].password);
                    console.log(req.body.password);
                    console.log(result);
                    console.log("this buyer password");
                    res.status(401).json({
                        message: "Invalid Credentials!",
                    });
                }
            })
        }
    });
}

module.exports = {
    signup: signup,
    login: login
}