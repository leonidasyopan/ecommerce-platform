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
                    
                    // Create a div to hold all the info of the Selected team
                    var output = '';    
                    for (var i=0; i < dataFromDB.list.length; i++){
                        output += '<div class="item-box">';
                        output += "<h2>" + dataFromDB.list[i].product_name + "</h2>";    
                        output += '<figure class="image-item"><img src="' + dataFromDB.list[i].product_image + '" alt="' + dataFromDB.list[i].product_name + ' Thumb"></figure>';
                        output += '<div class="item-data">';
                        output += "<p><strong>Price:</strong> $" + dataFromDB.list[i].product_price + "</p>";
                        output += "<p><strong>Description:</strong> " + dataFromDB.list[i].product_description + "</p>";
                        output += "<p><strong>Items in Stock:</strong> " + dataFromDB.list[i].product_stock + "</p>";                     
                        output += "</div>";
                        output += "</div>";
                    }
    
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
                
                // Create a div to hold all the info of the Selected team
                var output = '';    
                for (var i=0; i < dataFromDB.list.length; i++){
                    output += '<div class="item-box">';
                    output += "<h2>" + dataFromDB.list[i].product_name + "</h2>";    
                    output += '<figure class="image-item"><img src="' + dataFromDB.list[i].product_image + '" alt="' + dataFromDB.list[i].product_name + ' Thumb"></figure>';
                    output += '<div class="item-data">';
                    output += "<p><strong>Price:</strong> $" + dataFromDB.list[i].product_price + "</p>";
                    output += "<p><strong>Description:</strong> " + dataFromDB.list[i].product_description + "</p>";
                    output += "<p><strong>Items in Stock:</strong> " + dataFromDB.list[i].product_stock + "</p>";                     
                    output += "</div>";
                    output += "</div>";
                }

                document.getElementById("itemDetails").innerHTML = output;
            }
            catch(err) {
                console.log(err.message);
            }
        }
    }
    ajax.send();
}

let getItemButton = document.querySelector("#getItemButton");

getItemButton.addEventListener("click", searchItemByName);

