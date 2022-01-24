jQuery(document).ready(function() {
  jQuery("time.timeago").timeago();
});

$(document).ready(function(){
  var $body = $('body');
  var $app = $('#app');
  $app.html('');

  // Create an h1 element with the text "Twiddler"
  var $header = $('<div id="header"></div>');
  var $title = $('<h1>Twiddler</h1>');
  var $logo = $('<i class="fab fa-twitter fa-4x" id="logo"></i>')
  var $updateIcon = $('<i class="fas fa-sync-alt fa-3x"></i>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $mainContent = $('<div id="mainContent"></div>');
  var $friendsBox = $('<div id="friendsBox"><h2>Friends</h2></div>');
  var $friendsList = $('<ul id="friends-list"></ul>');
  var userArr = Object.keys(streams.users);
  var $feed = $('<div id="feed"></div>');
  var $newTweet = $('<form id="new-tweet-form" onsubmit="return false"></form>');

  var userFilter = false;
  var selectedUser = undefined;

  var renderFeed = function( userClicked) {
    $feed.empty();
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profileContainer = $('<div class="profileContainer"></div>');
      var $profilePhoto = $('<img class="profile-photo" src="' + tweet.profilePhotoURL +'"></img>');
      var $content = $('<div class="content"></div>');
      var $userMeta = $('<div class="userMeta"></div>');
      var $username = $('<span class="username"></span>');
      var $timeStamp = $('<span class="timestamp timeago"></span>');
      var $message = $('<p class="message"></p>');
      var $iconContainer = $('<div class="iconContainer"></div>')
      var $comment = $('<i class="fas fa-comments fa-lg icon comment"></i>');
      var $retweet = $('<i class="fas fa-retweet fa-lg icon retweet"></i>');
      var $like = $('<i class="far fa-heart fa-lg icon like"></i>');
      var $share = $('<i class="fas fa-share fa-lg icon share"></i>');

      $profileContainer.appendTo($tweet);
      $profilePhoto.appendTo($profileContainer);

      $content.appendTo($tweet);
        $userMeta.appendTo($content);
          $username.text('@' + tweet.user);
          $username.prependTo($userMeta);
          $timeStamp.text(jQuery.timeago(tweet.created_at) );
          $timeStamp.appendTo($userMeta);

        $message.text(tweet.message);
        $message.appendTo($content);

        $iconContainer.appendTo($content);
          $comment.appendTo($iconContainer);
          $retweet.appendTo($iconContainer);
          $like.appendTo($iconContainer);
          $share.appendTo($iconContainer);



      if (userFilter) {

        $updateFeed.text('Back');
        if ('@'+tweet.user === userClicked) {
          $tweet.appendTo($feed);
        }
      } else {
        if($updateFeed.text() === 'Back') {
          $updateFeed.text('Update Feed');
          $updateIcon.prependTo($updateFeed);
        }
      $tweet.appendTo($feed);
      }

      $username.on('click', function() {
        selectedUser = $(this).text();
        // alert(selectedUser);
        userFilter = true;
        renderFeed(selectedUser);
      });

      index -= 1;
    }
  };

  var renderFriends = function(event) {
    for (var i = 0; i < userArr.length; i++) {
      var currentUser = userArr[i];
      var $friend = $('<li class="friend"></li>');
      var $friendItem = $('<div class="friendItem"></div>');
      var photoURL = 'assets/img/' + currentUser + '.png';
      var $profilePhoto = $('<img src="' + photoURL + '"></img>');
      //$friendItem.text(userArr[i]);

      var $username = $('<span>' +'@'+currentUser+ '</span>');
      $username.appendTo($friendItem);
      $friend.appendTo($friendsList)
      $friendItem.appendTo($friend);
      $profilePhoto.prependTo($friendItem);

      $friendItem.on('click', function() {
        selectedUser = $(this).text();
        userFilter = true;
        // alert(selectedUser);
        renderFeed(selectedUser);
      });
    }
  }


  //Construction of objects
  $header.appendTo($app);
    $logo.appendTo($header);
    $title.appendTo($header);
    $updateFeed.appendTo($header);
      $updateIcon.prependTo($updateFeed);
  $mainContent.appendTo($app);
    $friendsBox.appendTo($mainContent);
      $friendsList.appendTo($friendsBox);
      renderFriends();
    $feed.appendTo($mainContent);
    $newTweet.appendTo($mainContent);
      $('<input type="username" name="username" placeholder="Username*" required></input><br>').appendTo($newTweet);
      $('<textArea placeholder="Message*" name="twiddle" required></textArea><br>').appendTo($newTweet);
      var $submitButton = $('<input type="submit" value="Twiddle" id="submit-button"></input>');
      $submitButton.appendTo($newTweet);

  //initial render
  renderFeed(selectedUser);

  //Update button functionality
  $updateFeed.on('click', function() {
    userFilter = false;
    selectedUser = undefined;
    renderFeed(selectedUser);
    $('html, body').animate({scrollTop:0}, '300');
  });

  $newTweet.on("submit", function() {
    var newTweet = $newTweet.serializeArray();
    var newUser = newTweet[0].value;
    var newMessage = newTweet[1].value;
    var tweet = {};
    tweet.user = newUser;
    tweet.message = newMessage;
    tweet.created_at = new Date();
    tweet.profilePhotoURL = './assets/img/anonymous.png';
    streams.home.push(tweet);
    renderFeed();
    $newTweet.reset();
  });




  window.isItBeautifulYet = true;
});
