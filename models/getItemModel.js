const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://qveewngkmiyqfr:4bebd5ed9f3c3b3dc2a43a59d29ab243926a9c665239de335972708f31e35c0c@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d9hii928sbb5pv?ssl=true";

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