const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

/*
const dbConnectionString = process.env.DATABASE_URL;
console.log(`DB connection: ${dbConnectionString}`);
const myPool = Pool({connectionString: dbConnectionString});
*/

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

module.exports = {
    createUser: createUser
};