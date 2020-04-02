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