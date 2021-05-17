const Seller = require("../Models/seller.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    //Validate request
    if(!req.body) {
        res.status(400).send({
            message: "content can not be empty!"
        });
    }

    //create seller
    const seller = new Seller({
        username: req.body.username,
        email:req.body.email,
        password:req.body.password,
        age:req.body.age,
        country:req.body.country,
        address:req.body.address,
        usertype:req.body.usertype,
        mobile_number:req.body.mobile_number,
        company_name:req.body.company_name        
    });
    //save seller in database 
    Seller.create(seller, (err, data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Seller"
            });
        }
        else res.send(data);
    }); 
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Seller.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            }); 
        }
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Seller.findById(req.params.sellerId, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Buyer with id ${req.params.sellerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Buyer with id " + req.params.sellerId
                });
            }
        }else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    //Validate Request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Seller.updatedById(
        req.params.sellerId,
        new Seller(req.body),
        (err, data) => {
            if(err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message:`Not found Seller with id ${req.params.sellerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Seller with id " + req.params.sellerId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Seller.remove(req.params.sellerId, (err, data) => {
        if(err) {
            if(err.kind == "not_found") {
                res.status(404).send({
                    message:`Not found Seller with id ${req.params.sellerId}.`
                });
            }else {
                res.status(500).send({
                    message: "Could not delete Seller with id " + req.params.sellerId
                });
            }
        }else res.send({ message: `Seller was deleted Successfully!`});
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Seller.removeAll((err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all."
            });
        }
        else res.send({message: `All Seller were deleted successfully`});
    });
};