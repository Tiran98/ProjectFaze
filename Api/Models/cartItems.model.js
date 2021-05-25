const { NULL } = require("mysql/lib/protocol/constants/types");
const sql = require("./db.js");

//constructor
const CartItems = function(cartitem) {
    this.buyer_id = cartitem.buyer_id;
    this.item_id = cartitem.item_id;
    this.item_name = cartitem.item_name;
    this.item_qty = cartitem.item_qty;
    this.item_category = cartitem.item_category;
    this.unit_price = cartitem.unit_price;
    this.total_price = cartitem.total_price;
};

CartItems.create = (newCartItem, result) => {
    sql.query("INSERT INTO cart_items SET ?", newCartItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created cart Item: ", { id: res.insertId, ...newCartItem });
        result(null, { id: res.insertId, ...newCartItem });
    });
};

CartItems.findById = (cartItemId, result) => {
    sql.query(`SELECT * FROM cart_items WHERE id = ${cartItemId}`, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found cart items: ", res[0]);
            result(null, res[0]);
            return;
        }


        //not found Cart Item with id
        result({ kind: "not_found" }, null);
    });
};

CartItems.getAll = result => {
    sql.query("SELECT * FROM cart_items", (err, res) => {
        if (err) {
            console.log("error: ", res);
            result(null, err);
            return;
        }

        console.log("error: ", res);
        result(null, res);
    });
};

CartItems.updatedById = (id, cartItem, result) => {
    sql.query(
        "UPDATE cart_items SET item_name = ?, item_qty = ?, item_category = ?, unit_price = ?, total_price = ?, total_items = ? WHERE id = ?", [cartItem.item_name, cartItem.item_qty, cartItem.item_category, cartItem.unit_price, cartItem.total_price, cartItem.total_items, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("Updated Cart Items: ", { id: id, ...cartItem });
            result(null, { id: id, ...cartItem });
        }
    );
};

CartItems.remove = (id, result) => {
    sql.query("DELETE FROM cart_items WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Cart Items with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Cart Items with id: ", id);
        result(null, res);
    });
};

CartItems.removeAll = result => {
    sql.query("DELETE FROM cart_items", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} cartitem`);
        result(null, res);
    });
};

module.exports = CartItems;