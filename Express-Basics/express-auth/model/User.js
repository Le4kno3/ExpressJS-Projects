const mongoose = require('mongoose');

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});

//this means the schema is 'User' and the actual database collection name will be 'users' https://mongoosejs.com/docs/models.html
module.exports = UserSchema;