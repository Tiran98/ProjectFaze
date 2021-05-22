const OrderHistory = require("../Models/orderHistory.model");

// Create and Save a new order History
exports.create = (req, res) => {
    //Validate request
    if(!req.body) {
        res.status(400).send({
            message: "content can not be empty!"
        });
    }
    //create new order history
    const orderHistory = new OrderHistory({
        buyer_id: req.body.buyer_id,
        seller_id:req.body.seller_id,
        item_id:req.body.item_id,
        item_name:req.body.age,
        item_qty:req.body.item_qty,
        item_category:req.body.item_category,
        unit_price:req.body.unit_price,
        total_price:req.body.total_price        
    });
    //save order history in database
    OrderHistory.create(orderHistory, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the order History"
            });
        }
        else res.send(data);
    });  
};

// Retrieve all histories from the database.
exports.findAll = (req, res) => {
    OrderHistory.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving order History."
            }); 
        }
        else res.send(data);
    });
};

// Find a single history with a BuyerId
exports.findOne = (req, res) => {
    OrderHistory.findById(req.params.buyerId, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found history with id ${req.params.buyerId}.`
                });   
            }
            else{
                res.status(500).send({
                    message: "Error retrieving history with id " + req.params.buyerId
                });
            }
        }else res.send(data);
    });
};

// Update a history identified by the BuyerId in the request
exports.update = (req, res) => {
    //Validate Request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    OrderHistory.updatedById(
        req.params.buyerId,
        new OrderHistory(req.body),
        (err, data) => {
            if(err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message:`Not found history with id ${req.params.buyerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating history with id " + req.params.buyerId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a history with the specified BuyerId in the request
exports.delete = (req, res) => {
    OrderHistory.remove(req.params.buyerId, (err, data) => {
        if(err) {
            if(err.kind == "not_found") {
                res.status(404).send({
                    message:`Not found history with id ${req.params.buyerId}.`
                });
            }else {
                res.status(500).send({
                    message: "Could not delete history with id " + req.params.buyerId
                });
            }
        }else res.send({ message: `History was deleted Successfully!`});
    });
};

// Delete all Buyers from the database.
exports.deleteAll = (req, res) => {
    OrderHistory.removeAll((err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all."
            });
        }
        else res.send({message: `All Historis were deleted successfully`});
    });
};