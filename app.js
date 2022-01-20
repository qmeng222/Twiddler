$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  // $app.html('');

  // Helper Function that calculates the timestamp
  var calcTimestamp = function (time) {
    var secondsNow = Math.floor(Date.now() / 1000);
    var timestamp = secondsNow - time;

    if (timestamp < 10) {
      return 'a few seconds ago';
    } else if (timestamp > 10 && timestamp < 60) {
      return '' + timestamp + ' seconds ago';
    }

    timestamp = Math.floor(timestamp / 60); //converted into minutes
    if (timestamp === 1) {
      return "1 minute ago";
    } else if (timestamp > 1 && timestamp < 60) {
      return  '' + timestamp + ' minutes ago';
    }

    timestamp = Math.floor(timestamp / 60); // converted into hours
    if (timestamp >= 1 && timestamp < 23) {
      return  '' + timestamp + ' hours ago';
    }
  }

  //Helper Function for creating a new Tweet
  var createTweet = function(tweetObj){
    // console.log('tweet obj from creator: ', tweetObj);
    var userhandle = '@' + tweet.user;
    var timestamp = calcTimestamp(tweet.unixInSeconds);
    var message = tweet.message;

    return '<div class="circular--portrait user-photo">\
      <img src="' + tweet.profilePhotoURL +'" alt="user\'s profile picture"/>\
    </div>\
    <div class="card-info">\
      <span class="user-handle">' + userhandle +'</span> ◆\
      <time class="timeago timestamp"><em>' + timestamp + '</em></time>\
      <div class="message">' + message + '</div>\
      <div class="icons">\
        <i class="far fa-heart"></i>\
        <i class="far fa-comment"></i>\
        <i class="fas fa-retweet"></i>\
        <i class="far fa-share-square"></i>\
      </div>\
  </div>'
  }

  // Tweet Element
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.html(createTweet(tweet));

    // var $cards = $('#cards');
    // console.log('$cards: ', $cards);
    $tweet.appendTo('#cards');
    index -= 1;
  }

  // Event Listener for the Refresh Button
  $('#home').click(function() {
    location.reload();
  });


  // Creating new tweet from form
  $('.add-tweet').on('click', 'button', function() {
    // when I finish with this, use addTweet({})
    //create an object with user, message, created_at, unixInSeconds, profilePhotoURL
    //invoke
    var userTweet = {};
    userTweet.message = $('.add-tweet input').val();
    // userTweet.user =

    var timestamp = Math.floor(Date.now() / 1000);
    var user = $('.user').last();
    console.log('user: ', user)

    var html = '<div class="tweet">\
    <div class="circular--portrait user-photo"><img ' + '/>\
    </div>\
    <div class="card-info">\
      <span class="user-handle">' + '@' + user + '</span> ◆\
      <span class="timestamp"><em>' + calcTimestamp(timestamp) + '</em></span>\
      <div class="message">' + value + '</div>\
      <div class="icons">\
        <i class="far fa-heart"></i>\
        <i class="far fa-comment"></i>\
        <i class="fas fa-retweet"></i>\
        <i class="far fa-share-square"></i>\
      </div>\
    </div>\
  </div>';
  //  $(html).appendTo(".cards");
  })
});

  // TO DO LIST:
    // make the tweet form work
    // add event listener to the button post to add to html
      // make sure the tweet appears with main profile picture
      //make sure tweet appears with main user handle

    // make the search username form work by filtering the user out while typing
      //when that happens, refresh button toggles to become the home button

    // clicking in a friend's name will show all his tweets
      //when that happens, refresh button toggles to become the home button

    // event listener to logout
      //popup window shows up to change the name and handle

    //if new user gets added, the last username gets added to the friend's list

    //make friend's list in order of tweets added -- instead of hard code