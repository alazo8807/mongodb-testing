const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
