const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    fullname: String
});

module.exports = mongoose.model("users", userSchema);