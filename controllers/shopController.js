const shopModel = require("../models/shopModel.js");

function addToCart(req, res) {
  var id = Number(req.query.id);
  console.log("Adding item to cart with id: ", id);

  if(req.session.cart) {
    req.session.cart.push(id);
    res.redirect('/');
  } else {
    res.render("pages/login-user");  
  }
}

function removeFromCart(req, res) {
  var id = Number(req.query.id);
  console.log("Adding item to cart with id: ", id);

  var index = req.session.cart.indexOf(id);

  while(index > -1) {
    req.session.cart.splice(index,1);
    index = req.session.cart.indexOf(id);
  }  
    
  console.log(req.session.cart);
  res.redirect('/shopping-cart'); 
  
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
  removeFromCart: removeFromCart,
  organizerCartItems: organizerCartItems
};