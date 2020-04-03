const shopModel = require("../models/shopModel.js");

function addToCart(req, res) {
  var id = Number(req.query.id);

  if(req.session.cart) {
    req.session.cart.push(id);
    // res.redirect('/');
    res.json({success: true, id: id});
    res.end();
  } else {
    res.json({success: false, id: id});
    res.end(); 
  }
}

function removeFromCart(req, res) {
  var id = Number(req.query.id);
  console.log('removeFromCart function with id: ' + id)

  var index = req.session.cart.indexOf(id);

  while(index > -1) {
    req.session.cart.splice(index,1);
    index = req.session.cart.indexOf(id);
  }  
    
  res.json({success: true});
  res.end();
  // res.redirect('/shopping-cart'); 
  
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