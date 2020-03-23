const productModel = require("../models/productModel.js");

function addProduct(req, res) {
    // console.log("Inside addProduct function");    

    var product_category_id = req.body.product_category_name;
    // console.log(product_category_id);

    var product_name = req.body.product_name;
    // console.log(product_name);
    var product_price = Number(req.body.product_price);
    // console.log(product_price);
    var product_description = req.body.product_description;
    // console.log(product_description);
    var product_image = req.body.product_image;    
    // console.log(product_image);
    var product_stock = req.body.product_stock;    
    // console.log(product_stock);

    productModel.addProductToDB(product_name, product_price, product_description, product_image,product_category_id,product_stock, function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            

            // var output = 'You added ' + product_name + 'successfully to the Database.';  

            // document.getElementById("product-added-success").innerHTML = output;

            // res.json(result);

            res.send('<h2> The ' + product_name + ' was added to the database.</h2>')
    
        }

    });
}

module.exports = {
    addProduct: addProduct
};