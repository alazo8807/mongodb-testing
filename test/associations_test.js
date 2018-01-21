const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Associations', () => {
   let joe, blogPost, comment;
   
   beforeEach((done) => {
      joe = new User({name: 'Joe'});
      blogPost = new BlogPost({title: 'Mi first post', content: 'This is blablabla'});
      comment = new Comment({content: 'Great Post'});
      
      joe.blogPosts.push(blogPost);
      blogPost.comments.push(comment);
      comment.user = joe;
      
      Promise.all([joe.save(), blogPost.save(), comment.save()])    //Promise.all runs all those promises in parallel and returns one when all of them are finished
        .then(() => done());
   }); 
   
   it("Saves a relationship between a user and a blogpost", (done) => {
      User.findOne({name: 'Joe'})
        .populate('blogPosts')  //pass to populate the name of the property you want bring the data for
        .then((foundUser) => {
            assert(foundUser.blogPosts[0].title === 'Mi first post');
            done();
        });
   });
   
  it("Saves a full relationship tree", (done) => {
      User.findOne({name: 'Joe'})
        .populate({
            path: 'blogPosts',
            populate: {     //populate for comments inside the previously populated blogPost
                path: 'comments',   //name of the property in the comment model
                model: 'comment',   //name of the model
                populate: {     //populate the comments for the blogPosts
                    path: 'user',   //name of the property inside the comment model
                    model: 'user'   //name of the model
                }
            }
        })
        .then((foundUser) => {
            assert(foundUser.name === 'Joe');
            assert(foundUser.blogPosts[0].title = 'Mi first post');
            assert(foundUser.blogPosts[0].comments[0].content === 'Great Post');
            assert(foundUser.blogPosts[0].comments[0].user.name === 'Joe');
            done();
        });
  });
});