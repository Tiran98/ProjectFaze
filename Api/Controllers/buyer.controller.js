const Buyer = require("../Models/buyer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    //Validate request
    if(!req.body) {
        res.status(400).send({
            message: "content can not be empty!"
        });
    }
    //create buyer
    const buyer = new Buyer({
        username: req.body.username,
        email:req.body.email,
        password:req.body.password,
        age:req.body.age,
        country:req.body.country,
        address:req.body.address,
        usertype:req.body.usertype,
        mobile_number:req.body.mobile_number        
    });
    //save buyer in database
    Buyer.create(buyer, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Buyer"
            });
        }
        else res.send(data);
    });  
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Buyer.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            }); 
        }
        else res.send(data);
    });
};

// Find a single Buyer with a BuyerId
exports.findOne = (req, res) => {
    Buyer.findById(req.params.buyerId, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Buyer with id ${req.params.buyerId}.`
                });   
            }
            else{
                res.status(500).send({
                    message: "Error retrieving Buyer with id " + req.params.buyerId
                });
            }
        }else res.send(data);
    });
};

// Update a Buyer identified by the BuyerId in the request
exports.update = (req, res) => {
    //Validate Request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Buyer.updatedById(
        req.params.buyerId,
        new Buyer(req.body),
        (err, data) => {
            if(err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message:`Not found Buyer with id ${req.params.buyerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Buyer with id " + req.params.buyerId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Buyer with the specified BuyerId in the request
exports.delete = (req, res) => {
    Buyer.remove(req.params.buyerId, (err, data) => {
        if(err) {
            if(err.kind == "not_found") {
                res.status(404).send({
                    message:`Not found Buyer with id ${req.params.buyerId}.`
                });
            }else {
                res.status(500).send({
                    message: "Could not delete Buyer with id " + req.params.buyerId
                });
            }
        }else res.send({ message: `Buyer was deleted Successfully!`});
    });
};

// Delete all Buyers from the database.
exports.deleteAll = (req, res) => {
    Buyer.removeAll((err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all."
            });
        }
        else res.send({message: `All Buyer were deleted successfully`});
    });
};