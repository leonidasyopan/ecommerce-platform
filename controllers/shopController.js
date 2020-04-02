const shopModel = require("../models/shopModel.js");

function addToCart(req, res) {
  var id = Number(req.query.id);
  console.log("Adding item to cart with id: ", id);

  if(req.session.cart) {
    console.log(req.session.cart);
    req.session.cart.push(id);
    console.log(req.session.cart);
    res.redirect('/');
  } else {
    res.render("pages/login-user");  
  }
}

function organizerCartItems(req, res) {
  console.log("Organizing all items for the Shopping Cart");

    var shoppingList = req.session.cart;
    console.log(shoppingList);

    shopModel.getItemsForCart(shoppingList, function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            res.json(result);
        }    
    });
}


module.exports = {
  addToCart: addToCart,
  organizerCartItems: organizerCartItems
};