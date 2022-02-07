var lowIndex = 0;
// var highIndex = 10; //11 tweets total
var $feed = $('#feed'); //where tweets are stored
var feedState = 0;  //0 if feed is alltweets/ 1 if usertweets

// var $j = jQuery.noConflict();
$(document).ready(function(){
  var $app = $('#app');
  jQuery("time.timeago").timeago();
  //LOAD INITIAL TWEETS_____________________________________________
  clearUserFeed(1);
  renderTweets(undefined);

  //IF UPDATE FEED CLICKED________________________________________________

  $('#update-feed').click(function(){
    console.log("=> inside #update-feed.click(function()");
    if (feedState === 1) {
      clearUserFeed(1); //clear feed, set text back to "Update Feed"
      renderTweets(undefined);
      feedState = 0;
    }
    if (feedState ===0) {
      clearUserFeed(1);
      renderTweets(undefined);
    }
    //USERNAMES CLICKED ________________________________________
    $('.douglascalhoun').click(function(){
      console.log("douglascalhoun clicked________________________", "\n", "\n");
      clearUserFeed(0); //clear feed + set button to back
      renderTweets('douglascalhoun');
      feedState = 1; //feedstate = 1
    });
    $('.mracus').click(function(){
      console.log("mracus clicked________________________", "\n", "\n");
      clearUserFeed(0); //clear feed + set button to back
      renderTweets('mracus');
      feedState = 1; //feedstate = 1
    });
    $('.sharksforcheap').click(function(){
      console.log("sharksforcheap clicked________________________", "\n", "\n");
      clearUserFeed(0); //clear feed + set button to back
      renderTweets('sharksforcheap');
      feedState = 1; //feedstate = 1
    });
    $('.shawndrost').click(function(){
      console.log("shawndrost clicked________________________", "\n", "\n");
      clearUserFeed(0); //clear feed + set button to back
      renderTweets('shawndrost');
      feedState = 1; //feedstate = 1
    });

  });
  $('#update-feed').hover(function(e) {
    $(e.target).css('background-color', 'red');
  }, function(e) {
    $(e.target).css('background-color', 'white');
  });




}); //end of DocumentReady



function renderTweets(user){
  console.log("=> inside function renderTweets(user)");
  var homeStream;
  console.log('\t argument user is ', user);
  if (user === undefined) {
    homeStream = streams.home;
    console.log('\t user was', user);
    console.log('\t homeStream is all of homestream', homeStream);
    console.log('\t homeStream.length  = ', homeStream.length);
  }
  else {
    homeStream = streams.users[user];
    console.log('\t ELSE user was', user);
    console.log('\t homeStream is filtered with user', homeStream);
    lowIndex = 0;
  }
    console.log("\t about to enter while loop with lowIndex, homeStream.length-1 ", lowIndex, homeStream.length-1);

    while(lowIndex <= homeStream.length-1){
      var tweetObj = homeStream[lowIndex];
      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<p class="username"></p>');
      var $message = $('<p class="message"></p>');

      var $timestamp = $('<p class="timestamp"></p>');
      loadWhichPicture(tweetObj, $tweet);
      loadIcons($tweet);

      $timestamp.attr('timestamp-data', tweetObj.created_at).html('<span data-livestamp="'+ tweetObj.created_at + '"></span>').appendTo($tweet);
      $username.addClass(tweetObj.user).data('userdata', tweetObj.user).text('@' + tweetObj.user).appendTo($tweet); //username -> tweet
      $message.text(tweetObj.message).appendTo($tweet); //message -> tweet
      var timeTweetCreatedAt = jQuery.timeago(tweetObj.created_at);
      $timestamp.text(timeTweetCreatedAt).appendTo($tweet);// show date created at
      $tweet.prependTo($feed); //instead of prepend
      lowIndex += 1;
      console.log("\t lowindex changed to", lowIndex);
    }
    lowIndex = 0;
}

//CLEARS FEED + CHANGES BUTTON TEXT (UPDATE FEED OR BACK)
function clearUserFeed(feedState) {
  //clear feed
    console.log("**Inside clearUserFeed");
    for (var i=0; i<500; i++){
      $('#feed .tweet').remove();
    }
    console.log("\t removed all the feed");
    if (feedState === 0){
      console.log("\t change BUTTON text to BACK");
      $("#update-feed").text("Back"); //change button to "back"
    }
    else{
      console.log("\t change BUTTON text to UPDATE FEED");
      $("#update-feed").text("Update Feed" );
    }
}
//LOAD PROFILE PICTURES _______________________________________________
function loadWhichPicture(tweetObj, $tweet) { //input obj + div, returns correct html element
  var $profilePic;
  // console.log("inside loadwhich pictures, tweetobj is", tweetObj);
  switch(tweetObj.user) {
    case 'shawndrost':
      $profilePic = $('<img src = "/assets/img/shawndrost.jpg" class ="profile-photo" alt = "douglascalhoun">');
      break;
    case 'mracus':
      $profilePic = $('<img src = "/assets/img/mracus.jpg" class ="profile-photo" alt = "douglascalhoun">');
      break;
    case 'sharksforcheap':
      $profilePic = $('<img src = "/assets/img/sharksforcheap.jpg" class ="profile-photo" alt = "douglascalhoun">');
      break;
    case 'douglascalhoun':
      $profilePic = $('<img src = "/assets/img/douglascalhoun.jpg" class ="profile-photo" alt = "douglascalhoun">');
       break;
    default:
      // code block
  }
  $profilePic.appendTo($tweet);

}
//LOAD ICONS __________________________________________________________
function loadIcons($tweet) {
  // var $likeIcon = $('<a href="index.html"><img src="/assets/icons/like.svg" class="icon like" ></a>');
//   var $commentIcon = $('<a href="index.html"><img src="/assets/icons/comment.svg" class="icon comment" ></a>');
//   var $retweetIcon = $('<a href="index.html"><img src="/assets/icons/retweet.svg" class="icon retweet" ></a>');
//   var $shareIcon = $('<a href="index.html"><img src="/assets/icons/share.svg" class="icon share" ></a>');

  var $likeIcon = $('<i class="far fa-heart icon like"></i>');
  var $commentIcon = $('<i class="far fa-comment icon comment"></i>');
  var $retweetIcon = $('<i class="fas fa-retweet icon retweet"></i>');
  var $shareIcon = $('<i class="fas fa-share icon share"></i>');
  $likeIcon.appendTo($tweet);
  $commentIcon.appendTo($tweet);
  $retweetIcon.appendTo($tweet);
  $shareIcon.appendTo($tweet);
}




window.isItBeautifulYet = true


