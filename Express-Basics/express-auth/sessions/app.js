const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config(); // Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax

const User = require("../model/User.js");   //get model schema

// Create the Express application
var app = express();

//to allow json, urlencoded middleware, to parse these request types.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * First you need to setup a mongodb database with db name "user_db" containing a collection name "users" with one sample entry.
 * Connect to MongoDB Server, set the DB string in .env
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

app.get('/', (req, res, next) => {
    res.send('<h1> Hello World (Sessions)</h1>');
});

app.listen(3000);