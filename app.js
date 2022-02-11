$(document).ready(function(){
  // 1. Select already existing elements
  var $app = $('#app');
  $app.html('');


  // 2. Create new HTML elements
  // Create title
  var $title = $('<h1 class="heading-2">Twiddler</h1>');
  // Create update feed Button
  var $button = $('<button id="update-feed" class="button-2">Update Feed</button>');
  // Create a feed panel that will contains all tweets
  var $feed = $('<div id="feed" class="div-block-3"></div>');

  // Append to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  // 3. Create event handler functions

  // - TitleClick
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  };


  // - Click Update feed func
  var renderFeed = function(event, user) {

    // Remove all previously existing tweets
    $("#feed").empty();
    // Start generating
    var index = streams.home.length - 1;
    while(index >= 0){

      var tweet = streams.home[index];
      //'@'+tweet.user
      // if there is a user input
      if (!!user) {
        //console.log('user is not undefined!!!');
        if (user !== '@'+tweet.user){
          //console.log(user + ' === @' + tweet.user);
          index -= 1;
          continue;
        }
      }
      var $tweet = $('<div class="tweet"></div>');
      $tweet.attr("id", ''+index)
      $tweet.appendTo("#feed");

      // Create profilephoto img
      var $profilePhoto = $('<img class="profile-photo">')
      var profilePath = 'assets/img/' + tweet.user +'.png';
      $profilePhoto.attr("src", profilePath);
      $profilePhoto.appendTo('#'+index);

      // Create username span
      var $userName = $('<div class="username"></div>');
      $userName.text('@'+tweet.user);
      $userName.appendTo('#'+index);

      // Create message span
      var $message = $('<div class="message"></div>');
      $message.text(tweet.message);
      $message.appendTo('#'+index);

      // Create timestamp span
      var $timestamp = $('<div class="timestamp"></div>');
      var time_ago = jQuery.timeago(tweet.created_at); // return string
      $timestamp.text(time_ago);
      $timestamp.appendTo('#'+index);

      // Create img four times
      var $icon1 = $('<i class="fa-solid fa-comment comment"></i>');
      var $icon2 = $('<i class="fa-solid fa-retweet retweet"></i>');
      var $icon3 = $('<i class="fa-regular fa-heart like"></i>');
      var $icon4 = $('<i class="fa-solid fa-share-nodes share"></i>');
      $icon1.appendTo('#'+index);
      $icon2.appendTo('#'+index);
      $icon3.appendTo('#'+index);
      $icon4.appendTo('#'+index);

      index -= 1;
    }
    $(".tweet").attr("id",'');

    if (user === undefined) {
      $("#update-feed").text("Update Feed");
    }

  };
  var HandleUsernameClick = function(event) {
    var buttonName = $('#update-feed').text();
    //alert('works');
    //console.log(buttonName+ ' === '+'Update Feed');
    //console.log(buttonName === 'Update Feed')
    if (buttonName === 'Update Feed') {
      //alert('well')
      $("#update-feed").text("Back");
      renderFeed(event, event.target.innerText);
    }

  }


  // 4. Set event Listeners

  // When click title
  $title.on("click", handleTitleClick);

  // Generate tweets when page open in first time/ Refresh
  // nested inside #feed
  renderFeed(event);

  // When click user name
  // $(".username").on("click",HandleUsernameClick);
  $(document).on("click",".username",HandleUsernameClick);

  // When click update tweet Button
  $('#update-feed').on("click", renderFeed);




  window.isItBeautifulYet = true
  // 5. Append new HTML elements to the DOM
  // Append the h1 element to the DOM, nested inside of the #app div


});


