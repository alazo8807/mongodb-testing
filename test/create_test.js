const assert = require("assert");
const User = require("../src/user");

describe('It creates a record', () => {
    it('Saves a user', (done) => {
        const Ale = new User({
            name: "Alejo"
        });
        
        Ale.save()
         .then(() => {
             assert(!Ale.isNew);    //if it has not been saved in Mongo, isNew is false. 
             done();
         })
        
    });   
});

