const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

function addProductToDB(product_name, product_price, product_description, product_image, product_category_id, product_stock, callback) {
    console.log("addProductToDB called with new product: ", product_name);

    var sql = "INSERT INTO products (product_name, product_price, product_description, product_image, product_category_id, product_stock) VALUES ($1, $2, $3, $4, $5, $6)";
    var param = [product_name, product_price, product_description, product_image,product_category_id,product_stock];

    pool.query(sql, param, function(err, db_results) {
        if(err) {
            console.log("An error with the Database occurred.");
            console.log(err);
            callback(err, null);
        }   else {
        // console.log("Found DB result: " + JSON.stringify(result.rows));

        var results = {
            success:true,
            scripture:{product_name:product_name, product_price:product_price, product_description:product_description, product_image:product_image,product_category_id:product_category_id, product_stock:product_stock}
        };

        callback(null, results);

        }
    });

}

module.exports = {
    addProductToDB: addProductToDB
};