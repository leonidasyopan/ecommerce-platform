const express = require('express');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
var app = express();

const getItemController = require("./controllers/getItemController.js")

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

app.get("/getItems", getItemController.getItems);
app.get("/searchItems", getItemController.searchItems);

app.listen(app.get("port"), function() {
    console.log("Now listening for connection on port: ", app.get("port"));
});