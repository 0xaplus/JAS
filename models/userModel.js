const mongoose = require("mongoose");
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

const UserModel = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// Automatically handles hashing and salting of passwords
UserModel.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', UserModel);