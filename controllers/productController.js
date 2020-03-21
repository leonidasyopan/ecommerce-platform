const productModel = require("../models/productModel.js");

function addProduct(req, res) {
    console.log("Inside addProduct function");

    var product_category_name = req.query.product_category_name;
    var product_category_id = "";

    switch(product_category_name) {
        case book:
            var product_category_id = 1;
            break;
        case dvd:
            var product_category_id = 2;
            break;
        case smartphone:
            var product_category_id = 3;
            break;
        case tablet:
            var product_category_id = 4;
            break;
        case laptop:
            var product_category_id = 5;
            break;
        case boardgame:
            var product_category_id = 7;
            break;
    }

    var product_name = req.query.product_name;
    var product_price = Number(req.query.product_price);
    var product_description = req.query.product_description;
    var product_image = req.query.product_image;    
    var product_stock = req.query.product_stock;    

    productModel.addProductToDB(product_name, product_price, product_description, product_image,product_category_id,product_stock, function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            // res.json(result[0]);
            res.json(result);
        }

    });
}

module.exports = {
    addProduct: addProduct
};