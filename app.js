$(document).ready(function(){
    // Select the element with ID #app
    var $app = $('#app');
    // Replace the HTML in that div with an empty string
    $app.html('');
    // Create a h1 element with the text 'Twiddler' (in memory, not in the actual DOM)
    var $title = $('<h1>Twiddler</h1>');
    // Append that h1 element to the DOM (inside the #app element)
    $title.appendTo($app);
    // Set an event listener on the h1 element (for a click) that generates an alert
    $title.on("click", function(event) {
      console.log(event);
      alert('The Title of this Page is: ' + event.target.innerText);
    });

    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($app);
      index -= 1;
    }
    
    //--------------------------------------------
    // CREATE UPDATE FEED BUTTON
    //--------------------------------------------

    // Create update feed button in memory using jQuery
    var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
    // Append it to the DOM inside the #app div
    $updateFeedButton.appendTo($app);
    // Add a click event listener
    $updateFeedButton.on('click', function () {
        // Call the render feed function
        renderFeed();
    })

    //--------------------------------------------
    // CREATE FEED ELEMENT
    //--------------------------------------------

    // Use jQuery to turn the #app element into a JS object with jQuery methods
    $('#app');
    // Create #feed div in memory using jQuery
    var $feed = $('<div id="feed"></div>')
    // Append #feed div to the DOM inside app div
    $feed.appendTo($app);



    //--------------------------------------------
    // RENDER FEED
    //--------------------------------------------
    
    // Remove any existing tweets:
    var renderFeed = function() {
    var $loadedTweets = $('.tweet');
    $('.tweet').remove();

    // Iterate through the elements in streams.home
 
        // Create an iterator variable for the elements in streams.home
        var index = streams.home.length - 1;

        // For each element in streams.home
        while(index >= 0){
        // CREATE A TWEET ELEMENT
          // tweet = the element
          var tweet = streams.home[index];
          // Create a div with class 'tweet'
          var $tweet = $('<div class="tweet"></div>');          
          // Append the tweet to the feed
          $tweet.appendTo($feed);
          
          // CREATE PROFILE PHOTO ELEMENT
          var $profilePhoto = $('<img src="assets/img/' + tweet.user +'.png" class="profile-photo"></img>');
          $profilePhoto.appendTo($tweet);

          // CREATE A USERNAME ELEMENT
          var username = tweet.user;
          var $username = $('<div class="username"></div>');
          // Fill it with the username text
          $username.text('@' + username);
          // Append it to the $tweet element
          $username.appendTo($tweet);

          // CREATE A MESSAGE ELEMENT
          var $message = $('<div class="message"></div>')
          $message.text(tweet.message);
          $message.appendTo($tweet);

          // Create <div> for timestamp
          var $timestamp = $('<div class="timestamp"></div>');
          var timeSince = jQuery.timeago(tweet.created_at)
          $timestamp.text(timeSince);
          $timestamp.appendTo($tweet);

          // Create 4 elements for Like, Share, Comment, Retweet
          var $comment = $('<i class="comment fas fa-comment icon" ></i>');
          $comment.appendTo($tweet);

          var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
          $retweet.appendTo($tweet);

          var $like = $('<i class="fas fa-heart icon like"></i>');
          $like.appendTo($tweet);

          var $share = $('<i class="fas fa-share icon share"></i>');
          $share.appendTo($tweet);


   
          // Decrement the iterator variable
          index -= 1;
        }



    }

    renderFeed();

  // End of .ready() function
  });