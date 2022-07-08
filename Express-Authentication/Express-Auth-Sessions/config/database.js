const mongoose = require('mongoose');


require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

const db_name = "user_db";
const db_string = 'mongodb://' + process.env.DB_USER + ':' + encodeURIComponent(process.env.DB_PASS) + '@localhost:27017/' + db_name;


const connection = mongoose.createConnection(db_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.on('connecting', () => {
    console.log('connected');
});

// Expose the connection
module.exports = connection;
