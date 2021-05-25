const Item = require("../Models/item.model.js");

// Create and Save a new Item
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "content can not be empty!"
        });
    }
    //create item
    const item = new Item({
        seller_id: req.body.seller_id,
        item_name: req.body.item_name,
        item_stock: req.body.item_stock,
        item_category: req.body.item_category,
        unit_price: req.body.unit_price,
        item_description: req.body.item_description,
        item_image: req.body.item_image,
    });
    //save Item in database
    Item.create(item, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Item"
            });
        } else res.send(data);
    });
};

// Retrieve all Items from the database.
exports.findAll = (req, res) => {
    Item.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Items."
            });
        } else res.send(data);
    });
};

// Find a single item with a Item_id
exports.findOne = (req, res) => {
    Item.findById(req.params.itemId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Item with id ${req.params.itemId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving item with id " + req.params.itemId
                });
            }
        } else res.send(data);
    });
};

//Search by Name
exports.findName = (req, res) => {
    Item.findByName(req.body.itemName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Item with Name ${req.body.itemName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving item with Name " + req.body.itemName
                });
            }
        } else res.send(data);
    });
};

// Update a Item identified by the Item_id in the request
exports.update = (req, res) => {
    //Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Item.updatedById(
        req.params.itemId,
        new Item(req.body),
        (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: `Not found Item with id ${req.params.itemId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Item with id " + req.params.itemId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Item with the specified ItemId in the request
exports.delete = (req, res) => {
    Item.remove(req.params.itemId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Not found Item with id ${req.params.itemId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Item with id " + req.params.itemId
                });
            }
        } else res.send({ message: `Item was deleted Successfully!` });
    });
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
    Item.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while removing all."
            });
        } else res.send({ message: `All Items were deleted successfully` });
    });
};