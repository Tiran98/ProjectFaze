const { NULL } = require("mysql/lib/protocol/constants/types");
const sql = require("./db.js");

//constructor
const Buyer = function(buyer){
    this.username = buyer.username;
    this.email = buyer.email;
    this.password = buyer.password;
    this.age = buyer.age;
    this.country = buyer.country;
    this.address = buyer.address;
    this.usertype = buyer.usertype;
    this.mobile_number = buyer.mobile_number;
};

Buyer.create = (newBuyer, result) => {
    sql.query("INSERT INTO buyer SET ?", newBuyer, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, NULL);
            return;
        }

        console.log("created buyer: ", {is: res.insertId, ...newBuyer});
        result(NULL, { is: res.insertId, ...newBuyer});
    });
};

Buyer.findById = (buyerId, result) => {
    sql.query(`SELECT * FROM buyer WHERE id = ${buyerId}`, (err,res) => {
        if(err){
            console.log("error", err);
            result(err, NULL);
            return;
        }
        if(res.length){
            console.log("found buyer: ", res[0]);
            result(NULL, res[0]);
            return;
        }
        
        
        //not found Buyer with id
        result({ kind: "not_found"}, NULL);
    });
};

Buyer.getAll = result => {
    sql.query("SELECT * FROM buyer", (err, res) => {
        if (err) {
            console.log("error: ", res);
            result(NULL,err);
            return;
        }

        console.log("error: ", res);
        result(null, res);
    });
};

Buyer.updatedById = (id, buyer, result) => {
    sql.query(
        "UPDATE buyer SET email = ?, name = ? WHERE id = ?",
        [buyer.email, buyer.name, id],
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(NULL, err);
                return;
            }


            console.log("Updated Buyer: ", { id: id, ...buyer});
            result(NULL, { id: id, ...buyer});
        }
    );
};

Buyer.remove = (id, result) => {
    sql.query("DELETE FROM buyer WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(NULL, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Buyer with the id
        result({ kind: "not_found" }, NULL);
        return;
      }
  
      console.log("deleted buyer with id: ", id);
      result(NULL, res);
    });
  };
  
  Buyer.removeAll = result => {
    sql.query("DELETE FROM buyer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(NULL, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} buyer`);
      result(NULL, res);
    });
  };

module.exports = Buyer;