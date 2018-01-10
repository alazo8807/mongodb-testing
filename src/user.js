const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters.'
        },
        required: [true, 'User name required.']
    },
    postCount: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;
