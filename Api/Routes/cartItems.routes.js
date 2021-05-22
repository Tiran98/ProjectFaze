module.exports = app => {
    const cartItems = require("../Controllers/cartItems.controller.js");

    //create a new cartItems
    app.post("/cartItems", cartItems.create);

    //Retrieve all cartItems
    app.get("/cartItems", cartItems.findAll);

    //Retrieve a single cartItems with cartItemsId
    app.get("/cartItems/:cartItemsId", cartItems.findOne);

    //Update a cartItems with cartItems
    app.put("/cartItems/:cartItemsId", cartItems.update);

    //Delete a cartItems with cartItems
    app.delete("/cartItems/:cartItemsId", cartItems.delete);

    //Delete all cartItems
    app.delete("/cartItems", cartItems.deleteAll); 
}