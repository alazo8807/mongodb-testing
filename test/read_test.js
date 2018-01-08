const assert = require("assert");
const User = require("../src/user");

describe('Reading users from the database', () => {
    let ale; 
    
    beforeEach((done) => {
      ale = new User({name:"Ale"});
      ale.save()
        .then(() => done());
    });
    
    it('Finds all users with name Ale', (done) => {
        User.find({name:'Ale'})
            .then((users)=>{
                assert(users[0]._id.toString() === ale._id.toString());
                done();
            });
    });
    
    it('Find a user with a particular id', (done) => {
        User.findOne({_id: ale._id})
            .then((user) => {
                assert(user.name === 'Ale');
                done();
            })
    })
});
