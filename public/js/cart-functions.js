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

                if(successMessage.success == true) {
                    // alert("Item added witth success!");
                    console.log("The item's id was: " + successMessage.id);

                    var iconId = `#faI-${successMessage.id}`;

                    var fontAwesome = document.querySelector(iconId);
                    fontAwesome.classList.remove('fa-cart-plus');
                    fontAwesome.classList.add('fa-thumbs-up');

                } else {
                    window.location.href = '/login-user';
                }
                
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

function clearShoppingCartAjax() {
    
    var confirmation = confirm("Are you sure you want to clear ALL items from cart?");
    if (confirmation == true) {
        let ajax = new XMLHttpRequest();
        ajax.open('GET', '/clearShoppingCart');
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4 && ajax.status == 200) {
                try {
                    var successMessage = JSON.parse(ajax.responseText);
                    console.log(successMessage);

                    if(successMessage.success == true) {
                        alert("Shopping cart cleared successfully")    
                        window.location.href = '/';
    
                    } else {
                        alert('Something went wrong, please try again.')
                        window.location.href = '/shopping-cart';
                    }
                    
                }
                catch(err) {
                    console.log(err.message);
                }
            }
        }
        ajax.send();
    
    } else {
        console.log('User chose to cancel cleaning cart.')
    }

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
        output += `<button class="remove-from-cart-button" onclick="removeFromCartAjax(${dataFromDB.list[i].product_id})"><i class="fas fa-trash-alt" id="faIi-${dataFromDB.list[i].product_id}"></i></button>`;        
        output += "</td>";
        output += "</tr>"      
    }

    output += "</tbody></table>"

    return output;

}