const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
   it('requires a user name', (done) => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync();   //You can also use user.validate(callback).
        const {message} = validationResult.errors.name;  //ES6 declaration. it's the same as validationResult.errors.name.message
        assert(message === 'User name required.');
        done();
   }); 
   
  it('Validates the name is longer than 2 characters', (done) => {
        const user = new User({name: 'Al'});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;
        assert(message === 'Name must be longer than two characters.');
        done();
  });
  
  it('Disallows invalid records from being saved', (done) => {
        const user = new User({name: 'Al'});
        user.save()
            .catch((validationResult) => {
                assert(validationResult.errors.name.message === 'Name must be longer than two characters.');
                done();        
            });
        
  });
});