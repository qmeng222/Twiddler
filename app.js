var visitor = '';
$(document).ready(function() {
  var $app = $('#app');
  $app.html('');

  $('<div id="sidebar"></div>').appendTo($app);
  $('<header><h1>Twiddler</h1></header>').appendTo('#sidebar');
  $('<div id="search"><input id="searchbar" type="search" placeholder="Search tweets"><button id="searchbtn" class="button"><i id="searchIcon" class="fas fa-search"></i></button></div>').appendTo('#sidebar');
  $('<button id="update-feed" class="button">Update Feed</button>').appendTo('#sidebar');
  $('<button id="friends" class="button has-hover">Friends</button>').appendTo('#sidebar');
  $('<div id="feed"></div>').appendTo($app);


  $feed = $('#feed');
  $updateFeed = $('#update-feed');

  var updateFeed = function() {
    var id = $(this).attr('id');
    if (id === 'searchbtn') {
      var term = $('#searchbar').val();
      if (term !== '') {
        renderFeed(undefined, term);
        $('#searchbar').val('');
        $updateFeed.html('Back');
      }
    } else {
      $('#friends-list').remove();
      $('#friends').removeClass('pressed');
      renderFeed();
      $updateFeed.html('Update Feed');
    }
  };

  var handleUsernameClick = function() {
    $('.friend').removeClass('pressed');
    $(this).addClass('pressed');
    renderFeed(this.innerText.slice(1));
    $updateFeed.html('Back');
  };

  //populate feed
  var renderFeed = function(inputUser, term) {

    //get tweets
    var index = streams.home.length - 1;
    if (term) {
      var tweets = [];
      for (var i = 0; i <= index; i++) {
        var message = streams.home[i].message;
        if (message.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
          tweets.push(streams.home[i]);
        }
      }
      index = tweets.length - 1;
    } else if (inputUser) {
      index = streams.users[inputUser].length - 1;
    }

    //clear feed
    $($feed).empty();

    //add the create a tweet card to the top of the feed
    var $tweet = $('<form id="new-tweet-form" class="newTweet"</form>');
    $tweet.appendTo($feed);
    $tweet = $('#new-tweet-form');
    $('<div id="leftside"><label for="inputUser" id="inputTxt">@<input name="username" id="inputUser" placeholder="Username"></label></div>').appendTo($tweet);
    $('<label for="inputTweet"></label><input name="message" id="inputTweet" placeholder="Type message here"></input>').appendTo($tweet);
    $('<button id="submit" class="button">Post</button>').appendTo($('#leftside'));
    $('#submit').click(createTweet);

    //create and add tweet cards to feed
    while (index >= 0) {
      var tweet = inputUser ? streams.users[inputUser][index] : term ? tweets[index] : streams.home[index];
      var img = '<img src="' + tweet.profilePhotoURL + '" class="profile-photo" width="40px" height="40px">';
      var user = '<span class="username">@' + tweet.user + '</span>';
      var message = '<div class="message"><p>' + tweet.message + '</p></div>';
      var timestamp = '<div class="timestamp">' + $.timeago(tweet.created_at) + '</div>';
      var icons = '<i class="comment icon far fa-comments fa-lg"></i><i class="retweet icon fas fa-retweet fa-lg"></i>';
      icons += '<i class="like icon far fa-heart fa-lg"></i><i class="share icon far fa-share-square fa-lg"></i>';
      var $tweet = $('<div class="tweet"></div>');
      $tweet.append('<div class="leftside">' + img + user + '</div>');
      $tweet.append(message);
      $tweet.append('<div class="break"></div>');
      $tweet.append('<div class="rightside">' + timestamp + '<div class="iconcontainer">' + icons + '</div></div>');
      $tweet.appendTo($feed);
      index -= 1;
    }
    $('.leftside').click(handleUsernameClick);
  };

  //friends dropdown on sidebar
  var renderFriends = function() {
    if ($('#friends-list').length > 0) {
      $('#friends-list').remove();
      $(this).removeClass('pressed');
    } else {
      var $friends = $('<ul id="friends-list"></ul>');
      var count = 0;
      for (var key in streams.users) {
        if (count < 4) {
          var image = '<img src="assets/img/' + key + '.png" class="profile-photo">';
        } else {
          var image = '<img src="assets/img/visitor.png" class="profile-photo">';
        }
        var user = '@' + key;
        var $friend = $('<li class="friend button">' + image + user + '</li>');
        $friends.append($friend);
        count++;
      }
      $friends.appendTo('#sidebar');
      $(this).addClass('pressed');
    }
    $('.friend').click(handleUsernameClick);
  };

  //custom tweet
  var createTweet = function() {
    var user = $('#inputUser').val();
    var message = $('#inputTweet').val();
    visitor = user;
    writeTweet(message);
    updateFeed();
  };

  //clicks
  renderFeed();
  $('#friends').click(renderFriends);
  $($updateFeed).click(updateFeed);
  $('#searchbtn').click(updateFeed);

  // enter key for search bar
  var input = document.getElementById('searchbar');
  input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('searchbtn').click();
    }
  });
});
window.isItBeautifulYet = true;