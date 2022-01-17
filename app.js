$(document).ready(function(){
//Select alredy existing elements
var $app = $('#app');
$app.html('');
//Create new HTML elements
var $title = $('<h1>Twiddler</h1>')
var $button = $('<button>Update Feed</button>');
$button.attr({ID:'update-feed', type:'button'});
var $homeFeed = $('<div id=feed><div>');




//Append new HTMLelements to the DOM
$("#app").append($title);
$("#app").append($button);
$("#app").append($homeFeed);


//Create event handler funcrtions
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

renderFeed();


var buttonClickhandler = function() {
  if ($(this).val() === 'Update Feed'){
    renderFeed();
  } else {
    $(this).text("Update Feed");
    renderFeed();
  }
  $('.username').on('click', uernameClickHandler);
}


var uernameClickHandler = function(event){
  var userName = $(this).attr('id');
  renderFeed(userName);
  $('#update-feed').text("Back");
}

//Set event listeners
$button.on('click', buttonClickhandler)

$('.username').on('click', uernameClickHandler)


// $('i').hover(function(){
//   $(this).css("background-color", "white");
// }, function(){
//     $(this).css("background-color", "red");
//   });






});

