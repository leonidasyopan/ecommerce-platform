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

function getAllItemsFromDb(callback) {
    // console.log("getItemsFromCategory called with id: ", id);

    var sql = "SELECT * FROM products p INNER JOIN product_category pc ON p.product_category_id = pc.product_category_id ORDER BY p.product_name ASC";
    // var param = [id];

    pool.query(sql, function(err, db_results) {
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
    console.log("searchItemsByName function called with item: ", item);

    var sql = "SELECT * FROM products p INNER JOIN product_category pc ON p.product_category_id = pc.product_category_id WHERE UPPER(p.product_name) LIKE UPPER('%" + item + "%')";
    // var param = [item];

    pool.query(sql, function(err, db_results) {
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
    getAllItemsFromDb: getAllItemsFromDb,
    searchItemsByName: searchItemsByName
};