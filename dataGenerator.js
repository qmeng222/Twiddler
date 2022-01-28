/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.Sibby = [];
streams.users.Simbobway = [];
streams.users.Simby = [];
streams.users.Simba = [];
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
var opening = ['woof', 'awooooo', 'bark bark', 'grr', 'woof woof', 'bark', 'grrr'];
var verbs = ['bark bark', 'grr', 'woof', 'woof woof', 'awoooooo', 'bark'];
var objects = ['woof', 'awooooo', 'bark bark', 'grr', 'woof woof', 'bark', 'grrr'];
var nouns = ['woof', 'awooooo', 'bark bark', 'grr', 'woof woof', 'bark', 'grrr'];
var tags = ['#woof', '#awoooo', '#puppy', 'bark', '#grrr', '#doglife', '#barkbark', '', '', '', ''];

var randomMessage = function() {
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function() {
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  tweet.profilePhotoURL = './assets/img/' + tweet.user + '.png';
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
