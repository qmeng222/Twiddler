$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  $("time.timeago").timeago();

  // Create new HTML elements
  var $title = $('<h1 class="title">Twiddler!</h1>');

  var $updateFeedButton = $('<button id="update-feed"> Update Feed</button>');
  var $tweetFeed = $('<div id="feed"></div');
  var $username;
  var $message;
  var $tweet;
  var $profilePhoto;


  // Create event handler functions
  var renderFeed = function(username) {
    $('#feed').empty();
    var list;
    //if name provided
    if(username){
      list = streams.users[username];
    // access streams.users.name
    }
    if(username === undefined){
      list = streams.home
      $updateFeedButton.text('Update Feed')
    }
    //if no name provided
    //access streams.home
    $.each(list, function (index) {
      var tweet = list[index];
      $tweet = $('<div class="tweet"></div>');
      $tweet.prependTo($tweetFeed);

      $message = $('<span class="message"></span');
      $message.text(tweet.message);
      $message.prependTo($tweet);

      $username = $('<span class="username" name=' +tweet.user + '></span');
      $username.text('@' + tweet.user);
      $username.prependTo($tweet);


      var $commentIcon = $('<i class="icon comment fas fa-comment-dots"></i>');
      $commentIcon.appendTo($tweet);

      var $retweetIcon = $('<i class="icon retweet fas fa-retweet"></i>');
      $retweetIcon.appendTo($tweet);

      var $likeIcon = $('<i class="icon like fab fa-gratipay"></i>');
      $likeIcon.appendTo($tweet);

      var $shareIcon = $('<i class="icon share fas fa-external-link-square-alt"></i>');
      $shareIcon.appendTo($tweet);


      $profilePhoto = $('<img class="profile-photo" id=' + tweet.user + ' src=' + tweet.profilePhotoURL + '></img>');
      $profilePhoto.prependTo($tweet);

      var $tweetTimestamp = $('<span class="timestamp"></span>');
      var time = jQuery.timeago(tweet.created_at);
      $tweetTimestamp.text(' ' + time);
      $tweetTimestamp.appendTo($tweet);

    });
  };
    renderFeed();

  // Set event listeners (providing appropriate handlers as input)

  $updateFeedButton.on('click', function(){
    renderFeed();
  });

  var handleUsernameClick = function(event){
    var user = event.target.innerText.replace('@', '');
    renderFeed(user);
    $updateFeedButton.text('Back')
  }
  $('div').on('click', ".username", handleUsernameClick);


  //Append elements to the DOM

  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $tweetFeed.appendTo($app);





window.isItBeautifulYet = true;
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