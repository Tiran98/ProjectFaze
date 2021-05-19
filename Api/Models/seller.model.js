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
            result(err, null);
            return;
        }

        console.log("created seller: ", {is: res.insertId, ...newSeller});
        result(null, { is: res.insertId, ...newSeller});
    });
};

Seller.findById = (sellerId, result) => {
    sql.query(`SELECT * FROM seller WHERE id = ${sellerId}`, (err,res) => {
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found seller: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        
        //not found Seller with id
        result({ kind: "not_found"}, null);
    });
};

Seller.getAll = result => {
    sql.query("SELECT * FROM seller", (err, res) => {
        if (err) {
            console.log("error: ", res);
            result(null,err);
            return;
        }

        console.log("error: ", res);
        result(null, res);
    });
};

Seller.updatedById = (id, seller, result) => {
    sql.query(
        "UPDATE seller SET email = ?, username = ?, password = ?, age = ?, country = ?, address = ?, usertype = ?, mobile_number = ?, company_name = ? WHERE id = ?",
        [seller.email, seller.username, seller.password, seller.age, seller.country, seller.address, seller.usertype, seller.mobile_number, seller.company_name, id],
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }


            console.log("Updated seller: ", { id: id, ...seller});
            result(null, { id: id, ...seller});
        }
    );
};

Seller.remove = (id, result) => {
    sql.query("DELETE FROM seller WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Seller with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted seller with id: ", id);
      result(null, res);
    });
};
  
Seller.removeAll = result => {
    sql.query("DELETE FROM seller", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} seller`);
      result(null, res);
    });
};

module.exports = Seller;