function searchItemByName() {
    
    let item = document.getElementById("item").value;

    if(item.length == 0) {
        document.getElementById("itemDetails").innerHTML = '<p class="warning-message">Please search for an item by name!</p>'
    } else {

        let ajax = new XMLHttpRequest();
        ajax.open('GET', '/searchItems?item=' + item);
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4 && ajax.status == 200) {
                try {
                    var dataFromDB = JSON.parse(ajax.responseText); 

                    var output = buildItemList(dataFromDB);
    
                    document.getElementById("itemDetails").innerHTML = output;
                }
                catch(err) {
                    console.log(err.message);
                }
            }
        }
        ajax.send();

    }
}

function getItemOfMenus(id) {
    let ajax = new XMLHttpRequest();
    ajax.open('GET', '/getItems?id=' + id);
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status == 200) {
            try {
                var dataFromDB = JSON.parse(ajax.responseText);   

                var output = buildItemList(dataFromDB);
    
                document.getElementById("itemDetails").innerHTML = output;
            }
            catch(err) {
                console.log(err.message);
            }
        }
    }
    ajax.send();
}

function loadAllItems() {
    let ajax = new XMLHttpRequest();
    ajax.open('GET', '/getAllItems');
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status == 200) {
            try {
                var dataFromDB = JSON.parse(ajax.responseText);    

                var output = buildItemList(dataFromDB);
    
                document.getElementById("itemDetails").innerHTML = output;
            }
            catch(err) {
                console.log(err.message);
            }
        }
    }
    ajax.send();
}

function buildItemList(dataFromDB) {
    var output = '';    
    for (var i=0; i < dataFromDB.list.length; i++){
        var category_name_db = dataFromDB.list[i].category_name;
        console.log(category_name_db)
        var category_name = "DVD";

        switch(category_name_db) {
            case 'dvd':
                category_name = "DVD";
                break;
            case 'book':
                category_name = "Book";
                break;
            case 'boardgame':
                category_name = "Boardgame";
                break;
            default:
                category_name = "Smartphone";
        }   
        
        var price = Number(dataFromDB.list[i].product_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

        output += '<div class="item-box">';
        output += "<h2>" + dataFromDB.list[i].product_name + "</h2>";    
        output += '<figure class="image-item"><img src="' + dataFromDB.list[i].product_image + '" alt="' + dataFromDB.list[i].product_name + ' Thumb"></figure>';
        output += '<div class="item-price-cart">';
        output += "<p><strong>Price:</strong> $ " + price + "</p>";
        output += `<form action="/addToCart?id=${dataFromDB.list[i].product_id}" method="POST">`;
        output += `<input type="hidden" name="id" value="${dataFromDB.list[i].product_id}" />`;
        output += `<button type="submit" class="add-to-cart-button"><i class="fas fa-cart-plus fa-2x"></i></button>`;
        output += `</form>`;
        output += "</div>";
        output += '<div class="item-data">';        
        output += "<p><strong>Description:</strong> " + dataFromDB.list[i].product_description + "</p>";
        output += "<p><strong>Category:</strong> " + category_name + "</p>";
        output += "<p><strong>Items in Stock:</strong> " + dataFromDB.list[i].product_stock + "</p>";
        output += "</div>";
        output += "</div>";
    }

    return output;

}


let getItemButton = document.querySelector("#getItemButton");
