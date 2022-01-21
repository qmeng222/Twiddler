"use strict";
var visitor = '';
$(document).ready(function() {
  var $app = $('#app');
  $app.html('');

  var creator = function(element) {
    var str = '<' + element;
    for(var i = 0; i < arguments.length; i++) {
      if (i > 0) {
        str += ' ' + arguments[i];
      }
    }
    if (element === 'img') {
      str +='>';
    } else {
      str += '></' + element + '>';
    }
    return $(str);
  };

  creator('div', 'id="sidebar"').appendTo($app);
  var $sidebar = $('#sidebar');
  creator('header').append(creator('h1').append('Twiddler')).appendTo($sidebar);
  var $searchBar = creator('input', 'id="searchbar"', 'type="search"', 'placeholder="search tweets"');
  var $searchBtn = creator('button', 'class="button"', 'id="searchbtn"');
  $searchBtn.append(creator('i', 'class="fas fa-search"', 'id="searchIcon"'));
  creator('div', 'id="search"').append($searchBar).append($searchBtn).appendTo($sidebar);
  creator('button', 'class="button"', 'id="update-feed"').append('Update Feed').appendTo($sidebar);
  creator('button', 'class="button has-hover"', 'id="friends"').append('Friends').appendTo($sidebar);
  creator('div', 'id="feed"').appendTo($app);

  var $feed = $('#feed');
  var $updateFeed = $('#update-feed');

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


  var newTweetFormCreator = function() {
    var $tweet = creator('form', 'class="newTweet"', 'id="new-tweet-form"');
    $tweet.appendTo($feed);
    $tweet = $('#new-tweet-form');
    var $leftside = creator('div', 'id="leftside"');
    var $userLabel = creator('label', 'for="inputUser"', 'id="inputTxt"').text('@');
    var $userInput = creator('input', 'name="username"', 'id="inputUser"', 'placeholder="Username"');
    creator('div', 'id="tweetInput"').append($userLabel).append($userInput).appendTo($leftside);
    $leftside.appendTo($tweet);
    var $tweetLabel = creator('label', 'for="inputTweet"');
    var $tweetInput = creator('input', 'name="message"', 'id="inputTweet"', 'placeholder="Type message here"');
    $tweet.append($tweetLabel);
    $tweet.append($tweetInput);
    creator('button', 'class="button"', 'id="submit"').text('Submit').appendTo($leftside);
    $('#submit').click(createTweet);
  };


  var addTweets = function(inputUser, term) {
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
    while (index >= 0) {
      var tweet = inputUser ? streams.users[inputUser][index] : term ? tweets[index] : streams.home[index];
      var $img = creator('img', 'src="' + tweet.profilePhotoURL + '"', 'class="profile-photo"','width="40px"', 'height="40px"');
      var $user = creator('span', 'class="username"').text('@' + tweet.user);
      var $message = creator('div', 'class="message"').append(creator('p').text(tweet.message));
      var $timestamp = creator('div', 'class="timestamp"').text($.timeago(tweet.created_at));
      var $iconComment = creator('i', 'class="comment icon far fa-comments fa-lg"');
      var $iconRetweet = creator('i', 'class="retweet icon fas fa-retweet fa-lg"');
      var $iconLike = creator('i', 'class="like icon far fa-heart fa-lg"');
      var $iconShare = creator('i', 'class="share icon far fa-share-square fa-lg"');
      var $icons = creator('div', 'class="iconcontainer"').append($iconComment).append($iconRetweet).append($iconLike).append($iconShare);
      var $tweet = creator('div', 'class="tweet"');
      $tweet.append(creator('div', 'class="leftside"').append($img).append($user));
      $tweet.append($message);
      $tweet.append(creator('div', 'class="rightside"').append($timestamp).append($icons));
      $tweet.appendTo($feed);
      index -= 1;
    }
    $('.leftside').click(handleUsernameClick);
  };

  //populate feed
  var renderFeed = function(inputUser, term) {
    //clear feed
    $($feed).empty();
    //add the create a tweet form to the top of the feed
    newTweetFormCreator();
    //create and add tweets cards to feed
    addTweets(inputUser, term);
  };

  //friends dropdown on sidebar
  var renderFriends = function() {
    if ($('#friends-list').length > 0) {
      $('#friends-list').remove();
      $(this).removeClass('pressed');
    } else {
      var $friends = creator('ul', 'id="friends-list"');
      var count = 0;
      for (var key in streams.users) {
        if (count < 4) {
          var $image = creator('img', 'src="assets/img/' + key + '.png"', 'class="profile-photo"');
        } else {
          var $image = creator('img', 'src="assets/img/visitor.png"', 'class="profile-photo"');
        }
        var user = '@' + key;
        console.log($image);
        var $friend = creator('li', 'class="friend button"').append($image).append(user);
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