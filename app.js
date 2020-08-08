const user = require('./index');


user.setToken('ef10dc9f15c620178c374011f7e3c6064054cc11');
user.userAllData('athulraj2002').then(val=>console.log(val));
// user.userFollowingList('athulraj2002').then(val=>console.log(val));

