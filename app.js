$(document).ready(function(){
  var $app = $('#app');
  $app.html('');


// Select already existing elements


// Create new HTML elements
  // create an h1 element with the specified text
  var $title = $('<h1> TwiddlerX </h1>');
  // create a button element with specified text
  var $updateFeed = $('<button id = "update-feed">Update Feed</button>');
  //create a new <div> with the ID "feed"
  var $feed = $('<div id = "feed">  <div>');



// Create event handler functions

var renderFeed = function(testUser){

  //var testUser = 'shawndrost';

   //condition when a user is passed
      if(testUser !== undefined){
      // user-specific feed (specified index and tweet)
        var index = streams.users[testUser].length - 1;
      }
        // general "home" case
      else{
        var index = streams.home.length - 1;
    }

  while(index >= 0){


    if(testUser !== undefined){
      // user-specific feed (specified index and tweet)
        var tweet = streams.users[testUser][index];
      }
        // general "home" case
      else{
        var tweet = streams.home[index];
    }


    var $tweet = $('<div class="tweet"></div>');
    $tweet.appendTo($feed);
    var $profilePic = $('<img class = "profile-photo" src = "assets/img/' + tweet.user + '.png">');
    $profilePic.appendTo($tweet);
    var $username = $('<div class = "username">' + '@' + tweet.user +  '</div>');
    $username.appendTo($tweet);
    var $message = $('<p class = "message">' + tweet.message +  '</p>');
    $message.appendTo($tweet);
    var $timestamp = $('<div class = "timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
    $timestamp.appendTo($tweet);
    var $icon = $('<div class = "icon" > </div>');
    $icon.appendTo($tweet);


    var $comment = $('<i class="comment fas fa-comment-dots"></i>');
    $comment.appendTo($icon);
    var $retweet = $('<i class="retweet fas fa-retweet"></i> ');
    $retweet.appendTo($icon);
    var $like = $('<i class="like fas fa-heart"></i> ');
    $like.appendTo($icon);
    var $share = $('<i class="share fas fa-share"></i>');
    $share.appendTo($icon);


    index -= 1;







  // user interactions
  $comment.hover(function(event){

    $(this).css("color", "black");
  }, function(){
  $(this).css("color", "whitesmoke");

  });

    $retweet.hover(function(event){

      $(this).css("color", "black");
    }, function(){
    $(this).css("color", "whitesmoke");

    });

      $like.hover(function(event){

        $(this).css("color", "black");
      }, function(){
      $(this).css("color", "whitesmoke");

      });

    $share.hover(function(event){

      $(this).css("color", "black");
    }, function(){
    $(this).css("color", "whitesmoke");

    });


  }




  $('.username').on("click", function handleUsernameClick(event){

    $("#update-feed").html("Back");
    var txt = $(event.target).text().substring(1);

    //clear home feed
    $("#feed").empty();
    renderFeed(txt);

  });


};


// Set event listeners (providing appropriate handlers as input)
  // Set a click event listener on the h1 title
  $title.on("click", function(event){
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  // Set a click event listener to the button; add latest fresh Tweets;
  $updateFeed.on("click", function(event){
    console.log(event);

    var $this = $(this);
    if($this.text() === 'Back'){
      $("#update-feed").html('Update Feed');
     }

// Remove all previously existing Tweets from the Feed [DEDUPE STEP]
  $("#feed").empty();
  renderFeed();
  });



// Append new HTML elements to the DOM

  // now append the h1 element to the DOM
  $title.appendTo($app);
  // append button to the DOM
  $updateFeed.appendTo($app);
  // append div to app
  $feed.appendTo($app);



// initial 10 Tweets;
  renderFeed();


});


window.isItBeautifulYet = true