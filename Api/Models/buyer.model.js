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
            result(err, null);
            return;
        }

        console.log("created buyer: ", {id: res.insertId, ...newBuyer});
        result(null, { id: res.insertId, ...newBuyer});
    });
};

Buyer.findById = (buyerId, result) => {
    sql.query(`SELECT * FROM buyer WHERE id = ${buyerId}`, (err,res) => {
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found buyer: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        
        //not found Buyer with id
        result({ kind: "not_found"}, null);
    });
};

Buyer.getAll = result => {
    sql.query("SELECT * FROM buyer", (err, res) => {
        if (err) {
            console.log("error: ", res);
            result(null,err);
            return;
        }

        console.log("error: ", res);
        result(null, res);
    });
};

Buyer.updatedById = (id, buyer, result) => {
    sql.query(
        "UPDATE buyer SET email = ?, username = ?, password = ?, age = ?, country = ?, address = ?, usertype = ?, mobile_number = ? WHERE id = ?",
        [buyer.email, buyer.username, buyer.password, buyer.age, buyer.country, buyer.address, buyer.usertype, buyer.mobile_number, id],
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }


            console.log("Updated Buyer: ", { id: id, ...buyer});
            result(null, { id: id, ...buyer});
        }
    );
};

Buyer.remove = (id, result) => {
    sql.query("DELETE FROM buyer WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Buyer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted buyer with id: ", id);
      result(null, res);
    });
  };
  
  Buyer.removeAll = result => {
    sql.query("DELETE FROM buyer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} buyer`);
      result(null, res);
    });
  };

module.exports = Buyer;