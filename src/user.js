const mongoose = require("mongoose");
const PostSchema = require("./post");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters.'
        },
        required: [true, 'User name required.']
    },
    posts: [PostSchema]
});

userSchema.virtual('postCount').get(function(){ //for virtual type getter, use function keyword and not ()=>{}
    return this.posts.length;
});

var User = mongoose.model('User', userSchema);

module.exports = User;
