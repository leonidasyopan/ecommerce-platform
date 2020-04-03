const productModel = require("../models/productModel.js");

function addProduct(req, res) {

    var product_category_id = req.body.product_category_name;
    var product_name = req.body.product_name;
    var product_price = Number(req.body.product_price);    
    var product_description = req.body.product_description;
    var product_image = req.body.product_image;
    var product_stock = req.body.product_stock;

    productModel.addProductToDB(product_name, product_price, product_description, product_image,product_category_id,product_stock, function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {

            res.json({message: "Product added with success. Thank you for your contribution."});
            res.end();
        }

    });
}

module.exports = {
    addProduct: addProduct
};