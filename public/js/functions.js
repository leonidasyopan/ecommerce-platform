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

/*
*   LOGIN FUNCTIONS
*/

function login() {
	var username = $("#username").val();
	var password = $("#password").val();

	var params = {
		username: username,
		password: password
	};

	$.post("/login", params, function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged in.");
		} else {
			$("#status").text("Error logging in.");
		}
	});
}

function logout() {
	$.post("/logout", function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out.");
		}
	});
}

function getServerTime() {
	$.get("/getServerTime", function(result) {
		if (result && result.success) {
			$("#status").text("Server time: " + result.time);
		} else {
			$("#status").text("Got a result back, but it wasn't a success. Your reponse should have had a 401 status code.");
		}
	}).fail(function(result) {
		$("#status").text("Could not get server time.");
	});
}


