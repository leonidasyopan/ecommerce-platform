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

function buildCartList(dataFromDB) {
  var output = '<table class="shopping-cart-table"><thead><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th><th>Remove Item</th></tr></thead><tbody>';            
  
  for (var i=0; i < dataFromDB.list.length; i++){        
      
      var price = Number(dataFromDB.list[i].product_price);

      output += "<tr>"
      output += `<td>${dataFromDB.list[i].product_name}</td>`;
      output += `<td headers="Item${i}">1</td>`;
      output += `<td>${price}</td>`;
      output += `<td>${price * 1}</td>`;
      output += "<td>";
      output += `<form action="/removeFromCart?id=${dataFromDB.list[i].product_id}" method="POST">`;
      output += `<input type="hidden" name="id" value="${dataFromDB.list[i].product_id}" />`;
      output += `<button type="submit" class="remove-from-cart-button"><i class="fas fa-trash-alt"></i></button>`;
      output += `</form>`;
      output += "</td>";
      output += "</tr>"      
  }
  
  output += "</tbody></table>"

  return output;

}