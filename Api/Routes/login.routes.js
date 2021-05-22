module.exports = app => {
    const loginController = require("../Controllers/login.controller.js");

    //create a new Buyer
    app.post("/sign-up", loginController.signup);
    app.post("/login", loginController.login);

}