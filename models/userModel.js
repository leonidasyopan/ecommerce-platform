const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

const bcrypt = require('bcrypt');

function createUser(username, password, email, callback) {

    const sql = "INSERT INTO user_access (username, password, email, user_create_date) VALUES($1, $2, $3, current_timestamp) RETURNING  user_id";
    const params = [username, password, email];

    pool.query(sql, params, function(error, result) {
        if (error) {
            console.log("An error occurred in the DB");
            console.log(error);

            callback(error, null);
        } else {
            console.log("DB Query finished");
            console.log(result.rows);
            callback(null, result.rows);
        }

    });
}

function loginUser(username, password, callback) {
    console.log(`Entered loginUser() in Model`);

    const sql = `SELECT * from user_access WHERE username = '${username}'`;

    console.log(`Build the SQL in Model: ${sql}`);

	pool.query(sql, function (err, res){
        console.log(`Entered pool.query in Model`);
		if(err) {
            console.log(err);            
        } else {
            console.log(`No Error thus far in Model, entered ELSE`);
            bcrypt.compare(password, res.rows[0].password, function(err, matchFound) {
                console.log(`Inside COMPARE function`);
                if(matchFound) {
                    console.log(`This should mean that a match was found`);
                    callback(null, res.rows);
                }
                else {
                    console.log(`This should mean that a match was NOT found`);
                    err = "Password didn't match"
                    callback(err, null);
                }
            });
        }        
    });
}


module.exports = {
    createUser: createUser,
    loginUser: loginUser
};