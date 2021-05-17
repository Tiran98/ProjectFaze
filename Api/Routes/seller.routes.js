module.exports = app => {
    const seller = require("../Controllers/seller.controller");

    //create a new Buyer
    app.post("/seller", seller.create);

    //Retrieve all Buyers
    app.get("/seller", seller.findAll);

    //Retrieve a single buyer with buyerId
    app.get("/seller/:sellerId", seller.findOne);

    //Update a buyer with buyer
    app.put("/seller/:sellerId", seller.update);

    //Delete a buyer with buyer
    app.delete("/seller/:sellerId", seller.delete);

    //Delete all buyers
    app.delete("/seller", seller.deleteAll); 
}