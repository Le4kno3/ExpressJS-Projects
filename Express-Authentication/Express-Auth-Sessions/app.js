const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
var passport = require('passport');
// var crypto = require('crypto');
var routes = require('./routes');
require('./middleware/passport');   // Need to require the entire Passport config module so app.js knows about it





/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * -------------- DB SETUP ----------------
 */
//DB setup is already done in "./config/database"

/**
 * -------------- SESSION SETUP ----------------
 */

const db_name = "user_db";
const db_string = 'mongodb://' + process.env.DB_USER + ':' + encodeURIComponent(process.env.DB_PASS) + '@localhost:27017/' + db_name;




const sessionStore = MongoStore.create({
    mongoUrl: db_string,
    dbName: 'user_db',
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60,    //in milliseconds
    autoRemove: 'native'

});

//to use the "session" middleware in our express app
app.use(session({
    //secret: process.env.SECRET,
    name: 'sessionCheck',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);