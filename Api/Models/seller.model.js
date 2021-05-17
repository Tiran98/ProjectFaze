const sql = require("./db.js");

//constructor
const Seller = function(seller){
    this.username = seller.username;
    this.email = seller.email;
    this.password = seller.password;
    this.age = seller.age;
    this.country = seller.country;
    this.address = seller.address;
    this.usertype = seller.usertype;
    this.mobile_number = seller.mobile_number;
    this.company_name = seller.company_name;
};

Seller.create = (newSeller, result) => {
    sql.query("INSERT INTO seller SET ?", newSeller, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, NULL);
            return;
        }

        console.log("created seller: ", {is: res.insertId, ...newSeller});
        result(NULL, { is: res.insertId, ...newSeller});
    });
};

Seller.findById = (sellerId, result) => {
    sql.query(`SELECT * FROM seller WHERE id = ${sellerId}`, (err,res) => {
        if(err){
            console.log("error", err);
            result(err, NULL);
            return;
        }
        if(res.length){
            console.log("found seller: ", res[0]);
            result(NULL, res[0]);
            return;
        }
        
        
        //not found Seller with id
        result({ kind: "not_found"}, NULL);
    });
};

Seller.getAll = result => {
    sql.query("SELECT * FROM seller", (err, res) => {
        if (err) {
            console.log("error: ", res);
            result(NULL,err);
            return;
        }

        console.log("error: ", res);
        result(null, res);
    });
};

Seller.updatedById = (id, seller, result) => {
    sql.query(
        "UPDATE seller SET email = ?, name = ? WHERE id = ?",
        [seller.email, seller.name, id],
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(NULL, err);
                return;
            }


            console.log("Updated seller: ", { id: id, ...seller});
            result(NULL, { id: id, ...seller});
        }
    );
};

Seller.remove = (id, result) => {
    sql.query("DELETE FROM seller WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(NULL, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Seller with the id
        result({ kind: "not_found" }, NULL);
        return;
      }
  
      console.log("deleted seller with id: ", id);
      result(NULL, res);
    });
};
  
Seller.removeAll = result => {
    sql.query("DELETE FROM seller", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(NULL, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} seller`);
      result(NULL, res);
    });
};

module.exports = Seller;