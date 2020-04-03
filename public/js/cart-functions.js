function loadCartItems() {
    let ajax = new XMLHttpRequest();
    ajax.open('GET', '/loadCartItems');
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status == 200) {
            try {
                var dataFromDB = JSON.parse(ajax.responseText);
                // localStorage.setItem('itemsInStock', JSON.stringify(dataFromDB.list));    

                var output = buildCartList(dataFromDB);

                document.getElementById("cartList").innerHTML = output;
            }
            catch(err) {
                console.log(err.message);
            }
        }
    }
    ajax.send();
}

function addToCartAjax(id) {    
    let ajax = new XMLHttpRequest();
    ajax.open('GET', '/addToCart?id=' + id);
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status == 200) {
            try {
                var successMessage = JSON.parse(ajax.responseText);

                alert("Item added with success")
                
            }
            catch(err) {
                console.log(err.message);
            }
        }
    }
    ajax.send();
}

function removeFromCartAjax(id) {
    console.log("Entered removeFromCartAjax function with id " + id);
    let ajax = new XMLHttpRequest();
    ajax.open('GET', '/removeFromCart?id=' + id);
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status == 200) {
            try {
                var successMessage = JSON.parse(ajax.responseText);
                console.log(successMessage);

                alert("Item removed successfully")

                location.reload();
                return false;
                
            }
            catch(err) {
                console.log(err.message);
            }
        }
    }
    ajax.send();
}


function buildCartList(dataFromDB) {
    var output = '<table class="shopping-cart-table"><thead><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th><th>Remove Item</th></tr></thead><tbody>';            

    for (var i=0; i < dataFromDB.list.length; i++){        
        
        var price = Number(dataFromDB.list[i].product_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        output += "<tr>"
        output += `<td>${dataFromDB.list[i].product_name}</td>`;
        output += `<td><input type="number" id="quantity_product_${dataFromDB.list[i].product_id}" name="quantity" class="quantity" value="1" min="1"></td>`;
        output += `<td>$ ${price}</td>`;
        output += `<td>$ ${Number(price * 1).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>`;
        output += "<td>";
        /*
        output += `<form action="/removeFromCart?id=${dataFromDB.list[i].product_id}" method="POST">`;
        output += `<input type="hidden" name="id" value="${dataFromDB.list[i].product_id}" />`;
        */
        output += `<button class="remove-from-cart-button" onclick="removeFromCartAjax(${dataFromDB.list[i].product_id})"><i class="fas fa-trash-alt"></i></button>`;
        // output += `</form>`;
        output += "</td>";
        output += "</tr>"      
    }

    output += "</tbody></table>"

    return output;

}