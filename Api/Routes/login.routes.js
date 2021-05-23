var cors = require('cors')
module.exports = app => {
    const loginController = require("../Controllers/login.controller.js");

    app.post("/sign-up",cors(), loginController.signup);
    app.post("/login",cors(), loginController.login);

}