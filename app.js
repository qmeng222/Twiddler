$(document).ready(function(){
   // Select already existing elements
  var $app = $('#app');
  $app.html('');

  $app.css('background-color', '#D3DEDC');
  $app.css('color', '#92A9BD');


  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<img class=""profile-photo src="'+ tweet.profilePhotoURL +'">');
    var $username = $('<div class="username"><h4>@'+ tweet.user +'</h4></div>');
    var $message = $('<p class="message">' + tweet.message + '</p>');
    var postTime = tweet.created_at;
    var $timeStamp = $('<div class="timestamp"><h5>'+ postTime +' min ago</h5></hiv>');
    var $icon = $('<div class="row"></div>');

    $tweet.appendTo($app);
    $icon.append('<div><img class="icons column comment" src="assets/icons/placeholder.png"></div>');
    $icon.append('<div><img class="icons column retweet" src="assets/icons/placeholder.png"></div>');
    $icon.append('<div><img class="icons column like" src="assets/icons/placeholder.png"></div>');
    $icon.append('<div><img class="icons column share" src="assets/icons/placeholder.png"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);

    $profilePhoto.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timeStamp.appendTo($tweet);

    $icon.appendTo($tweet);

    index -= 1;
  }


  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $profile = $('<div></div>');
  var $userinform = $('<div><h2>UserName</h2></div>');
  var $block = $ ('<div></div>');
  var $alltweet = $('<div id="feed"></div>');
  var $button = $('<button>Update Feed</button>');
  var $friends = $('<div><h2>Friends List</h2></div>');

  // var tweet = streams.home[index];
    // var $tweet = $('<div class="tweet"></div>');
    // $tweet.text(tweet.message);
    // var username = '<h4>@'+ tweet.user +'</h4>';
    // $tweet.append('<div class="tweetprofile"><img src="'+ tweet.profilePhotoURL + '">'+ username+ '</div>');

    // var createMinus = tweet.created_at.getMinutes();
    // var postTime = minute - createMinus;
    // $tweet.append('<div class="postTime"><h5>'+ postTime +' min ago</h5></hiv>');
    // $(".postTime").css('position', 'relative');
    // $(".postTime").css('left', '40%');

  // Create event handler functions
  renderFeed = function() {
    var $newFeed = $('<div id="feed"></div>')
    for (index = 0 ; index < streams.home.length; index ++) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" src="'+ tweet.profilePhotoURL +'">');
      var $username = $('<div class="username"><h4>@'+ tweet.user +'</h4></div>');
      var $message = $('<p class="message">' + tweet.message + '</p>');
      var postTime = tweet.created_at;
      var $timeStamp = $('<div class="timestamp"><h5>'+ postTime +' min ago</h5></hiv>');
      var $icon = $('<div class="row"></div>');



      // $tweet.text('@' + tweet.user + ': ' + tweet.message);



      $icon.append('<div><img class="icons column comment" src="assets/icons/placeholder.png"></div>');
      $icon.append('<div><img class="icons column retweet" src="assets/icons/placeholder.png"></div>');
      $icon.append('<div><img class="icons column like" src="assets/icons/placeholder.png"></div>');
      $icon.append('<div><img class="icons column share" src="assets/icons/placeholder.png"></div>');

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);

      $icon.appendTo($tweet);
      $tweet.prependTo($newFeed);
    };


    $('#feed').replaceWith($newFeed);
    $("#feed").css('display', 'grid');
    $("#feed").css('grid-area', 'content');
    $("#feed").css('margin', '20px');
    $("#feed").css('background-color', '#FFEFEF');
    $("#feed").css('width', '800px');
    $("#feed").css('display', 'inline-block');
    $("#feed").css('position', 'relative');
    $("#feed").css('left', '30%');
    $("#feed").css('height', '800px');
    $("#feed").css('overflow', 'scroll');

    $(".tweet").css('margin', '20px');
    $(".tweet").css('padding', '20px');
    $(".tweet").css('border', '10px solid #769FCD');
    $(".tweet").css('background-color', '#D6E6F2');
    $(".tweet").css('text-align', 'center');


    $(".icons").css('width', '30px');
    $(".icons").css('position','relative')
    $(".row").css('display','flex');
    $(".column").css('padding', '5px');
    $(".column").css('flex');
    $(".row").css('justify-content', 'space-evenly');

    $(".profile-photo").css('position', 'relative');
    $(".profile-photo").css('left', '-40%');

    $(".postTime").css('position', 'relative');
    $(".postTime").css('left', '40%');
  }



  $(".tweet").css('margin', '20px');
  $(".tweet").css('padding', '20px');
  $(".tweet").css('border', '10px solid #769FCD');
  $(".tweet").css('background-color', '#D6E6F2');
  $(".tweet").css('text-align', 'center');


  $(".icons").css('width', '30px');
  $(".icons").css('position','relative')
  $(".row").css('display','flex');
  $(".column").css('padding', '5px');
  $(".column").css('flex');
  $(".row").css('justify-content', 'space-evenly');

  $(".profile-photo").css('position', 'relative');
  $(".profile-photo").css('left', '-40%');

  $(".postTime").css('position', 'relative');
  $(".postTime").css('left', '40%');



  $button.on("click", function(event) {
    renderFeed();


  });


  // Set event listeners (providing appropriate handlers as input)

  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

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



// Title Design
  $title.css('color', '#7C99AC');
  $title.css('text-align', 'center');
  $title.css('padding-top', '50px');
  $title.css('padding-bottom', '50px');
  $title.css('font-size', '3em');
  $title.css('margin', '0');

// Profile
  $profile.css('background-color', '#FFEFEF')
  $profile.css('width', '200px');
  $profile.css('height', '500px');
  $profile.css('display', 'inline-block');
  $profile.css('margin', '20px');
  $profile.css('text-align', 'center');
  $profile.css('position', 'fixed');

  $('#profilephoto').css('margin', '20px');
  $userinform.css('text-align', 'center');

  $block.attr('id', 'block');
  $block.css('width', '200px');
  $block.css('height', '10px');
  $block.css('background-color', '#92A9BD');
  $("#block").css('position', 'absolute');

  // FRIEND LIST
  $friends.css('margin', '20px');

  for (var user in streams.users) {
    var username = user[0].toUpperCase() + user.slice(1, user.length)
    $friendsList = $('<ul><li>' + username + '</li></ul>');
    $friendsList.appendTo($friends);
  }

  // TWEET FEED

  $("#feed").css('display', 'grid');
  $("#feed").css('grid-area', 'content');
  $("#feed").css('margin', '20px');
  $("#feed").css('background-color', '#FFEFEF');
  $("#feed").css('width', '800px');
  $("#feed").css('display', 'inline-block');
  $("#feed").css('position', 'relative');
  $("#feed").css('left', '30%');
  $("#feed").css('height', '800px');
  $("#feed").css('overflow', 'scroll');




  // $(".tweet").prependTo($alltweet);
  // $(".tweet").css('margin', '20px');
  // $(".tweet").css('padding', '20px');
  // $(".tweet").css('border', '10px solid #769FCD');
  // $(".tweet").css('background-color', '#D6E6F2');
  // $(".tweet").css('text-align', 'center');

  // Posttime
  // var today = new Date();
  // var minute = today.getMinutes();
  // var $postTime =
  // var createMinus = tweet.created_at.getMinutes();
  // var postTime = minute - createMinus;

  // ICONS



// update-feed Button
  $button.attr('id', 'update-feed');
  // $button.css('padding', '15px 32px');
  // $button.css('background-color', '#92A9BD');
  // $button.css('border', 'none');
  // $button.css('color', '#FFEFEF');





  // $postTweet = $("<div></div>");
  // $postTweet.css('margin', '20px');
  // $postTweet.appendTo($app);
  // $userNameInput = $('<label>Username</label>');
  // $userNameInput.appendTo($postTweet);
  // $userNameInput.append('<input type="text" name="username"></input>');


});
