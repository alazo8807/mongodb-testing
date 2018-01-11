const assert = require('assert');
const User = require('../src/user');

describe('virtual types', () => {
   it('postCount returns number of posts', (done) => {
      const user = new User({
          name: 'Ale', 
          posts: [{title: 'firstPost'}]
      });
      user.save()
        .then(() => User.findOne({name: 'Ale'}))
        .then((user) => {
            console.log(user);
            // assert(1===1);
            assert(user.postCount === 1);
            done();
        })
   }); 
});