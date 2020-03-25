const express = require('express');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
var app = express();

const getItemController = require("./controllers/getItemController.js")
const productController = require("./controllers/productController.js")
const userController = require("./controllers/userController.js")

app.set("port", PORT);

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json()); // support JSON encoded bodies
app.use(express.urlencoded({extended: true})); // support URL encoded bodies

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// app.get('/', (req, res) => res.render('pages/index'))
app.get('/', (request, response) => {
    // response.render("pages/getItems");    
    response.render("pages/index");    
})
app.get('/manage-products', (request, response) => {
    response.render("pages/manage-products");    
})

app.get('/register-user', (request, response) => {
    response.render("pages/register-user");    
})

app.post("/register", userController.handleRegister);

app.get("/getItems", getItemController.getItems);
app.get("/searchItems", getItemController.searchItems);
app.post("/addProduct", productController.addProduct);

app.listen(app.get("port"), function() {
    console.log("Now listening for connection on port: ", app.get("port"));
});