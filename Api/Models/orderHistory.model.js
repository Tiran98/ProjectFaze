const { NULL } = require("mysql/lib/protocol/constants/types");
const sql = require("./db.js");

const OrderHistory = function(orderHistory){
    this.buyer_id = orderHistory.buyer_id;
    this.seller_id = orderHistory.seller_id;
    this.item_id = orderHistory.item_id;
    this.buyer_firstName =orderHistory.buyer_firstName;
    this.buyer_lastName = orderHistory.buyer_lastName;
    this.country = orderHistory.country;
    this.item_name = orderHistory.item_id;
    this.item_qty = orderHistory.item_qty;
    this.item_category = orderHistory.item_category;
    this.unit_price = orderHistory.unit_price;
    this.total_price = orderHistory.total_price;
    this.final_cost = orderHistory.final_cost;
    this.total_items = orderHistory.total_items;
    this.payment_method = orderHistory.payment_method;
    this.order_ref = orderHistory.order_ref;
};

OrderHistory.create = (neworderHistory, result) => {
    sql.query("INSERT INTO order_history SET ?", neworderHistory, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created order Histor: ", {id: res.insertid, ...neworderHistory});
        result(null, {id: res.insertid, ...neworderHistory});
    });
};

OrderHistory.findById = (orderHistoryId, result) => {
    sql.query(`SELECT * FROM order_history WHERE id = ${orderHistoryId}`, (err,res) => {
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found order History: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        
        //not found Order History with id
        result({ kind: "not_found"}, null);
    });
};

OrderHistory.getAll = result => {
    sql.query("SELECT * FROM order_history", (err, res) => {
        if (err) {
            console.log("error: ", res);
            result(null,err);
            return;
        }

        console.log("error: ", res);
        result(null, res);
    });
};

OrderHistory.updatedById = (id, orderHistory, result) => {
    sql.query(
        "UPDATE order_history SET buyer_id = ?, seller_id = ?, item_id = ?, item_name = ?, item_qty = ?, item_category = ?, unit_price = ?, total_price = ? WHERE id = ?",
        [orderHistory.buyer_id, orderHistory.seller_id, orderHistory.item_id, orderHistory.item_name, orderHistory.item_qty, orderHistory.item_category, orderHistory.unit_price, orderHistory.total_price, id],
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }


            console.log("Updated Order History: ", { id: id, ...orderHistory});
            result(null, { id: id, ...orderHistory});
        }
    );
};

OrderHistory.remove = (id, result) => {
    sql.query("DELETE FROM order_history WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found order History with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted order_history with id: ", id);
      result(null, res);
    });
  };
  
OrderHistory.removeAll = result => {
    sql.query("DELETE FROM order_history", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} order History`);
      result(null, res);
    });
};

module.exports = OrderHistory;