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
var addTweet = function(newTweet) { // sets param of newTweet
  var username = newTweet.user; // given param should have prop of .user, username assigned to .user
  streams.users[username].push(newTweet); // push given tweet to User Stream based on given tweet.user name
  streams.home.push(newTweet); // push newTweet to Home Stream (no accounting for username)
};

// utility function
var randomElement = function(array) { //sets param to array
  var randomIndex = Math.floor(Math.random() * array.length); //selects random integer(rounded down) from array length
  return array[randomIndex]; // returns a random element from given array
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function() {
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
}; // function returns random message composed of randomElements from structure above



// generate random tweets on a random schedule
var generateRandomTweet = function() { //takes no param
  var tweet = {}; // tweet is an object
  tweet.user = randomElement(users); // selects a random user from user data structure and assigns it to user property within tweet object
  tweet.message = randomMessage(); // assigns tweet key of message to value of randomMessage function
  tweet.created_at = new Date();  // assigns tweet key of created_at to current time capture
  tweet.profilePhotoURL = './assets/img/' + tweet.user + '.jpg'; //assigns profile photo using concat'd string that utilizes relative path and value of tweet.user
  addTweet(tweet); //calls addTweet function and passs newly created tweet object with keys a user, message, created at, and profile photo
};

for (var i = 0; i < 10; i++) {
  generateRandomTweet(); //loops function generateRandomTweet ten times
}

var scheduleNextTweet = function() {
  if (streams.home.length < 500) { //if there are fewer then 500 elements on Home Stream,
    generateRandomTweet(); // call function to make tweets
    setTimeout(scheduleNextTweet, 250 + (Math.random() * 1250)); //calls itself again at a variable millisecond interval
  }
};
scheduleNextTweet();// IIFE, calls itself the first time

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message) { //sets param to message
  if (!visitor) { //sets condition on if user is a visitor?
    throw new Error('set the global visitor property!');
  }
  if (!streams.users[visitor]) { //checks if visitor key in users is undefined (undefined would return false but !)
    streams.users[visitor] = []; // sets visitor key in users to an empty array
  }
  var tweet = {}; // assigns twwet to empty object
  tweet.user = visitor; // user key in tweet is equal to visitor
  tweet.message = message; // message key = message parma input
  tweet.created_at = new Date(); // date key at current date
  tweet.profilePhotoURL = './assets/img/visitor.png'; //assigns profile photo prop to visitor image in local file
  addTweet(tweet); // calls function tweet and passes newly created tweet
};
