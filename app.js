$(document).ready(function(){
//Select alredy existing elements
var $app = $('#app');
$app.html('');

//Create new HTML elements
var $title = $('<h1>Twiddler</h1>')
var $button = $('<button>Update Feed</button>');
$button.attr({ID:'update-feed', type:'button'});
var $homeFeed = $('<div id="feed"><div>');
var $friendsList = $('<ul id="friends-list">Friends List</ul>');
var $postTweet = $('<form id="new-tweet-form"></form>');
var $tweetForm = $('<div id="tweetForm"><div>')
var $friendLs = $('<div id="friendLs"><div>')

//Append new HTMLelements to the DOM
$("#app").append($title);
$("#app").append($button);
$("#app").append($homeFeed);
$("#app").append($tweetForm);
$("#app").append($friendLs);
$postTweet.html(' <label for="formUserName">Username</label>\
<input type="text" id="formUserName" name="username">\
<label for="newTweet">New Tweet</label>\
<input type="text" alight = "left" id="newTweet" name="message">\
<button id="submit" form="new-tweet-form" type="button">Submit</button>');
$postTweet.appendTo($tweetForm)
$friendLs.append('<h4>Friend List</h4>');
$friendLs.append($friendsList);



//Create event handler functions
var renderFeed = function(user) {
  $("#feed").empty();
  var targetStreams = [];
  if(user === undefined) {
  targetStreams = streams.home;
  }
  else {
    targetStreams = streams.users[user];
  }

  for (var i = 0; i < targetStreams.length; i += 1) {
    var curTweet = targetStreams[i];
    var curUser = curTweet.user;
    var curMessage = curTweet.message;
    var $tweet = $('<div class="tweet"></div>');
    var $userImage = $('<image class="profile-photo">');
    var $userName = $('<div class="username">username</div>');
    var $message = $('<p class="message">tweetmsg</p>')
    var $timeStamp = $('<div class="timestamp">timestamp</div>')
    var $icon1 = $('<i class="fas fa-comment-dots comment" type="icon"></i>');
    var $icon2 = $('<i class="fas fa-retweet retweet" type="icon"></i>');
    var $icon3 = $('<i class="fas fa-thumbs-up like" type="icon"></i>');
    var $icon4 = $('<i class="fas fa-share share" type="icon"></i>');
    $userImage.attr({src: curTweet.profilePhotoURL, alt: 'profile photo'});
    $userName.text("@" + curUser);
    $userName.attr({id: curUser});
    $message.text(curMessage);
    $timeStamp.text(jQuery.timeago(curTweet.created_at));
    $tweet.append($userImage, $userName, $message, $timeStamp, $icon1, $icon2, $icon3, $icon4);
    $tweet.prependTo($homeFeed);
  }
};

var updateFriendList = function() {
  $friendsList.empty();
  for (current in streams.users) {
    if (current !== "" && current !== undefined) {
      $friends = $('<li></li>');
      $friends.attr({'id': current, 'class': "friend"});
      $friends.text('@' + current);
      $friends.appendTo($friendsList);
    }
  }

};

// initial settings
renderFeed();
updateFriendList();


var buttonClickhandler = function() {
  if ($(this).val() === 'Update Feed'){
    renderFeed();
    updateFriendList();
  } else {
    $(this).text("Update Feed");
    renderFeed();
  }
  $('.username').on('click', uernameClickHandler);
  $('li').on('click', uernameClickHandler);
}


var uernameClickHandler = function(event){
  var userName = $(this).attr('id');
  renderFeed(userName);
  $('#update-feed').text("Back");
}


//Set event listeners
$button.on('click', buttonClickhandler);

$('.username').on('click', uernameClickHandler)

$('#submit').on('click', function(){
  var newTweet = document.getElementById('newTweet').value

  visitor= document.getElementById('formUserName').value;
  writeTweet(newTweet);
  renderFeed();
  updateFriendList();
  document.getElementById('newTweet').value = '';
  visitor= document.getElementById('formUserName').value = '';

  $('li').on('click', uernameClickHandler);
  $('.username').on('click', uernameClickHandler);
});

$('li').on('click', uernameClickHandler);

});

 window.isItBeautifulYet = true

