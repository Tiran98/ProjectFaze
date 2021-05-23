const Buyer = require("../Models/buyer.model.js");
//var dbConfig = require("./config/db.config.js")
const client = require("twilio")('AC46e8034ecd71c96315f0e92d8890682d','c4ab0857a47166d12703acfa391a7680')

function sendTextMessage(req, res){
    Buyer.findById(req.body.buyerId, (err,data) => {
        if(data){
            client.messages.create({
                body:"Hello From Faze, Your order has been delivered",
                to:`${data.mobile_number}`,
                from:'+17816615707'
            }).then(message => console.log(message))
            .catch(error => console.log(error))
            res.send("Message Sent");
        }else{
            res.send("Cant find a buyer from this ID");
        }
    })
}

module.exports = {
    sendTextMessage: sendTextMessage
}