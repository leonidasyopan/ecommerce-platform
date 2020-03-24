const productModel = require("../models/userModel.js");

function handleRegister(request, response) {
    const username = request.body.username;
    const password = request.body.password;

    console.log(`Registering new user: ${username}:${password}`);

    createUser(username, password, function(error, data) {
        response.redirect("home.html");
    });
}

module.exports = {
    handleRegister: handleRegister
};