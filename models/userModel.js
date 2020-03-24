const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

/*
const dbConnectionString = process.env.DATABASE_URL;
console.log(`DB connection: ${dbConnectionString}`);
const myPool = Pool({connectionString: dbConnectionString});
*/

function createUser(username, password, callback) {

    const sql = "INSERT INTO users (username, password) VALUES($1, $2) RETURNING  id";
    const params = [username, password];

    myPool.query(sql, params, function(error, result) {
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