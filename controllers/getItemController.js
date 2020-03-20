const getItemModel = require("../models/getItemModel.js");

function getItems(req, res) {
    console.log("Getting items details.");

    var id = req.query.id;
    console.log("Retrieving items with category: ", id);

    getItemModel.getItemsFromCategory(id, function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            // res.json(result[0]);
            res.json(result);
        }

        // console.log("Back from the getItemsFromCategory function with result: ", result)        
    });
}

function searchItems(req, res) {
    console.log("Searching items details.");

    var item = req.query.item;
    console.log("Retrieving items with category: ", item);

    getItemModel.searchItemsByName(item, function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            // res.json(result[0]);
            res.json(result);
        }

        // console.log("Back from the getItemsFromCategory function with result: ", result)        
    });
}

module.exports = {
    getItems: getItems,
    searchItems: searchItems
};