const OrderHistory = require("../Models/orderHistory.model");

// Create and Save a new order History
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "content can not be empty!"
        });
    }
    var itemslength = req;
    var count = Object.keys(itemslength.body.neworderHistory.cart_items).length;
    console.log(req.body.neworderHistory);
    //create new order history
    const orderHistory = new OrderHistory({
        buyer_id: req.body.neworderHistory.customer.id,
        seller_id: req.body.neworderHistory.cart_items[0].product.seller_id,
        item_id: req.body.neworderHistory.cart_items[0].product.id,
        buyer_firstName: req.body.neworderHistory.customer.firstname,
        buyer_lastName: req.body.neworderHistory.customer.lastname,
        country: req.body.neworderHistory.shipping.country,
        item_name: req.body.neworderHistory.cart_items[0].product.item_name,
        item_qty: req.body.neworderHistory.cart_items[0].quantity,
        item_category: req.body.neworderHistory.cart_items[0].product.item_category,
        unit_price: req.body.neworderHistory.cart_items[0].product.unit_price,
        total_price: req.body.neworderHistory.cart_items[0].subtotal,
        final_cost: req.body.neworderHistory.final_cost,
        total_items: count,
        payment_method: req.body.neworderHistory.payment,
        order_ref: req.body.neworderHistory.order_ref
    });
    //save order history in database
    OrderHistory.create(orderHistory, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order History"
            });
        } else res.send(data);
    });
};

// Retrieve all histories from the database.
exports.findAll = (req, res) => {
    OrderHistory.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving order History."
            });
        } else res.send(data);
    });
};

// Find a single history with a BuyerId
exports.findOne = (req, res) => {
    OrderHistory.findById(req.params.buyerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found history with id ${req.params.buyerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving history with id " + req.params.buyerId
                });
            }
        } else res.send(data);
    });
};

// Update a history identified by the BuyerId in the request
exports.update = (req, res) => {
    //Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    OrderHistory.updatedById(
        req.params.buyerId,
        new OrderHistory(req.body),
        (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: `Not found history with id ${req.params.buyerId}.`
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
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Not found history with id ${req.params.buyerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete history with id " + req.params.buyerId
                });
            }
        } else res.send({ message: `History was deleted Successfully!` });
    });
};

// Delete all Buyers from the database.
exports.deleteAll = (req, res) => {
    OrderHistory.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while removing all."
            });
        } else res.send({ message: `All Historis were deleted successfully` });
    });
};