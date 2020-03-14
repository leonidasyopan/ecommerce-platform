const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://qveewngkmiyqfr:4bebd5ed9f3c3b3dc2a43a59d29ab243926a9c665239de335972708f31e35c0c@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d9hii928sbb5pv?ssl=true";

const pool = new Pool({connectionString: connectionString});

app.set("port", PORT);

// app.get("/getItems", getItems);
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/getItems', (request, response) => {

    if (request.query.id) {
        var id = request.query.id;

        getItems(id, function(err, result) {

                response.end(JSON.stringify(result))

            })

        
    } else {
        response.render("pages/getItems");
    }

})

app.listen(app.get("port"), function() {
    console.log("Now listening for connection on port: ", app.get("port"));
});

function getItems(req, res) {
    console.log("Getting items details.");

    var id = req.query.id;
    console.log("Retrieving items with category: ", id);

    getItemsFromCategory(id, function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            // res.json(result[0]);
            res.json(result);
        }

        // console.log("Back from the getItemsFromCategory function with result: ", result)        
    });
}

function getItemsFromCategory(id, callback) {
    console.log("getItemsFromCategory called with id: ", id);

    var sql = "SELECT * FROM products p INNER JOIN product_category pc ON p.product_category_id = pc.product_category_id WHERE pc.category_name =  $1";
    var param = [id];

    pool.query(sql, param, function(err, result) {
        if(err) {
            console.log("An error with the Database occurred.");
            console.log(err);
            callback(err, null);
        }

        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
    });

}