/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.urimposter = [];
streams.users.howtovent = [];
streams.users.dontkillme = [];
streams.users.notguilty = [];
window.users = Object.keys(streams.users);

// utility function for adding tweets to our data structures
var addTweet = function(newTweet) {
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'suspiciously', 'almost', 'just now i', 'why did you @dontkillme', 'why on earth did you', 'oh geez', 'i think i know', 'dont tell me', 'that horrid impo', 'the impo', 'my buddy', 'where did you', 'who was it that', 'when did you', 'because i'];
var verbs = ['killed', 'vented at', 'ran by', 'started', 'finished', 'lied', 'died at', 'scanned', 'self-reported', 'reported', 'wired', 'met', 'passed by', 'hid', 'chased', 'cleared', 'saw', 'looked like', 'looked at', 'double killed', 'hacked', 'fooled'];
var objects = ['my', 'your', 'the', 'my', 'our', 'all of', 'this', 'this way', 'here', 'the', 'the impo', 'the new', 'every'];
var nouns = ['vent', 'light', 'card', 'impo', 'liar', 'ghost', '@notguilty', '@howtovent', '@urimposter', '@donkillme', 'security system', 'bad decision', 'death', 'airship', 'asteroids', 'cafe', 'cams', 'comms', 'everything', 'lab'];
var tags = ['#amongus', '#afk', '#dead', 'but only i know who', 'for real', '#sus', '#chillin', '#omg', '#doublekill', '#allclear', '#thatsme', '#fuhfuhfuh', '#jester', '', '', '', ''];

var randomMessage = function() {
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function() {
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  // tweet.profilePhotoURL = './assets/img/' + tweet.user + '.png';
  tweet.profilePhotoURL = 'assets/img/' + tweet.user + '.png';
  addTweet(tweet);
};

for (var i = 0; i < 10; i++) {
  generateRandomTweet();
}

var scheduleNextTweet = function() {
  if (streams.home.length < 500) {
    generateRandomTweet();
    setTimeout(scheduleNextTweet, 250 + (Math.random() * 1250));
  }
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message) {
  if (!visitor) {
    throw new Error('set the global visitor property!');
  }
  if (!streams.users[visitor]) {
    streams.users[visitor] = [];
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  tweet.created_at = new Date();
  tweet.profilePhotoURL = './assets/img/visitor.png';
  addTweet(tweet);
};
