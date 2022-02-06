//data_generator.js - creates two global variables users and streams

//users - array of strings all the usernames that you're following
          //4 of them -mracus, douglascalhoun, shawndrost, sharksforcheap

//streams - object with two properties : users and home
    //streams.home - array of all tweets from all users you're following

    //streams.users - object with properties for each user
    //streams.users.shawndrost ha all of shawndrosts tweets

//window.streams
// {
//   home: array,
// users: { 4 keys}
// }
//window.users
var lowIndex = 0;
var currentIndex = streams.home.length - 1; //10 at start
var $timeline = $('.timeline'); //where tweets are stored

//LOAD DEFAULT__________________________________________________
$(document).ready(function(){
  var $app = $('#app');
  // $app.html('');
  while(currentIndex >= lowIndex){ //loads 11 tweets
    var tweetObj = streams.home[currentIndex];
    var $tweet = $('<div class="tweet_normal tweet_mouseover"></div>');
    loadWhichPicture(tweetObj, $tweet);
    var $userName = $('<p class="userName"></p>');
    var $message = $('<p class="message"></p>');
    loadIcons($tweet);
    var $timestamp = $('<p class="timestamp"></p>');
    //find time created at
    console.log(tweetObj.created_at);
    var timeTweetCreatedAt = jQuery.timeago(tweetObj.created_at);

    $timestamp.attr('timestamp-data', tweetObj.created_at).html('<span data-livestamp="'+ tweetObj.created_at + '"></span>').appendTo($tweet);
    // loadTimes11toCurrent(['Just now'],$tweet);

    $userName.addClass(tweetObj.user).data('userdata', tweetObj.user).text('@' + tweetObj.user).appendTo($tweet); //username -> tweet
    $message.text(tweetObj.message).appendTo($tweet); //message -> tweet
    $timestamp.text(timeTweetCreatedAt).appendTo($tweet);

    $tweet.appendTo($timeline); //tweet -> DOM
    currentIndex -= 1;
  }
  lowIndex = 11;
  currentIndex = streams.home.length;

  //when mouse goes over icons, we change gradient background color
  $('.icon').mouseover(function(e) {
    $('.tweet_normal').toggleClass("tweet_mouseover"); //you can list several class names
    e.preventDefault();
  });

});

//UPDATE BUTTON__________________________________________________
$('.update-btn').click(function(){
  countTotalTweets();
  console.log('lowindex, currentindex is', lowIndex,currentIndex);
  showNewTweets(lowIndex, currentIndex, $timeline);//new tweets -> DOM
  lowIndex = currentIndex + 1;

  var timestampsArr = $('.timestamp'); //collect array with class timestamps
  var tempTime ='';


  // console.log('timeStampsArr after shownewTweets is', timestampsArr);

  for (var i=0; i<timestampsArr.length;i++) {  //iterate and format strings to just include Date
    tempTime = timestampsArr[i].innerHTML.slice(22);
    tempTime = tempTime.substring(0, tempTime.length - 9);
    timestampsArr[i] = tempTime;
  }

  var differenceTimesArr = []; //fill this with currentTime - timestampsArr[i] to find difference
  var currentTime = new Date();
  for (var i=0; i<timestampsArr.length;i++) {
    var diffInSeconds = diff_seconds(currentTime, new Date(timestampsArr[i]));
    var diffInHMS= (humanReadable(diffInSeconds));
    differenceTimesArr[i] = diffInHMS;
  }
  // loadTimes11toCurrent(differenceTimesArr);
});

function countTotalTweets(){
  console.log('total tweets is ____' , currentIndex+1);
};

function loadTimes11toCurrent(differenceTimesArr){
  var allTweetDivs = ($( ".tweet_normal" ).get()) //array
  var $timestampMsg = $('<p class="timestampMsg"></p>'); //single dom

  if (differenceTimesArr[0]==='Just now'){
    for (var i =0; i < 11; i++){
      $timestampMsg.text('Just now').appendTo(allTweetDivs[i]);
    }
  }
  else {
    //piece together string

    for (var j =0; j< allTweetDivs.length; j++){
      console.log(" in here");
      if ($(allTweetDivs[i].hasClass("timestampMsg"))){
        console.log("uhmm okay");
      }

      var $timestampMsg1 = $('<p class="timestampMsg"></p>'); //single dom

      $timestampMsg1.text('yo yo yo').appendTo(allTweetDivs[j]);
    }
  }
}

//SHOW NEW TWEETS
function showNewTweets(lowIndex, currentIndex, $timeline){
  while(lowIndex <= currentIndex){
    var tweetObj = streams.home[lowIndex];
    var $tweet = $('<div class="tweet_normal tweet_mouseover"></div>');
    loadWhichPicture(tweetObj, $tweet);
    var $userName = $('<p class="userName"></p>');
    var $message = $('<p class="message"></p>');
    loadIcons($tweet);
    var $timestamp = $('<p class="timestamp"></p>');
    $timestamp.attr('timestamp-data', tweetObj.created_at).html('<span data-livestamp="'+ tweetObj.created_at + '"></span>').appendTo($tweet);
    $userName.addClass(tweetObj.user).data('userdata', tweetObj.user).text('@' + tweetObj.user).appendTo($tweet); //username -> tweet
    $message.text(tweetObj.message).appendTo($tweet); //message -> tweet
    var timeTweetCreatedAt = jQuery.timeago(tweetObj.created_at);
    $timestamp.text(timeTweetCreatedAt).appendTo($tweet);// show date created at
    $tweet.prependTo($timeline); //instead of prepend
    lowIndex += 1;
  }
}


//LOAD PROFILE PICTURES _______________________________________________
function loadWhichPicture(tweetObj, $tweet) { //input obj + div, returns correct html element
  var $profilePic;
  switch(tweetObj.user) {
    case 'shawndrost':
      $profilePic = $('<img src = "/assets/img/shawndrost.jpg" class ="profilePic" alt = "douglascalhoun">');
      break;
    case 'mracus':
      $profilePic = $('<img src = "/assets/img/mracus.jpg" class ="profilePic" alt = "douglascalhoun">');
      break;
    case 'sharksforcheap':
      $profilePic = $('<img src = "/assets/img/sharksforcheap.jpg" class ="profilePic" alt = "douglascalhoun">');
      break;
    case 'douglascalhoun':
      $profilePic = $('<img src = "/assets/img/douglascalhoun.jpg" class ="profilePic" alt = "douglascalhoun">');
       break;
    default:
      // code block
  }
  $profilePic.appendTo($tweet);

}
//LOAD ICONS __________________________________________________________
function loadIcons($tweet) {
  var $likeIcon = $('<a href="index.html"><img src="/assets/icons/like.svg" class="icon" ></a>');
  var $commentIcon = $('<a href="index.html"><img src="/assets/icons/comment.svg" class="icon" ></a>');
  var $retweetIcon = $('<a href="index.html"><img src="/assets/icons/retweet.svg" class="icon" ></a>');
  var $shareIcon = $('<a href="index.html"><img src="/assets/icons/share.svg" class="icon" ></a>');
  $likeIcon.appendTo($tweet);
  $commentIcon.appendTo($tweet);
  $retweetIcon.appendTo($tweet);
  $shareIcon.appendTo($tweet);

}

//update currentIndex every 5 seconds
(function updateCurrentIndex() {
  currentIndex = streams.home.length-1;
    setTimeout(function() {
      updateCurrentIndex();
    }, 50)
})(); //IIFE

//SEC -> HH:MM:SS__________________________________________________
function humanReadable (totalSeconds) {
  let rtnStr = '';
  let hours = Math.floor(totalSeconds/3600);
  totalSeconds %=3600; //this means - store the remainder
  let minutes = Math.floor(totalSeconds/60);
  let seconds = totalSeconds %60;
  //format them
  seconds = Math.floor(underTenAddZero(seconds));
  minutes = underTenAddZero(minutes);
  hours = underTenAddZero(hours);
  rtnStr = `${hours}:${minutes}:${seconds}`; //make number into string
  function underTenAddZero(number){
    if (number<10){
      let temp = number.toString();
      temp = "0"+temp;
      return temp;
    }
    return number;
  }
  return rtnStr;
}
//returns seconds between two dates
function diff_seconds(dt2, dt1)
{
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  return diff;
}


