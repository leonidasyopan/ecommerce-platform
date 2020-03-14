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

            document.getElementById("itemDetails").innerHTML = JSON.stringify(data);
        }
    }
    ajax.send();
}

/* function getItems() {
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
        }
    }
    ajax.send();

    buildHTMLDisplay();
}

function buildHTMLDisplay() {

    console.log("Entered buildHTMLDisplay function.")

    getItems(); 
    
    console.log(jsonData);
    
    /* Create a div to hold all the info of the Selected team 
    var output = '';    
    output += "<h2>" + jsonData[1].product_name + "</h2>";    
    output += '<figure class="image-item"><img src="' + jsonData.product_image + '" alt="' + jsonData[1].product_name + ' Thumb"></figure>';
    output += '<div id="item-data">';
    output += "<p><strong>Price:</strong> " + jsonData[1].product_price + "</p>";
    output += "<p><strong>Description:</strong> " + jsonData[1].product_description + "</p>";
    output += "<p><strong>Items in Stock:</strong> " + jsonData[1].product_stock + "</p>";                     
    output += "</div>";

    document.getElementById("itemDetails").innerHTML = jsonData;
    
}

*/