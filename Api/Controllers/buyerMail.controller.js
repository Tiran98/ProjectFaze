"use strict";
const nodemailer = require("nodemailer");
const buyer = require('../Models/buyer.model.js');
const cartItem = require('../Models/cartItems.model');
const orderHistory = require('../Models/orderHistory.model.js');

async function sendMail(req, res){
    buyer.findById(req.body.buyerId, async(err, data) => {
        if(data){
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                // host: "smtp.ethereal.email",
                // port: 587,
                // secure: false, // true for 465, false for other ports
                auth: {
                    user: "fazeonline.live@gmail.com", // generated ethereal user
                    pass: "faze54321", // generated ethereal password
                },
            });
            // const email = data[0].email;
            // send mail with defined transport object
            console.log(data.email);
            const msg = {
                from: '"Faze Online" <fazeonline.live@gmail.com>', // sender address
                to: `${data.email}`, // list of receivers
                subject: "Your Order has been Delivered", // Subject line
                html: "<b>FAZE Online</b>", // html body
            }
            //send mail with defined transport object
            const info = await transporter.sendMail(msg);

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
            // Preview only available when sending through an Ethereal account
            //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            res.send('Email Sent')
        }else{
            res.send('Buyer Not found by this email');
        }
    })
    
}

module.exports = {
    sendMail: sendMail
}