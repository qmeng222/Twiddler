
$(document).ready(function() {
  // selecting already existing elements
  var $app = $('#app');
  $app.html('');
  jQuery("time.timeago").timeago();

  // new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  // var buttonStr = '<button type="button" id="update-feed">Update Feed</button>'
  // var $button = $(buttonStr);

  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>')

  // event handlers functions
  var renderTweet = function(tweet, index) {
    var $tweet = $('<div class="tweet"></div>');
    var $img = $('<img src=' + tweet.profilePhotoURL +' alt="User Image" class="profile-photo">');
    var $user = $('<span class="username">@' + tweet.user + '</span>');
    var $message = $('<p class="message">' + tweet.message + '</p>');
    var $timeStamp = $.timeago(tweet.created_at)
    var $date = $('<span class="timestamp">' + $timeStamp + '</span>');

    ($img).appendTo($tweet);
    ($user).appendTo($tweet);
    ($message).appendTo($tweet);
    ($date).appendTo($tweet);

    var iconClass = ["fa-solid fa-comment comment", "fa-solid fa-retweet retweet",
      "fa-solid fa-heart like", "fa-solid fa-share share"];

    (iconClass).forEach(function(element, index) {
      var $iconElement = $('<i class="' + element +' icon"></i>');
      $iconElement.appendTo($tweet)
    });

    $tweet.prependTo($feed);
  }

  var renderFeed = function (user) {
    $feed.html('');
    if (user === undefined) {
      (streams.home).forEach(renderTweet);
    } else {
      var username = user.slice(1);
      (streams.users[username]).forEach(renderTweet);
    }
    return $feed;
  }

  var handleTitleClicks = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  }

  var handleUsernameClick = function(event) {
    $('#update-feed').html('Back')
    renderFeed(event.currentTarget.innerText);
  }

  // event listeners
  $title.on('click', handleTitleClicks);

  $button.on('click', function(event) {
    $('#update-feed').html('Update Feed')
    renderFeed();
  });

  // default on function passes in an event; console.log(event) to see what it holds
  $(document).on('click', '.username', handleUsernameClick);

  // append
  $title.appendTo($app);
  // $button.appendTo($app);
  $button.appendTo($app);
  renderFeed();
  $feed.appendTo($app);

});

//
//
// currently we are trying to implement a twiddler feed where
// in a certain amount of the computer will generate a list of random tweets and we're currently
// trying to implement the HTML portion of these tweets with jQuery. This connects the front end with the back end.
// When the document is ready. It will run through teh script and execute on renderFeed which will load a list of
// random tweets with certain html elements. Then it comes out and if the button is clicked, it will generate
// a new random list of tweets at the top.

// Now we also want the option to see just one person's feed.
// We start with the same thing, home feed with random text no user is passed through. It will render the same random feed.
// Then when the username is clicked --- place event listeners on usernames.
    // (That will happen when we click the username which will render the feed with a specific username.
    // (This will then pull up the user feed where only the list of all user tweets are present in the feed )
  // 1. usernames have event listeners 'click' - need to access every tweet's username and add event listeners to them)
    // how to access username HTML tag and put event listeners on them?
  // 2. once username is clicked, renders teh feed with a user option
    // Brings us into the renderFeed function and executes on the condition of that user name
      // renders the same tweet format
      // hides the update feed button
      // shows the back button
    // generates a page with only the user's tweets



// Part 2
// User Feed - the update feed button is hidden. the back button is shown (in render function)
  // In render function, back button is hidden;
// Event listener on the back button - once clicked, will render original home feed.
  // In event listener, back button event listener created; once clicked, renders original home feed without user.
// update feed button is now shown.

// create back button like update feed button in the same area.


// updatefeed button updates to back once username is clicked on and then returns when back is clicked
// handleUsernameClick
  // changes update feed button into black button
    // changes button log to split on update feed and join with back
  // rerenders with only user tweets