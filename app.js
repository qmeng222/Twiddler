$(document).ready(function(){
  var $app = $('#app');
  // $app.html('');



// Title click msg
var $title = $('#title');
$title.on('click', function(event) {
  alert('Welcome to ' + event.target.innerText + ' !');
});


//update friends list function


$friendsList = $('#friends-list');
function updateFriendsList(){
  $friendsList.html('');
  for (var user in streams.users) {
    $userId = $('<li class="username "></li>');
    $userId.attr({'id' : user});
    $userId.text('@' + user);
    $userId.appendTo($friendsList);
  }
}


// render tweet function

  var $tweetSection = $('#feed');
  var initFriendLists = Object.keys(streams.users).slice(0);


  function renderTweet(tweet) {
    var $tweetBox = $('<div class="tweet"></div>');
    var $tweetBox = $('<div class="tweet"></div>');
    var $tweetHeader = $('<div class="tweet-header"></div>');
    var $tweetFooter = $('<div class="tweet-footer"></div>');
    var $profile = $('<div class="profile"></div>');
    var $profileImg = $('<img class="profile-photo" alt="profile-photo" >');
    var imgLink = "assets/img/"
    var $tweetMsg = $('<div class="message"></div>');
    var $userID = $('<div class="username"></div>');
    var $timeStamp = $('<span class="timestamp"></span>');
    var $iconComments = $('<div class="tweet-icons"><i class="far fa-comments comment"></i></div>');
    var $iconRetweet = $('<div class="tweet-icons"><i class="fas fa-retweet retweet"></i></div>');
    var $iconLike = $('<div class="tweet-icons"><i class="far fa-heart like"></i></div>');
    var $iconShare = $('<div class="tweet-icons"><i class="far fa-share-square share"></i></div>');

    $tweetHeader.appendTo($tweetBox);
    $profile.appendTo($tweetHeader);

    if(initFriendLists.includes(tweet.user)){
      imgLink +=tweet.user + ".png";
    }else{
      imgLink +='visitor.png';
    }
    $profileImg.attr("src", imgLink);
    $profileImg.appendTo($profile);


    $userID.appendTo($profile);
    $userID.append('@' + tweet.user );
    $userID.attr({'id' : tweet.user});
    $tweetMsg.append(tweet.message);
    $tweetMsg.appendTo($tweetHeader);
    $timeStamp.append(jQuery.timeago(tweet.created_at));
    $tweetFooter.append($timeStamp, $iconComments, $iconRetweet, $iconLike, $iconShare);
    $tweetFooter.appendTo($tweetBox);
    return $tweetBox;
  }


//load tweet function
  function loadTweets(tweets) {
    $tweetSection.html('');

    var index = tweets.length - 1;
    while(index >= 0){
      var tweet = tweets[index];
      var blockDiv = $("<div>").addClass("block").appendTo($tweetSection);
      var newTweetBlock = renderTweet(tweet)
      newTweetBlock.appendTo(blockDiv);
      index -= 1;
    }


  }









//Inital load of random tweets when the webpage was loaded.
loadTweets(streams.home);
updateFriendsList();




//click update feed btn to re-render the feed with the most current list of users.

  var $feedUpdateBtn = $('#update-feed');
  $feedUpdateBtn.on('click', function(){

    loadTweets(streams.home);

  });



//click username to re-render the feed with the most current list of specific user's tweets.

function userTimeline(userId) {

  loadTweets(streams.users[userId]);
  $feedUpdateBtn.text('Back');
}

$('.username').on('click', function(event){
  var userID = event.target.innerText;

  userTimeline(userID.slice(1));

});


//back to homepage btn
function backToHomepage(){

  $feedUpdateBtn.text('Update Feed');
  loadTweets(streams.home);

}

$feedUpdateBtn.on('click', function(){

  backToHomepage();

  $('.username').on('click', function(event){
    var userID = event.target.innerText;

    userTimeline(userID.slice(1)); //this will exclude the '@'

  });

});




//post new tweet
$('#post-tweet-btn').on('click', function(){
  var newTweet = document.getElementById('new-tweet').value
  visitor = document.getElementById('new-user').value;
  writeTweet(newTweet);
  loadTweets(streams.home);
  updateFriendsList();
  document.getElementById('new-tweet').value = '';
  document.getElementById('new-user').value = '';
  $('.username').on('click', function(event){
    var userID = event.target.innerText;

    userTimeline(userID.slice(1));

  });


});




window.isItBeautifulYet = true


});

