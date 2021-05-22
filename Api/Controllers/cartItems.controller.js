const CartItems = require("../Models/cartItems.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    //Validate request
    if(!req.body) {
        res.status(400).send({
            message: "content can not be empty!"
        });
    }
    //create buyer
    const cartItems = new CartItems({
        buyer_id: req.body.buyer_id,
        cart_id:req.body.cart_id,
        item_id:req.body.item_id,
        item_name:req.body.item_name,
        item_qty:req.body.item_qty,
        item_category:req.body.item_category,
        unit_price:req.body.unit_price,
        total_price:req.body.total_price,
        total_items:req.body.total_items         
    });
    //save buyer in database
    CartItems.create(cartItems, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cart Items"
            });
        }
        else res.send(data);
    });  
};

// Retrieve all Cart Items from the database.
exports.findAll = (req, res) => {
    CartItems.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Cart Items."
            }); 
        }
        else res.send(data);
    });
};

// Find a single Cart Item with a CarItemId
exports.findOne = (req, res) => {
    CartItems.findById(req.params.cartItemsId, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cart Item with id ${req.params.cartItemsId}.`
                });   
            }
            else{
                res.status(500).send({
                    message: "Error retrieving Cart Item with id " + req.params.cartItemsId
                });
            }
        }else res.send(data);
    });
};

// Update a Cart Items identified by the CartItemId in the request
exports.update = (req, res) => {
    //Validate Request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    CartItems.updatedById(
        req.params.cartItemsId,
        new CartItems(req.body),
        (err, data) => {
            if(err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message:`Not found Cart Items with id ${req.params.cartItemsId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Cart Items with id " + req.params.cartItemsId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Cart Items with the specified CartItemId in the request
exports.delete = (req, res) => {
    CartItems.remove(req.params.cartItemsId, (err, data) => {
        if(err) {
            if(err.kind == "not_found") {
                res.status(404).send({
                    message:`Not found Cart Item with id ${req.params.cartItemsId}.`
                });
            }else{
                res.status(500).send({
                    message: "Could not delete Cart Item with id " + req.params.cartItemsId
                });
            }
        }else res.send({ message: `Cart Item was deleted Successfully!`});
    });
};

// Delete all Cart Items from the database.
exports.deleteAll = (req, res) => {
    CartItems.removeAll((err, data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all."
            });
        }
        else res.send({message: `All Cart Item were deleted successfully`});
    });
};