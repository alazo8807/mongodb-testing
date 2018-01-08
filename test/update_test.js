const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let ale; 
    
    beforeEach((done) => {
        ale = new User({name: 'Ale'});
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
});