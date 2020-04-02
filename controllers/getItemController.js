const getItemModel = require("../models/getItemModel.js");

function getItems(req, res) {
    console.log("Getting items details.");

    var id = req.query.id;
    console.log("Retrieving items with category: ", id);

    getItemModel.getItemsFromCategory(id, function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            res.json(result);
        }
    });
}

function getAllItems(req, res) {
    console.log("Getting all items");

    getItemModel.getAllItemsFromDb(function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            res.json(result);
        }    
    });
}

function searchItems(req, res) {
    console.log("Searching items details.");

    var item = req.query.item;
    console.log("Retrieving item called: ", item);

    getItemModel.searchItemsByName(item, function(error, result) {

        if(error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            res.json(result);
        }       
    });
}

module.exports = {
    getItems: getItems,
    getAllItems: getAllItems,
    searchItems: searchItems
};