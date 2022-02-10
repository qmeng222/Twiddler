$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  var $feed = $('<div id="feed"></div>')
  $feed.appendTo('#app')



  //Creates a title that gives alert when you click on it
var $title = $('<h1 class = "title">Twiddler</h1>');
$title.prependTo($app);

//Creates an Update Feed Button
var $updateFeedButton = $('<a id = update-feed class = "updateFeed">Update Feed</a>').addClass("updateFeedButton")
$updateFeedButton.appendTo($title)


//removes duplicates from streams.home
var stream = streams.home;
var uniqueAddresses = Array.from(new Set(stream.map(a => a.id)))
.map(id => {
 return stream.find(a => a.id === id)
});


//filter variable to be used if needed
var usernameFilter = 'Na';
//variable to remeber original colors of things (need this for icon hovering)
var originalColors = [];


//Adds initial tweets
//added a 2nd arugment that when avaliable, will filter out tweets based on username, will be able to use this in the future to filter out any element
function addTweets(streams, filter) {

  if (filter !== 'Na') {
      $updateFeedButton.text('Back');
  } else {
      $updateFeedButton.text('Update Feed');
  }

   var index = streams.home.length - 1;

    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');


      //$profilePhoto.text(photo)
      var $photo = tweet.profilePhotoURL
      var $image = $('<img class = "profile-photo"></img>');
      $image.attr("src", $photo);
      $image.appendTo($tweet);
      //console.log(photo)
      //$tweet.prepend('<img src="tweet.profilePhotoURL">');

      //adds username child to tweet
      var username = tweet.user;
      var $username = $('<div class ="username"></div>');

      $username.text('@' + username);
      $tweet.attr('id', username);
      $username.appendTo($tweet);




      //adds message child to tweet
      var message = tweet.message;
      var $message = $('<div class ="message"></div>');
      $message.text(message);
      $message.appendTo($tweet);

      //adds timestamp to bottom of tweet
      var $timestamp = $('<div class="timestamp timeago"></div>');

      var timestamp = $.timeago(tweet.created_at);
      $timestamp.text(timestamp);
      $timestamp.appendTo($tweet);


      //adds icons

      var $commentIcon = $('<i class="icon comment fas fa-comment-alt"></i>');
      var $likeIcon = $('<i class="icon like far fa-smile"></i>');
      var $shareIcon = $('<i class="icon share fas fa-people-arrows"></i>');
      var $retweetIcon = $('<i class="icon retweet fas fa-satellite-dish"></i>');
      $likeIcon.appendTo($tweet);
      $commentIcon.appendTo($tweet);
      $shareIcon.appendTo($tweet);
      $retweetIcon.appendTo($tweet);

      //adds hover effect to icons




      //add tweet to feed
      if (filter === 'Na') {
        $tweet.appendTo($feed);
      } else if (filter !== 'Na') {
        if (username === filter) {

          $tweet.appendTo($feed);
      } else {
      }
    }

    //moves on to build next tweet
    index -= 1;

    }

    //adds hover effect for icons
    $(function() {
      $('.icon').hover(function(){
          originalColors[$(this).index('.icon')] = $(this).css('color');
          $(this).css('color', 'red');
      },
      function(){
         $(this).css('color', originalColors[$(this).index('.icon')]);
      });
  });


    //on clicking username, reloads tweets with username filter
    $(".username").on("click", function(event){
      usernameFilter = ($(".tweet").attr('id'));
      $(".tweet").remove();
      addTweets(streams, usernameFilter);
      //$feed.filter($(this).attr("id") === 'mracus')

   })

  return $feed;
}

//adds initial tweets with above function
addTweets(streams, usernameFilter);



//Gives functionality to update feed button
$updateFeedButton.on("click", function(event) {
  //clears tweets currently on screen
  $(".tweet").remove();
  //reloads tweets in chronological order by resuing addTweets function
  usernameFilter = 'Na';
  addTweets(streams, usernameFilter);
});
window.isItBeautifulYet = true;
});



