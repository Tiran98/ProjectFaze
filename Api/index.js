const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const database = require('../Api/Models/db');

const app = express();

database.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require("./Routes/buyer.routes.js")(app);
require("./Routes/seller.routes.js")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));