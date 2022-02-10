$(document).ready(function(){
   // Select already existing elements
  var $app = $('#app');
  $app.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<img class=""profile-photo src="'+ tweet.profilePhotoURL +'">');
    var $username = $('<div class="username"><h4>@'+ tweet.user +'</h4></div>');
    var $message = $('<p class="message">' + tweet.message + '</p>');
    var postTime = jQuery.timeago(tweet.created_at);
    var $timeStamp = $('<div class="timestamp"><h5>'+ postTime +'</h5></hiv>');
    var $icon = $('<div class="row"></div>');

    $tweet.appendTo($app);
    $icon.append('<div class"icons><i class="icons column comment fa-solid fa-message"></i></div>');
    $icon.append('<div class"icons><i class="icons column retweet fa-solid fa-retweet"></i></div>');
    $icon.append('<div class"icons><i class="icons column like fa-brands fa-gratipay"></i></div>');
    $icon.append('<div class"icons"><i class="icons column share fa-solid fa-share"></i></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);

    $profilePhoto.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timeStamp.appendTo($tweet);

    $icon.appendTo($tweet);

    index -= 1;
  }

  $(".icons").hover(function() {
    $(this).css("background-color", "white");
}, function() {
    $(this).css("background-color", "black");
});





  $(".icons").hover(function() {
    $(this).css("background-color", "white");
}, function() {
    $(this).css("background-color", "black");
});

  $(".row").css('display','flex');
  $(".column").css('padding', '5px');
  $(".column").css('flex');
  $(".row").css('justify-content', 'space-evenly');



  $('.username').on("click", handleUsernameClick);

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $profile = $('<div class="profile"></div>');
  var $userinform = $('<div class="userinform"><h2>UserName</h2></div>');
  var $block = $ ('<div id="block"></div>');
  var $alltweet = $('<div id="feed"></div>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $friends = $('<div><h2>Friends List</h2></div>');

  // Create event handler functions
  renderFeed = function(user) {

    var $newFeed = $('<div id="feed"></div>')
    for (index = 0 ; index < streams.home.length; index ++) {
      if (typeof user !== 'string') {
        var tweet = streams.home[index];
      }
       else {
        if (streams.home[index].user === user) {
          var tweet = streams.home[index];
        }
      }
      if (tweet !== undefined) {
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" src="'+ tweet.profilePhotoURL +'">');
      var $username = $('<div class="username"><h4>@'+ tweet.user +'</h4></div>');
      var $message = $('<p class="message">' + tweet.message + '</p>');
      var postTime = jQuery.timeago(tweet.created_at);
      var $timeStamp = $('<div class="timestamp"><h5>'+ postTime +' </h5></hiv>');
      var $icon = $('<div class="row"></div>');

      $icon.append('<div class"icons><i class="icons column comment fa-solid fa-message"></i></div>');
      $icon.append('<div class"icons><i class="icons column retweet fa-solid fa-retweet"></i></div>');
      $icon.append('<div class"icons><i class="icons column like fa-brands fa-gratipay"></i></div>');
      $icon.append('<div class"icons"><i class="icons column share fa-solid fa-share"></i></div>');

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);

      $icon.appendTo($tweet);
      $tweet.prependTo($newFeed);
    }
  }


  $('#feed').replaceWith($newFeed);
  $button.text('Update Feed');


  $(".icons").hover(function() {
    $(this).css("background-color", "white");
}, function() {
    $(this).css("background-color", "black");
});

  $(".row").css('display','flex');
  $(".column").css('padding', '5px');
  $(".column").css('flex');
  $(".row").css('justify-content', 'space-evenly');


  $('.username').on("click", handleUsernameClick);

}

var handleUsernameClick = function(event) {
  var getUserName = (event.target.innerText);
  var username = (getUserName.substring(1, getUserName.length));
  renderFeed(username);
  if ($button.text() === 'Update Feed') {
    $button.text('Back');
  }
}



  $(".row").css('display','flex');
  $(".column").css('padding', '5px');
  $(".column").css('flex');
  $(".row").css('justify-content', 'space-evenly');


  // Set event listeners (providing appropriate handlers as input)

  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  $button.on("click",renderFeed);

  $('.username').on("click", handleUsernameClick);


  // Append new HTML elements to the DOM

  $title.appendTo($app);
  $profile.appendTo($app);
  $alltweet.appendTo($app)
  $userinform.appendTo($profile);
  $block.appendTo($profile);
  $friends.appendTo($profile);
  $button.appendTo($profile);
  $(".tweet").prependTo($alltweet);

  $userinform.prepend('<img id="profilephoto" src="./assets/img/visitor.png" alt="profilephoto" class="center">')



  // FRIEND LIST
  $friends.css('margin', '20px');

  for (var user in streams.users) {
    var username = user[0].toUpperCase() + user.slice(1, user.length)
    $friendsList = $('<ul><li>' + username + '</li></ul>');
    $friendsList.appendTo($friends);
  }

  // TWEET FEED


  window.isItBeautifulYet = true

  // Extra Credits
  // $postTweet = $("<div></div>");
  // $postTweet.css('margin', '20px');
  // $postTweet.appendTo($app);
  // $userNameInput = $('<label>Username</label>');
  // $userNameInput.appendTo($postTweet);
  // $userNameInput.append('<input type="text" name="username"></input>');


});
