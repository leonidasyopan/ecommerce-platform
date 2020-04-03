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

function clearShoppingCart(req, res) {
  console.log(`Item's in cart BEFORE cleaning: ${req.session.cart}`)
  req.session.cart = [] 
  console.log(`Item's in cart AFTER cleaning: ${req.session.cart}`)
    
  if(!req.session.cart.length) {
    console.log(`within success`)
    res.json({success: true});
    res.end();
  } else {
    console.log(`within failure`)
    res.json({success: false});
    res.end();
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
  removeFromCart: removeFromCart,
  clearShoppingCart: clearShoppingCart,
  organizerCartItems: organizerCartItems
};