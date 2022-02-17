


// generate random tweet
var generateRandomTweet = function(users) {
  var tweet = {};
  var randUser = randomElement(users);
  tweet.user = randUser;
  tweet.message = randomMessage();
  tweet.created_at = Date.now();
  tweet.profilePhotoURL = './assets/img/' + tweet.user + '.png';
  tweet.likes = 0;
  tweet.retweets = 0;
  return tweet;
};




// utility function
var randomElement = function(array) {
  if (Array.isArray(array)) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  } else {
    var keys = Object.keys(array);
    var randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }
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




var initUserNames = [
  "shawndrost",
  "sharksforcheap",
  "mracus",
  "douglascalhoun",
];

var initServerTweets = function(userNames) {
  var serverTweets = [];
  var i = 25;
  while (i--) {
    serverTweets.push(generateRandomTweet(userNames));
  }
  return serverTweets;
};


var initServer = function() {
  var tweets = initServerTweets(initUserNames);
  var servObj = {
    startTweetGen: function() {
      setInterval(function() {
        var newTweet = generateRandomTweet(initUserNames);
        tweets.push(newTweet);
      }, 3500)
    },
    getTweets: function() {
      return JSON.parse(JSON.stringify(tweets));
    }
  }
  return servObj;
};


var server = initServer();
server.startTweetGen();

var getUserTweets = async function($) {
  var tweets = await new Promise(function(resolve) {
    setTimeout(resolve(server.getTweets()), 500);
  });
  return tweets;
}


var checkForNewTweets = async function($, streams, user) {
  var curLen = streams.home.length;
  var serverTweets = server.getTweets();
  var newTweets = server.getTweets().slice(curLen);
  var tweets = await new Promise(function(resolve) {
    setTimeout(resolve(newTweets), 500);
  });
  if (tweets.length) {
    $('#update-feed').css('visibility', 'visible')
    streams.addedToUpdate += tweets.length ? tweets.length : 0;
    streams.home = tweets.concat(streams.home)
  }
}