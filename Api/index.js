const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');

var dbConfig = require("./config/db.config.js")
const client = require("twilio")(dbConfig.accountSID, dbConfig.authToken)

const database = require('../Api/Models/db');

const app = express();
app.use(cors())

database.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./Routes/buyer.routes.js")(app);
require("./Routes/seller.routes.js")(app);
require("./Routes/item.routes.js")(app);
require("./Routes/cartItems.routes")(app);
require("./Routes/orderHistory.routes.js")(app);
require("./Routes/login.routes.js")(app);

//OTP Functions
app.post('/sendOTP', (req, res) => {
    client
        .verify
        .services(dbConfig.serviceID)
        .verifications
        .create({
            //from: '+94712427978',
            to: `+${req.body.phonenumber}`,
            channel: "sms"
        })
        .then((data) => {
            res.status(200).send(data)
        })
});

app.post('/verifyOTP', (req, res) => {
    client
        .verify
        .services(dbConfig.serviceID)
        .verificationChecks
        .create({
            to: `+${req.body.phonenumber}`,
            code: req.body.code
        })
        .then((data) => {
            res.status(200).send(data)
        })
});

app.get("/emailCart", (req, res) => {
    database.query("SELECT * FROM cart_items", (err, response) => {
        if (err) {
            res.send(err)
        }
        console.log(response)
        res.send(response)
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));