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

module.exports = {
  addToCart: addToCart
};