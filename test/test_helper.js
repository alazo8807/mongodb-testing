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
    mongoose.connection.collections.users.drop();    //Deletes all records for users collection
    done();
});    