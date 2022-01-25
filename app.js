$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  $("time.timeago").timeago();
  // Create new HTML elements
  var $title = $('<h1>Twiddler!</h1>');
  $title.appendTo($app);

  var $updateFeedButton = $('<button id="update-feed"> Update Feed</button>');
  $updateFeedButton.appendTo($app);

  var $tweetFeed = $('<div class="tweet feed"></div');
  $tweetFeed.appendTo($app);

    // Set event listeners (providing appropriate handlers as input)

  $updateFeedButton.on("click", function(){
    $(".tweet").empty();
    updateFeed();
  });


  // Create event handler functions
  var updateFeed = function() {
    $.each(streams.home, function (index) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.prependTo($tweetFeed);

      var $message = $('<span class="message"></span');
      $message.text(tweet.message);
      $message.prependTo($tweet);

      var $username = $('<span class="username"></span');
      $username.text('@' + tweet.user);
      $username.prependTo($tweet);

      //icon var
      var $commentIcon = $('<i class="icon fas fa-comment-dots"></i>');
      //icon class/class comment
      //icon src
      //icon add to DOM
      $commentIcon.appendTo($tweet);

       //icon var
       var $retweetIcon = $('<i class="icon fas fa-retweet"></i>');
      //icon class/class retweet
      //icon src
      //icon add to DOM
      $retweetIcon.appendTo($tweet);

      //icon var
      var $likeIcon = $('<i class="icon fab fa-gratipay"></i>');
      //icon class/class like
      //icon src
      //icon add to DOM
      $likeIcon.appendTo($tweet);

         //icon var
         var $shareIcon = $('<i class="icon fas fa-external-link-square-alt"></i>');
      //icon class/class share
      //icon src
      //icon add to DOM
      $shareIcon.appendTo($tweet);


      var $profilePhoto = $('<img class="profile-photo" id=' + tweet.user + ' src=' + tweet.profilePhotoURL + '></img>');
      $profilePhoto.prependTo($tweet);

      var $tweetTimestamp = $('<span class="timestamp"></span>');
      var time = jQuery.timeago(tweet.created_at);
      $tweetTimestamp.text(' ' + time);
      $tweetTimestamp.appendTo($tweet);

    });
  };
    updateFeed();
});

// {/* <img class="icon share" src="assets/icons/placeholder.png"></img> */}

// {/* <img class="icon retweet" src="assets/icons/placeholder.png"></img> */}

// {/* <img class="icon comment" src="assets/icons/placeholder.png"></img> */}

// {/* <img class="icon like" src="assets/icons/placeholder.png"></img> */}

// $('#' + tweet.user).attr("src", tweet.profilePhotoURL);

   // $tweet.text('@' + tweet.user + ': ' + tweet.message);


    // var previousLastIndex = streams.home.length - 1;
    // var rememberpreviousLastIndex = function(previousLastIndex){
    //   console.log(previousLastIndex);
    // }
    // var index = streams.home.length - 1; // creates a var that is equal to one less than the streams length, AKA the last element index
    // while(index >= 0){ // while the index is greater than zero (range of elements)
    //   var tweet = streams.home[index]; // create a var tweet = current element of streams.home
    //   var $tweet = $('<div class="tweet"></div>'); // var $tweet is assigned to a div with a class of tweet
    //   $tweet.text(index + '@' + tweet.user + ': ' + tweet.message); // the content of the div in $tweet is set to Username: tweet message). See .text();
    //   $tweet.appendTo($tweetFeed);//adds tweet to app div (after title now)
    //   index -= 1;//decrements
    // }

    // $.each(streams.home, function (index) {
    //   var tweet = streams.home[index];
    //   var $tweet = $('<div class="tweet"></div>');
    //   $tweet.text(index + '@' + tweet.user + ': ' + tweet.message);
    //   $tweet.prependTo($tweetFeed);
    //   var $tweetTimestamp = $('<span id="timestamp"></span>');
    //   $tweetTimestamp.text(' ' + tweet.created_at);
    //   $tweetTimestamp.appendTo($tweet);
    // });

     // $title.on("click", function(event){ //when the contents of var title are clicked, initiates a function that is passed the 'event' info. Event = click in this case
  //   console.log(streams.home.length);//logs the data associated with the click event
  //   alert('The title of this page is: ' + event.target.innerText); // alert (Creates a message in browser) and passes message to alert function
  // });