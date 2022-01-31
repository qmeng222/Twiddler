const exisitingTweets = [];
const exisitingUsers = [];

var createHome = function() {
  // select the div with the ID #app
  var $app = $('#app');
  $app.html('');
  // adds twiddler title
  addTitle($app);
  //creates new tweet form
  var $newTweet = createTweetForm();
  //creates friend list
  var $friendList = createFriendList();
  // creates home feed
  var $feed = createFeed('ur feed');
  // create update feed button
  updateFeedButton($app, $feed, 'refresh feed');
  //append all to page
  $newTweet.appendTo($app);
  $friendList.appendTo($app);
  $feed.appendTo($app);
  // populates feed wt tweets
  populateTweets($feed);
};

var populateFriendList = function(friendList) {
  var $div = $('<div class="friend-list"></div>')
  var users = Object.keys(streams.users).reduce(function(result, user) {
    if (!result.includes(user)) {
      result.push(user);
      return result;
    }
    return result;
  }, [])

  users.forEach(function(user) {
    var $currentUser = $('<li class="friend"></li>');
    $currentUser.text('@' + user);

    $($currentUser).click(function() {
      populateUserTweets(user)
    });

    $currentUser.appendTo(friendList);
  });
  friendList.appendTo($div);
  return $div;
}

var createFriendList = function() {
  var $friendList = $('<ul id="friends-list"></ul>');
  $('<h3 class="friend-list-title"> ur friends</h3>').appendTo($friendList);
  $friendList = populateFriendList($friendList);
  return $friendList;
}

var addUsernameForm = function(newTweetForm) {
  var $label = $('<label for="username">username:</label><br>');
  var $input = $('<input type="text" id="username" name="username"><br>');
  $label.appendTo(newTweetForm);
  $input.appendTo(newTweetForm);
  return newTweetForm;
}

var addMessageForm = function(newTweetForm) {
  var $label = $('<label for="message">twiddle:</label><br>');
  var $input = $('<input type="text" id="message" name="message"><br>');
  $label.appendTo(newTweetForm);
  $input.appendTo(newTweetForm);
  return newTweetForm;
}

var addSubmitButton = function(newTweetForm) {
  var $button = $('<button type="button">submit</button>')
  var feed = $('div #feed');
  $button.appendTo(newTweetForm);
  $($button).click(function() {
    visitor = $("#username").val();
    var message = $("#message").val();
    writeTweet(message, username);
    createHome();
  });
  return newTweetForm;
}

var createTweetForm = function() {
  var $div = $('<div class="new-tweet-form"></div>')
  $('<h3 class="form-title">twiddle:</h3>').appendTo($div);
  var $newTweetForm = $('<form id="new-tweet-form"></form>');
  //add username
  $newTweetForm = addUsernameForm($newTweetForm);
  //add message
  $newTweetForm = addMessageForm($newTweetForm);
  //add submit button
  $newTweetForm = addSubmitButton($newTweetForm);
  $newTweetForm.appendTo($div);
  return $div;
}


var addTitle = function(app) {
  var $title = $("<h1 class='title'>twiddler</h1>");
  $title.appendTo(app);;
}

//object where keys are index in streams.home
//and values are arrays, with first element being tweet time created, second being tweet message
var createNewTweetObject = function() {
  var newTweets = {};
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    if (!exisitingTweets.includes(tweet.message)) {
      newTweets[index] = [tweet.created_at, tweet.message];
    }
    index -= 1;
  }
  return newTweets;
}

var addTweets = function(feed) {
  var newTweets = createNewTweetObject();
  $('h2.feedTitle').remove();
  //filter to just get times, sort those, and iterate
  //if new tweet's time matches, and it's message is not present in exisitng tweets
  //build tweet and append
  Object.values(newTweets).map(function(subArr, index) {
    return subArr[0];
  }).sort().forEach(function(time) {
    for (prop in newTweets) {
      if (newTweets[prop][0] === time && (!exisitingTweets.includes(newTweets[prop][1]))) {
        var tweet = streams.home[prop];
        var $tweet = $('<div class="tweet"></div>');
        $tweet = addTweetComponents($tweet, tweet.user, tweet.message, tweet.created_at);
        $tweet.prependTo(feed);
        exisitingTweets.push(tweet.message);
      }
    }
  });
  addFeedTitle(feed, 'ur feed');
}

var updateFeedButton = function(app, feed, text) {
  var $updateFeedButton = $('<button id="update-feed"></button>');
  $updateFeedButton.text(text);
  $updateFeedButton.appendTo(app);
  //adds functionality
  if (text === 'refresh feed') {
    $($updateFeedButton).click(function() {
      addTweets(feed);
    });
  } else if (text === 'Back') {
    $($updateFeedButton).click(function() {
      createHome();
    });
  }
}

var addImage = function(tweet, tweetUser) {
  //img
  var currentUser = "assets/img/" + tweetUser + '.png';
  var $img = $("<img class='profile-photo' src='" + currentUser + "'>")
  $img.appendTo(tweet);
  return tweet;
}

var addTweetText = function(tweet, tweetMessage) {
  var $paragraph = $('<p class="message"></p>');
  $paragraph.text(tweetMessage);
  $paragraph.appendTo(tweet);
  return tweet;
}

var addUsername = function(tweet, tweetUser) {
  var $user = $('<div class="username"></div>');
  $user.text('@' + tweetUser);

  $($user).click(function() {
    populateUserTweets(tweetUser)
  });


  $user.appendTo(tweet);
  return tweet;
}

var addIcons = function(tweet) {
  var $share = $('<i class="fas fa-share-alt share"></i>');
  var $like = $('<i class="fas fa-thumbs-up like"></i>');
  var $comment = $('<i class="fas fa-comment comment"></i>');
  var $retweet = $('<i class="fas fa-retweet retweet"></i>')

  var icons = [$comment, $retweet, $like, $share];
  icons.forEach((function(icon) {
    icon.appendTo(tweet);
  }));
  return tweet;
}

var addTimestamp = function(tweet, createdAt) {
  var $timestamp = $('<time class="timestamp"></time')
  var minutesAgo = jQuery.timeago(createdAt);
  $timestamp.text(minutesAgo);
  $timestamp.appendTo(tweet);
  return tweet;
}

var addTweetComponents = function(tweet, tweetUser, tweetMessage, tweetCreatedAt) {
  //adds image to tweet
  tweet = addImage(tweet, tweetUser);
  //adds username
  tweet = addUsername(tweet, tweetUser);
  //add timestamp to tweet
  tweet = addTimestamp(tweet, tweetCreatedAt)
  //adds text to tweet
  tweet = addTweetText(tweet, tweetMessage);
  //add icons to tweet
  tweet = addIcons(tweet);
  return tweet;
}

var populateTweets = function(feed) {
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet = addTweetComponents($tweet, tweet.user, tweet.message, tweet.created_at);
    exisitingTweets.push(tweet.message);
    $tweet.appendTo(feed);
    index -= 1;
  }
}

var addFeedTitle = function(feed, feedTitle) {
  var $title = $('<h2 class="feedTitle"></h2>');
  $title.text(feedTitle);
  $title.prependTo(feed);
}

var createFeed = function(feedTitle) {
  var $feed = $('<div id="feed"></div>');
  addFeedTitle($feed, feedTitle);
  return $feed;
}

var populateUserTweets = function(user) {
  var $app = $('#app');
  var feedTitle = user + "'s feed";
  $app.html('');
  updateFeedButton($app, null, 'Back');
  var $feed = createFeed(feedTitle);
  $feed.appendTo($app);
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    if (tweet.user === user) {
      var $tweet = $('<div class="tweet"></div>');
      $tweet = addTweetComponents($tweet, tweet.user, tweet.message, tweet.created_at);
      $tweet.appendTo($feed);
      index -= 1;
    }
    index -= 1;
  }
}

$(document).ready(function(){
  createHome();
});

window.isItBeautifulYet = true
