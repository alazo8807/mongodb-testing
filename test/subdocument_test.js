const assert = require('assert');
const User = require('../src/user');

describe('Testing subdocuments', () => {
    it('can create a subdocument', (done) => {
        const ale = new User({
            name: 'Ale',
            posts: [{title: 'Viajando a Cuba'}]
        });     
        
        ale.save()
            .then(() => User.findOne({name: 'Ale'}))
            .then((foundUser) => {
               const post = foundUser.posts[0].title;
               assert(post === 'Viajando a Cuba'); 
               done();
            });
    });
    
    it('can add a subdocument to an existing record', (done) => {
        const joe = new User({
            name:'Joe',
            posts: [] 
        });    
       joe.save()
        .then(() => User.findOne({name: 'Joe'}))
        .then((foundUser) => {
            const newPost = {title: "Mi primer post"};
            foundUser.posts.push(newPost);
            return foundUser.save();
        })
        .then(() => User.findOne({name: 'Joe'}))
        .then((foundUser) => {
            assert(foundUser.posts[0].title === "Mi primer post");
            done();
        });
    });
    
    it('can remove an existing subdocument', (done) => {
        const joe = new User({
            name:'Joe',
            posts: [{title: "Mi primer post"}] 
        });    
       joe.save()
        .then(() => User.findOne({name: 'Joe'}))
        .then((foundUser) => {
            const post = foundUser.posts[0];
            post.remove(); //this is a method that mongoose provides to remove array elements
            return foundUser.save();
        })
        .then(() => User.findOne({name: 'Joe'}))
        .then((foundUser) => {
            assert(foundUser.posts.length === 0);
            done();
        });
    });
});