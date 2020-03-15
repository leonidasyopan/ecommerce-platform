function getItems() {
    console.log("in function");
    let id = document.getElementById("item").value;
    console.log(id);
    let ajax = new XMLHttpRequest();
    ajax.open('GET', '/getItems?id=' + id);
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status == 200) {
            try {
                var data = JSON.parse(ajax.responseText);
            }
            catch(err) {
                console.log(err.message);
            }

            console.log(JSON.stringify(data));

            let beforeStorageDate = JSON.stringify(data);

            console.log(beforeStorageDate);
            
            localStorage.setItem("currentListOfItems", beforeStorageDate);

            /*
            var afterStorageDate = JSON.parse(localStorage.getItem("currentListOfItems")); 

            console.log(afterStorageDate);

            return afterStorageDate;
            */
        }
    }
    ajax.send();
}

function buildHTMLDisplay() {    

    console.log("Entered buildHTMLDisplay function");
    
    var dataFromDB = JSON.parse(localStorage.getItem("currentListOfItems"));  

    console.log(dataFromDB);

    /* Create a div to hold all the info of the Selected team */
    var output = '';    
    for (var i=0; i < dataFromDB.length; i++){
        output += '<div class="item-box">';
        output += "<h2>" + dataFromDB[i].product_name + "</h2>";    
        output += '<figure class="image-item"><img src="' + dataFromDB[i].product_image + '" alt="' + dataFromDB[i].product_name + ' Thumb"></figure>';
        output += '<div class="item-data">';
        output += "<p><strong>Price:</strong> " + dataFromDB[i].product_price + "</p>";
        output += "<p><strong>Description:</strong> " + dataFromDB[i].product_description + "</p>";
        output += "<p><strong>Items in Stock:</strong> " + dataFromDB[i].product_stock + "</p>";                     
        output += "</div>";
        output += "</div>";
    }

    document.getElementById("itemDetails").innerHTML = output;

    
}

let getItemButton = document.querySelector("#getItemButton");

getItemButton.addEventListener("click", getItems);
getItemButton.addEventListener("click", buildHTMLDisplay);