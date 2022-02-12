var DB = require('../DB/index');
var gen = require('./generateDataFuncs/index');
var servInit = require('./initService/index');
var scheduleMod = require('./Schedules/index');


var getFuncs = require('./get/index')



var init = async function() {
  var [users] = await servInit.getInitVals(DB, gen.tweet);
  var schedule = scheduleMod.init(users, gen.tweet, DB.write);

  schedule.tweet();
  schedule.saveUsers();
  schedule.savedUsersClean();
  var service = {
      data: {users: users},
      get: {
          followedTweets: getFuncs.followedTweets,
          newTweets: getFuncs.newTweets
         }
  };
  return service;
};



module.exports = {
    init
};

