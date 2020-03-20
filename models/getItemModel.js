const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

function getItemsFromCategory(id, callback) {
    console.log("getItemsFromCategory called with id: ", id);

    var sql = "SELECT * FROM products p INNER JOIN product_category pc ON p.product_category_id = pc.product_category_id WHERE pc.category_name =  $1";
    var param = [id];

    pool.query(sql, param, function(err, result) {
        if(err) {
            console.log("An error with the Database occurred.");
            console.log(err);
            callback(err, null);
        }

        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
    });

}

module.exports = {
    getItemsFromCategory: getItemsFromCategory
};