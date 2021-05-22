module.exports = app => {
    const item = require("../Controllers/item.contoller.js");

    //create a new Item
    app.post("/item", item.create);

    //Retrieve all Items
    app.get("/item", item.findAll);

    //Retrieve a single Item with ItemId
    app.get("/item/:itemId", item.findOne);

    //Search a Items with Item Name
    app.get("/item/find/:itemName", item.findName);

    //Update a Item with ItemId
    app.put("/item/:itemId", item.update);

    //Delete a Item with ItemId
    app.delete("/item/:itemId", item.delete);

    //Delete all Items
    app.delete("/item", item.deleteAll); 
}