$(document).ready(function(){
  // create jQuery variable for #app div (div were building everyting in) and clear anything inside
  var $app = $('#app');
  $app.html('');

  // create post variables
  var $createPost = $('<div id="tweet-form"></div>');
  var $form = $('<form target="" id="new-tweet-form"></form>');
  var $yourUser = $('<input name="username" type="text" id="username" class="input" placeholder="Username"></input>');
  var $userLabel = $('<label for="username"></label');
  // needed to use <inpu> for automated test, but would prefer <textarea> here
  var $tweetContent = $('<input name="message" type="text" id="message" class="input" placeholder="Enter Tweet Here"></input>');
  var $tweetContentLabel = $('<label for="message"></label>');
  var $postButton = $('<button type="submit" class="btn">Tweet!</button>');
  // add all create post variables to their respective jQuery variables
  $form.append($yourUser, $userLabel, $tweetContent, $tweetContentLabel, $postButton);
  $form.appendTo($createPost);
  $createPost.appendTo($sideBar);

  // create update feed button in a container (to make formatting easier) and add it to app
  var $updateFeed = $('<button class="btn" id="update-feed">Update Feed</button>');
  var $btnSpan = $('<span id="btn-span"></span');
  $btnSpan.append($updateFeed);
  $btnSpan.appendTo($sideBar);

  // create contianers for main, sidebar, and feed
  var $main = $('<div id="main"></div>')
  var $sideBar = $('<div id="sidebar"></div>');
  var $feed = $('<div id="feed"></div>')

  // create h1 for title
  var $title = $('<h1>Twiddler</h1>');

  // append title, btnSpan(update feed), and create post to sideBar
  $title.appendTo($sideBar);
  $btnSpan.appendTo($sideBar);
  $createPost.appendTo($sideBar);

  // append sidebar and feed to main
  $main.append($sideBar, $feed);

  // append main to app(window)
  $main.appendTo($app);

  // create tweet function
  var createTweet = function(index, target) {
    // javascript variables
    var tweet = target[index];
    var profilePic = tweet.profilePhotoURL;
    // jquery variables
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<img class="profile-photo">');
    var $userName = $('<div class="username"></div>');
    var $timeStamp = $('<div class="timestamp"></div>');
    var $content = $('<p class="content message"></p>');
    var $comment = $('<i class="icon comment far fa-comment-alt"></i>')
    var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
    var $like = $('<i class="icon like far fa-heart"></i>');
    var $share = $('<i class="icon share far fa-share-square"></i>');
    // jquery variables for formatting tweet container
    var $header = $('<div id="tweet-header"></div>');
    var $body = $('<div class="body"></body>');
    var $footer = $('<footer class="footer"></footer>');
    var components = [$header, $body, $footer];
    // add variables to their respective containers
    $header.append($profilePhoto, $userName, $timeStamp);
    $body.append($content);
    $footer.append($comment, $retweet, $like, $share);
    // set attributes/text of create tweet variables equal to data in users(tweeters) object
    $($profilePhoto).attr('src', profilePic);
    $($userName).html('@' + tweet.user);
    $($content).html(tweet.message);
    // use timeago library to make date tag 'human readable'
    $($timeStamp).html(jQuery.timeago(tweet.created_at));
    // loop over compenents array and add each element to $tweet jQuery variable
    components.forEach(function(el, index) {
      $(el).appendTo($tweet);
    })
    // return formatted tweet
    return $tweet;
  }

  // render feed utility function (event handler function)
  var renderFeed = function(user = 'home') {
    // remove tweets from feed
    $feed.html('');
    var index;
    var target;
    // create functionality for individual pages of tweets
    // set index and target based on value of user in function input
    if (user === 'home') {
      index = streams[user].length - 1;
      target = streams.home;
    }
    else {
      index = streams.users[user].length - 1;
      target = streams.users[user];
    }
    // loop tweet object in the index (in reverse order)
    while(index >= 0){
      // call createTweet with index and target, and append the result to $feed, then decrement
      var $tweet = createTweet(index, target);
      $tweet.appendTo($feed);
      index -= 1;
    }
    // add feed to $main container
    $feed.appendTo($main);
  }

  // helper function for username click
  var handleUsernameClick = function() {
    $updateFeed.text('Back');
    renderFeed(this.innerHTML.slice(1));
  }

  // friends list unordered list
  var $friendsList = $('<ul id="friends-list"></ul>');
  // loop over streams.users
  for (var user in streams.users) {
    // add @ at beginning of user text
    user = '@' + user;
    // create an li for each user, add the 'user' variable to the li, add li to friendslist
    var $liUser = $('<li class="friend"></li>');
    $liUser.text(user);
    $liUser.appendTo($friendsList);
  }
  // add f2 for friendslist title and friendsList to the sidebar container
  $friendsListContainer = $('<div id="friends-list-container"></div>');
  $friendsListTitle = $('<h2>Friends List</h2>');
  $friendsListTitle.appendTo($friendsListContainer);
  $friendsList.appendTo($friendsListContainer);
  $friendsListContainer.appendTo($sideBar);


  // helper function for username click
  var handleUsernameClick = function() {
    $updateFeed.text('Back');
    renderFeed(this.innerHTML.slice(1));
  }
  // Event Handlers
  // create tweet submit button click
  $postButton.on('click', function(event) {
    // prevent page from refreshing
    event.preventDefault();
    // stringify value in $yourUser(username) and $tweetContent(message) and set to variable
    var name = ($yourUser.val()).toString();
    var tweetContent = ($tweetContent.val()).toString();
    // call writeTweet function from dataGenerator.js and pass in message and name
    writeTweet(tweetContent, name);
    // call renderFeed function with defaul argument
    renderFeed();
  })
  // update feed when button clicked
  $updateFeed.on('click', function() {
    $updateFeed.text('Update Feed');
    renderFeed('home');
  });
  // update to individual feed when username or sidebar clicked
  $feed.on('click', 'div.username', handleUsernameClick);
  $sideBar.on('click', '.friend', handleUsernameClick);

  // populate feed on page load
  renderFeed();

  window.isItBeautifulYet = true;
});

