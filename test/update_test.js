const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let ale; 
    
    beforeEach((done) => {
        ale = new User({name: 'Ale', postCount: 10});
        ale.save()
            .then(() => done());
    });
    
    function assertName(operation, done){
        operation //promise returned from operation
            .then(() => User.find({}))
            .then((user) => {
                assert(user.length === 1);
                assert(user[0].name === 'Alejo');
                done();
            });    
    } 
    
    it('instance type using set and sve', (done) => {
        ale.set({name: 'Alejo'});
        assertName(ale.save(), done);
        // ale.save() //Changes to the instance won't be permanent on Mongo until calling save
        //     .then(() => User.find({}))
        //     .then((user) => {
        //         assert(user.length === 1);
        //         assert(user[0].name === 'Alejo');
        //         done();
        //     });
    });
    
    it('A model instance can update', (done) => {
        assertName(ale.update({name: 'Alejo'}), done);
    });
    
    it('A model class can update', (done) => {
        assertName(User.update({name: 'Ale'}, {name:'Alejo'}), done);
    });
    
    it('A model class can update one record', (done) => {
       assertName(User.findOneAndUpdate({name: 'Ale'}, {name:'Alejo'}), done); 
    });
    
    it('A model class can find one record by Id and update', (done) => {
       assertName(User.findByIdAndUpdate(ale._id, {name:'Alejo'}), done); 
    });
    
    it('A User can have their postCount incremented by 1', (done) => {
      User.update({name: 'Ale'}, { $inc: { postCount: 1 } }) //Increments Ale's postCount by 1
        .then(() => User.findOne({name: 'Ale'}))
        .then((foundUser) => {
            assert(foundUser.postCount === 11);
            done();
        });
    });
});