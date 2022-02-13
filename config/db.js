const pg = require('pg')
require('dotenv').config();

pg.types.setTypeParser(1082, function(stringValue) {
    return stringValue;  //1082 for date type
});

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

console.log('connstring ' + connectionString)

const client = new pg.Client({
    //   connectionString: process.env.DATABASE_URL,
    connectionString: (process.env.DATABASE_URL && process.env.DATABASE_URL != null ) ? process.env.DATABASE_URL : connectionString,
    // ssl: {
    //     rejectUnauthorized: false
    // }
})

exports.connect = () => {
    client.connect()
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        })
}

exports.query = (sqlString, params) => {
    // console.log(sqlString)
    return new Promise((resolve, reject) => {
        client.query(sqlString, params, function (err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}