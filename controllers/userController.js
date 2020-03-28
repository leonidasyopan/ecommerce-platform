const productModel = require("../models/userModel.js");
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
	var username = req.body.username;
	var password = req.body.password;

	bcrypt.hash(password, 10).then(function(hash) {
		console.log(hash)
	});

	console.log(username);
	console.log(password);        

	let sql = "SELECT * from user_access WHERE username = '" + username + "'";

	sqlQuery(sql, function (err, response){

		if(err) {
			console.error(err);
		}
		console.log()
		console.log(response[0]);
		if(response.length === 1) {

			bcrypt.compare(password, response[0].password, function(err, result) {
				if(result) {
					console.log('compare - if')
					req.session.username = username;
					res.json({success: true});
					res.end();
				}
				else {
					console.log('compare - else')
					res.json ({success: false});
					res.end();
				}
			});
			
		}
		else {
			console.log('else')
			res.json ({success: false});
			res.end();
		}
	})
}

// If a user is currently stored on the session, removes it
function handleLogout(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.session.user) {
		request.session.destroy();
		result = {success: true};
	}

	response.json(result);
}

// This function returns the current server time
function getServerTime(request, response) {
	var time = new Date();
	
	var result = {success: true, time: time};
	response.json(result); 
}

// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(request, response, next) {
	if (request.session.user) {
		// They are logged in!

		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {success:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}

// This middleware function simply logs the current request to the server
function logRequest(request, response, next) {
	console.log("Received a request for: " + request.url);

	// don't forget to call next() to allow the next parts of the pipeline to function
	next();
}


module.exports = {
    handleRegister: handleRegister,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getServerTime: getServerTime,
    verifyLogin, verifyLogin,
    logRequest, logRequest
};