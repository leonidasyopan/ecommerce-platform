const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

function getItemsForCart(shoppingList, callback) {
  // console.log("getItemsFromCategory called with id: ", id);

  var sql = "";
  
  if(shoppingList.length > 1) {

    sql = `SELECT * FROM products p INNER JOIN product_category pc ON p.product_category_id = pc.product_category_id WHERE `;

    for(var i=0; i < shoppingList.length - 1; i++) {
      sql += `product_id = ${shoppingList[i]} OR `;
    }    
    
    sql += ` product_id = ${shoppingList[Number(shoppingList.length - 1)]} `;    

    sql += ` ORDER BY p.product_name ASC`;

  } else {

    var sql = `SELECT * FROM products p INNER JOIN product_category pc ON p.product_category_id = pc.product_category_id WHERE product_id = ${shoppingList[0]}`;

  }

  console.log(sql);

  pool.query(sql, function(err, db_results) {
      if(err) {
          console.log("An error with the Database occurred.");
          console.log(err);
          callback(err, null);
      }   else {
      var results = {
          success:true,
          list:db_results.rows
      };

      callback(null, results);

      }
  });

}

module.exports = {
  getItemsForCart: getItemsForCart
};
