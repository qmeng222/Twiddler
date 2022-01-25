/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.agentSmith = [];
streams.users.neo = [];
streams.users.trinity = [];
streams.users.morpheus = [];
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
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a robot', 'an unknown unit'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'counteracted', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['bitcoin', 'cryptocurrency', 'system', 'stablecoin', 'information', 'technology', 'ethereum', 'money', 'blockchain', 'reality', 'security system', 'infrastructure', 'metaverse', 'NFT', 'upgrade', 'brain interface'];
var tags = ['#zion', '#theOne', '#redPill', '#bluePill', '#oracle', '#reloaded', '#resurrection', '#crypto', '#revolution', '#matrix', '#inflationHedge', '', '', ''];

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
