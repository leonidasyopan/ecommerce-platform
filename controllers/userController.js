const productModel = require("../models/userModel.js");
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function handleRegister(request, response) {
    const email = request.body.email;
    const username = request.body.username;
	const password = request.body.password;

	bcrypt.hash(password, saltRounds, function(err, hash){
		productModel.createUser(username, hash, email, function(error, data) {
			if(error) {
				console.log(error);
			} else {            
				// response.json(data);
				console.log(`An account has been successfully created for the username: ${username}`);
				response.redirect("/login-user");
			}
		});
	});
}

function handleLogin(request, response) {
	const username = request.body.username;
	const password = request.body.password; 
	
	console.log(username, password);

	productModel.loginUser(username, password, function(error, data) {
		if(error) {
			console.log('Back to controller with error');
			
		} else {
			console.log('Back to controller with Success')
			request.session.username = username;
			response.redirect("/");
		}
	});
}


module.exports = {
    handleRegister: handleRegister,
    handleLogin: handleLogin
};