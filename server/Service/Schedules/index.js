var tweetMod = require('./tweet')
var saveUsersMod = require('./saveUsers')
var savedUsersCleanMod = require('./savedUsersClean')
var init = function(users, genTweet, DB) {
  return {
    tweet: tweetMod.init(users, genTweet),
    saveUsers: saveUsersMod.init(users, DB),
    savedUsersClean : savedUsersCleanMod.init(users, DB)
  }
}

module.exports = {
  init
}