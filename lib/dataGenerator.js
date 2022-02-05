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

// push tweet to state
function addTweet(newTweet) {
   const { user } = newTweet
   streams.users[user].push(newTweet)
   streams.home.push(newTweet)
};

// utility function
function randomChoice(array) {
   var randomIndex = Math.floor(Math.random() * array.length);
   return array[randomIndex];
};

// random tweet generator
function randomMessage() {
   const opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
   const verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
   const objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
   const nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
   const tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];
   return [randomChoice(opening), randomChoice(verbs), randomChoice(objects), randomChoice(nouns), randomChoice(tags)].join(' ');
};

// generate random tweets on a random schedule
function generateRandomTweet() {
   var tweet = {};
   tweet.user = randomChoice(users);
   tweet.message = randomMessage();
   tweet.created_at = new Date();
   tweet.profilePhotoURL = './assets/img/' + tweet.user + '.png';
   addTweet(tweet);
};

for (var i = 0; i < 10; i++) {
   generateRandomTweet();
}

function scheduleNextTweet() {
   if (streams.home.length < 500) {
      generateRandomTweet();
      setTimeout(scheduleNextTweet, 250 + (Math.random() * 1250));
   }
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
function writeTweet(message) {
   if (!visitor) { throw new Error('set the global visitor property!'); }
   if (!streams.users[visitor]) { streams.users[visitor] = []; }
   addTweet({
      user: visitor,
      message,
      created_at: new Date(),
      profilePhotoURL: './assets/img/visitor.png'
   })
};
