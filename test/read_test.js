const assert = require("assert");
const User = require("../src/user");

describe('Reading users from the database', () => {
    let ale, bob, carlos, dave; 
    
    beforeEach((done) => {
      ale = new User({name:"Ale"});
      bob = new User({name:"Bob"});
      carlos = new User({name: "Carlos"});
      dave = new User({name: "Dave"});
      
      Promise.all([ale.save(), bob.save(), carlos.save(), dave.save()])
        .then(() => done())
      
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
    });
    
    it('Can skip and limit the result set', (done) => {
       User.find({})
        .sort({name: 1})    //It will sort by name, ascending. To order descending use {name: -1}
        .skip(1)
        .limit(2)
        .then((foundUsers) => {
            assert(foundUsers.length === 2);
            assert(foundUsers[0].name === "Bob");
            assert(foundUsers[1].name === "Carlos");
            done();
        })
    });
});
