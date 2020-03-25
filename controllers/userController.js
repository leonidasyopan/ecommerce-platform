const productModel = require("../models/userModel.js");

function handleRegister(request, response) {
    const email = request.body.email;
    const username = request.body.username;
    const password = request.body.password;    

    console.log(`Registering new user: ${username}:${password}:${email}`);

    productModel.createUser(username, password, email, function(error, data) {

        if(error) {
            console.log(error);
        } else {            
            // response.json(data);
            response.redirect("account.html");
        }
    });
}

module.exports = {
    handleRegister: handleRegister
};