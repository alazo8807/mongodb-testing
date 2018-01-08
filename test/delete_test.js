const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let ale; 
    
    beforeEach((done) => {
       ale = new User({name:'Ale'});
       ale.save()
        .then(() => done());
    });
   
    it('model instance remove', (done) => {
       ale.remove()
        .then(() => User.findOne({name: 'Ale'}))    //try to find a user called Ale
        .then((user) => {
            assert(user === null);  //Validate there is none user named Ale
            done();
        });
    });
    
    it('class method remove', (done) => {
        User.remove({name:'Ale'})
            .then(() => User.findOne({name:'Ale'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    
    it('class method findOneAndRemove', (done) => {
        User.findOneAndRemove({name: 'Ale'})
            .then(() => User.findOne({name:'Ale'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    
    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(ale._id)
            .then(() => User.findOne({name:'Ale'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});