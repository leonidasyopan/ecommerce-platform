const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

function getItemsFromCategory(id, callback) {
    console.log("getItemsFromCategory called with id: ", id);

    var sql = "SELECT * FROM products p INNER JOIN product_category pc ON p.product_category_id = pc.product_category_id WHERE pc.category_name =  $1";
    var param = [id];

    pool.query(sql, param, function(err, db_results) {
        if(err) {
            console.log("An error with the Database occurred.");
            console.log(err);
            callback(err, null);
        }   else {
        // console.log("Found DB result: " + JSON.stringify(result.rows));

        var results = {
            success:true,
            list:db_results.rows
        };

        callback(null, results);

        }
    });

}

function searchItemsByName(item, callback) {
    console.log("getItemsFromCategory called with id: ", item);

    var sql = "SELECT * FROM products p INNER JOIN product_category pc ON p.product_category_id = pc.product_category_id WHERE p.product_name LIKE '%$1%'";
    var param = [item];

    pool.query(sql, param, function(err, db_results) {
        if(err) {
            console.log("An error with the Database occurred.");
            console.log(err);
            callback(err, null);
        }   else {
        // console.log("Found DB result: " + JSON.stringify(result.rows));

        var results = {
            success:true,
            list:db_results.rows
        };

        callback(null, results);

        }
    });

}

module.exports = {
    getItemsFromCategory: getItemsFromCategory,
    searchItemsByName: searchItemsByName
};