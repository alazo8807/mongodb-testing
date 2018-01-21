const mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //It sets mongoose to use the promise mechanism of ES6

before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => {
            console.log('Connected to localhost');
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);    
    });
});
    
beforeEach((done) => {
    //all collections have to be in lower case since Mongodb creates the names in lower case.
    const {users, comments, blogposts} = mongoose.connection.collections;   //ES6 syntax
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            })    
        });    
    });    //Deletes all records for users collection
});    