const express = require('express');
const path = require('path');
require('dotenv').config();

// IMPORTING SESSION STUFF
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const PORT = process.env.PORT || 5000;
var app = express();

// IMPORTING ALL CONTROLLERS
const getItemController = require("./controllers/getItemController.js")
const productController = require("./controllers/productController.js")
const userController = require("./controllers/userController.js")

app.set("port", PORT);

app.use(express.static(path.join(__dirname, 'public')))

// Body parser middleware to use post values
app.use(express.json()); // support JSON encoded bodies
app.use(express.urlencoded({extended: true})); // support URL encoded bodies

// USE SESSION
app.use(session({
    name: 'delicious-cookie-id',
    secret: 'some important secret',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Setup our routes
app.post('/login', userController.handleLogin);

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

app.get('/login-user', (request, response) => {
    response.render("pages/login-user");    
})

app.post("/register", userController.handleRegister);

app.get("/getItems", getItemController.getItems);
app.get("/searchItems", getItemController.searchItems);
app.post("/addProduct", productController.addProduct);

app.listen(app.get("port"), function() {
    console.log("Now listening for connection on port: ", app.get("port"));
});