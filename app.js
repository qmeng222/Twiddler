$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  jQuery.timeago.settings.allowFuture = true;
  // Select the div with the ID #app
  var $app = $('#app');
  //$app.a
  // Select already existing elements

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id=update-feed>Update Feed</button>');
  var $feed = $('<div id=feed>feed</button')
  //$('#feed').addClass('message');

  // Create event handler functions---------
  var handleTitleClick = function(event) {
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert('The ' + titleType + ' of this page is: ' + event.target.innerText);
  }

  //not used
  var logInnerText = function(event) {
    var innerText = event.target.innerText;
    console.log(innerText);
  };

  //updates tweets shown
  var updateFeed = function(event) {
    // Remove all previously existing Tweets from the Feed
    $feed.empty();
    // For each Tweet object in the stream array (in reverse order)
    for(var i = streams.home.length-1; i >= 0 ; i--) {
      // Create a new Tweet UI component
      tweet = streams.home[i];
      //filter users

      if (event === undefined || event.data === undefined) {
        updateButton(false);
        $tweet = $('<div class=tweet></div>');
        $tweet.html(formatTweet(tweet.user, tweet.message, jQuery.timeago(new Date(tweet.created_at))));
        //console.log(tweet.profilePhotoURL);
        //$tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + jQuery.timeago(new Date()));
        // Append the new Tweet UI component to the Feed
        $tweet.appendTo($feed);
      } else {
        if (event.data.userFilter === tweet.user) {
          updateButton(true);
          $tweet = $('<div class=tweet></div>');
          $tweet.html(formatTweet(tweet.user, tweet.message, jQuery.timeago(new Date(tweet.created_at))));
          $tweet.appendTo($feed);
        }
      }
    }
    //hover effect (only works all the time here)
    $('.comment').hover(function(){
      $(this).toggleClass('hover');
    });
    $('.retweet').hover(function(){
      $(this).toggleClass('hover');
    });
    $('.like').hover(function(){
      $(this).toggleClass('hover');
    });
    $('.share').hover(function(){
      $(this).toggleClass('hover');
    });
    //username buttons(only works all the time here)
    $('.mracus').on('click', {userFilter: 'mracus'},updateFeed);
    $('.sharksforcheap').on('click', {userFilter: 'sharksforcheap'},updateFeed);
    $('.douglascalhoun').on('click', {userFilter: 'douglascalhoun'},updateFeed);
    $('.shawndrost').on('click', {userFilter: 'shawndrost'},updateFeed);
  }

  //return each tweet in format
  var formatTweet = function(user, messageData, time) {
    //vars for each element of the tweet
    var photoURL = 'assets/img/' + user + '.png';
    var profilePhoto = '<img class = "profile-photo" src=' + photoURL +' alt='+ user +'>';
    var username = '<span class = "username '+ user +'"> @' + user + ' </span>';
    //$username = $(username);
    var message = '<span class = "message">' + messageData + ' </span>';
    var timestamp = '<span class = "timestamp">' + time + '</span>';
    //var commnet = '<i class="icon comment far fa-comment-alt"></i>'
    var icons = getIcons();

    //final message
    return  profilePhoto + username + message + timestamp + icons;
  }

  //set icons
  var getIcons = function() {
    var icons = ('<i class="icon comment far fa-comment-alt"></i>'
      + '<i class="icon retweet fas fa-retweet"></i>'
      + '<i class="icon like far fa-thumbs-up"></i>'
      + '<i class="icon share far fa-share-square"></i>'
    );
    return icons;
  }

  //toggles updatefeed and back button
  var updateButton = function(buttonToggle) {
    //console.log(buttonToggle);
    if(buttonToggle){
      $('#update-feed').text('Back');
    } else {
      $('#update-feed').text('Update Feed');
    }

  }


  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  $button.on('click', updateFeed);
  //$('.mracus').on('click', {userFilter: 'mracus'},updateFeed);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  //for the first set of tweets
  updateFeed();

  //user story
    //create on click function for user elemnte

    //update feed while filtering

    //change button to 'back'
    window.isItBeautifulYet = true

});