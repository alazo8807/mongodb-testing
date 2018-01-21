const mongoose = require("mongoose");
const PostSchema = require("./post");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters.'
        },
        required: [true, 'User name required.']
    },
    posts: [PostSchema],    //This is using subdocuments
    blogPosts: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'blogPost'
    }],
    likes: Number
});

UserSchema.virtual('postCount').get(function(){ //for virtual type getter, use function keyword and not ()=>{}
    return this.posts.length;
});

//Defining Pre middleware for the remove event. This will be called every time a user is removed. 
UserSchema.pre('remove', function(next){
   const BlogPost = mongoose.model('blogPost'); 
   BlogPost.remove({
       _id: { $in: this.blogPosts }  //this.BlogPosts = Joe.BlogPosts. Will be the blogPosts of the user trying to delete
   })
    .then(() => next())
});

var User = mongoose.model('user', UserSchema);

module.exports = User;
