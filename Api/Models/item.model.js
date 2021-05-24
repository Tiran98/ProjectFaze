const { NULL } = require("mysql/lib/protocol/constants/types");
const sql = require("./db.js");

//constructor
const Item = function(item){
    this.seller_id = item.seller_id;
    this.item_name = item.item_name;
    this.item_stock = item.item_stock;
    this.item_category = item.item_category;
    this.unit_price = item.unit_price;
    this.item_description = item.item_description;
    this.item_image = item.item_image;
};

Item.create = (newItem, result) => {
    sql.query("INSERT INTO items SET ?", newItem, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created item: ", {id: res.insertId, ...newItem});
        result(null, { id: res.insertId, ...newItem});
    });
};

Item.findById = (itemId, result) => {
    sql.query(`SELECT * FROM items WHERE id = ${itemId}`, (err,res) => {
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found item: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        
        //not found Item with id
        result({ kind: "not_found"}, null);
    });
};

Item.findByName = (itemName, result) => {
    sql.query(`SELECT * FROM items WHERE item_name = '${itemName}'`, (err,res) => {
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found item: ", res);
            result(null, res);
            return;
        }
        
        
        //not found Item with name
        result({ kind: "not_found"}, null);
    });
};

Item.getAll = result => {
    sql.query("SELECT * FROM items", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null,err);
            return;
        }

        console.log("data: ", res);
        result(null, res);
    });
};

Item.updatedById = (id, item, result) => {
    sql.query(
        "UPDATE items SET item_name = ?, item_stock = ?, item_category = ?, unit_price = ?, item_description = ?, item_image = ? WHERE id = ?",
        [item.item_name, item.item_stock, item.item_category, item.unit_price, item.item_description, item.item_image, id],
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }


            console.log("Updated Item: ", { id: id, ...item});
            result(null, { id: id, ...item});
        }
    );
};

Item.remove = (id, result) => {
    sql.query("DELETE FROM items WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Item with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted item with id: ", id);
      result(null, res);
    });
};
  
Item.removeAll = result => {
    sql.query("DELETE FROM items", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} items`);
      result(null, res);
    });
};

module.exports = Item;