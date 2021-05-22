module.exports = app => {
    const orderHistory = require("../Controllers/orderHistory.controller.js");

    //create a new History
    app.post("/orderHistory", orderHistory.create);

    //Retrieve all Histories
    app.get("/orderHistory", orderHistory.findAll);

    //Retrieve a history with buyerId
    app.get("/orderHistory/:buyerId", orderHistory.findOne);

    //Update a history with buyerId
    app.put("/orderHistory/:buyerId", orderHistory.update);

    //Delete a history with buyerId
    app.delete("/orderHistory/:buyerId", orderHistory.delete);

    //Delete all histories
    app.delete("/orderHistory", orderHistory.deleteAll); 
}