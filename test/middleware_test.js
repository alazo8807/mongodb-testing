const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
   let joe, blogPost;
   
   beforeEach((done) => {
      joe = new User({name: 'Joe'});
      blogPost = new BlogPost({title: 'Mi first post', content: 'This is blablabla'});
      
      joe.blogPosts.push(blogPost);

      Promise.all([joe.save(), blogPost.save()])    //Promise.all runs all those promises in parallel and returns one when all of them are finished
        .then(() => done());
   });
   
   it('User removes blogPosts before been deleted', (done) => {
        joe.remove()
        .then(() => BlogPost.count())   //count() is a method from mongoose.
        .then((count) => {
            assert(count === 0);
            done();
        });   
   });
   
});   
   