module.exports = app => {
    const buyer = require("../Controllers/buyer.controller.js");
    const buyermail = require("../Controllers/buyerMail.controller.js");

    //create a new Buyer
    app.post("/buyer", buyer.create);

    //Retrieve all Buyers
    app.get("/buyer", buyer.findAll);

    //Retrieve a single buyer with buyerId
    app.get("/buyer/:buyerId", buyer.findOne);

    //Update a buyer with buyer
    app.put("/buyer/:buyerId", buyer.update);

    //Delete a buyer with buyer
    app.delete("/buyer/:buyerId", buyer.delete);

    //Delete all buyers
    app.delete("/buyer", buyer.deleteAll); 

    //send mail to buyer
    app.post("/buyer/sendMail", buyermail.sendMail);
}