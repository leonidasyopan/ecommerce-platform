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