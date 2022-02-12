
var initUserNames = [
  "shawndrost",
  "sharksforcheap",
  "mracus",
  "douglascalhoun",
];

var user = function(userName) {
  return {
    user:userName,
    following: [],
    tweets: []
  };
};

var doobs = user('doobs')
doobs.following = ['shawndrost', 'sharksforcheap', 'douglascalhoun']

var initUsers = function(userNames, genTweet) {
  var users = {};
  userNames.forEach(function(userName) {
    users[userName] = user(userName);
  });
  var i = 40
  while (i--) {
    var newTweet = genTweet(users);
    users[newTweet.user].tweets.push(newTweet);
  }
  users['doobs'] = doobs
  return users;
};

var getInitValAsync = async function(vals, DB, genTweet) {
    var DBVal = vals[1];
    var fileFound = await DB.check.forFile(vals[0]);
    if (fileFound) {
      DBVal = await DB.read(vals[0]);
    } else {
      DBVal = initUsers(initUserNames, genTweet)
      await DB.write(vals[0], DBVal)
    }
    return  DBVal
  };

var getInitVals = async function(DB, genTweet) {
  var initFiles = [['users.json']];
  var DBVals = initFiles.map(async function(vals) {
    var val = await getInitValAsync(vals, DB, genTweet);
    return val;
  });
  return await Promise.all(DBVals)
};

module.exports = {
  getInitVals
}