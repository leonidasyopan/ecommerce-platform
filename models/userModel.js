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

    const sql = `SELECT * from user_access WHERE username = '${username}'`;

	pool.query(sql, function (err, res){
		if(err) {
            console.log(err);            
        } else {
            
            bcrypt.compare(password, res.rows[0].password, function(err, matchFound) {
                if(matchFound) {
                    console.log('compare - if');
                    callback(null, res.rows);
                }
                else {
                    console.log('compare - else');
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