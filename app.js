$(document).ready(function(){

  // Select the div with the ID #app
  var $app = $('#app');
  $app.html('');

  // Create an h1 element with the text "Twiddler"
  var $title = $('<h1>Twiddler</h1>');
  // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);

  // Set a click event listener on the h1 element
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });


  var $button = $('<button id="update-feed" value="update">Update Feed</button>');
  $button.appendTo($app);

  var $feed = $('<div id=feed></div>');
  $feed.appendTo($app);


  $('#update-feed').on('click', function() {
    if(this.value === 'update') {
      $feed.empty();
      renderFeed();
    }
  });

  // Update Feed button
  var renderFeed = function(event){
    // // Remove all previously existing Tweets from the Feed
    // For each Tweet object in the stream array (in reverse order)
      // Create a new Tweet UI component
      // Append the new Tweet UI component to the Feed
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet id-'+ tweet.user +'"></div>');
      var $profilePhoto= $('<img class="profile-photo"></img>').attr("src", tweet.profilePhotoURL);
      $profilePhoto.appendTo($tweet);
      var $username = $('<div class ="username"> @' + tweet.user + ' </div>');
      $username.appendTo($tweet);
      var $message = $('<div class="message">' + tweet.message + '</div>');
      $message.appendTo($tweet);
      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      $timestamp.appendTo($tweet);
      var $icons = $('<div class="icons"></div');
      var $comment =$('<i class="far fa-comments comment"></i>');
      $comment.appendTo($icons);
      var $retweet =$('<i class="fas fa-retweet retweet" ></i>');
      $retweet.appendTo($icons);
      var $like =$('<i class="far fa-heart like"></i>');
      $like.appendTo($icons);
      var $share =$('<i class="fas fa-share share"></i>');
      $share.appendTo($icons);
      $icons.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;

      // var cachedTweets = [];
      // cachedTweets.push($('.tweet'));

      $tweet.on("click", '.username',function(event) {
        //if not tweet.user(specific user) - hide all other tweet div classes
        var clickedUser = event.target.innerText.split('@')[1];
        streams.home.forEach(index => {
          if(index.user !== clickedUser) {
            $('.tweet.id-' + index.user).detach();
          }
        })
        $('#update-feed').val('back');
        $('#update-feed').text('Back');
      });

      $('#update-feed').on('click', function() {
        if(this.value === 'back') {
          // $('#feed').append(cachedTweets);
          $feed.empty();
          renderFeed();
          $('#update-feed').val('update');
          $('#update-feed').text('Update Feed');
        }
      });
    }
  }

  renderFeed();

});