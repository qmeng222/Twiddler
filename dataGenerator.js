/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
window.users = Object.keys(streams.users);

// utility function for adding tweets to our data structures
var addTweet = function(newTweet) { //input is a newTweet Object {}
  var username = newTweet.user;  //one of the 4 users
  streams.users[username].push(newTweet);  //push object into streams.users array
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function() {
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function() {
  var tweet = {}; //tweets are objects - user, message, createdAt, profilePhotoURL
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  tweet.profilePhotoURL = './assets/img/' + tweet.user + '.png';
  addTweet(tweet);
};

for (var i = 0; i < 10; i++) { //these are 10 tweets that show up in browser
  generateRandomTweet();
}

var scheduleNextTweet = function() { //generateRandomTweet after 250ms - 1.5 seconds
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
