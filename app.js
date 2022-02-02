$(document).ready(function(){
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
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  $button.appendTo($app);
  var $feed = $('<div id="feed"></div>')
  $feed.appendTo($app);
  //create helper function to update feeed
  var renderFeed = function(event, user) {
    $(".tweet").detach();
    //$tweet.html('');
    console.log(user)
    var individualStream = false
    if (user) {
      var index = streams.users[user].length - 1
      var individualStream = true
    }
    if (!user) {
      var index = streams.home.length - 1;
    }
    while(index >= 0){
      var tweet = streams.home[index];
      if (individualStream) {
        var tweet = streams.users[user][index]
      }
      //var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      //add profile picture element
      var $profilePic = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">')
      $profilePic.text('profile pic here')
      $profilePic.appendTo($tweet)
      //add username element
      var $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user)
      $username.appendTo($tweet)
      //add message element
      var $message = $('<div class="message"></div>');
      $message.text(tweet.message)
      $message.appendTo($tweet)
      //add timestamp
      //var $timestamp = $('<div class="timestamp"></div>')
      var $timestamp = $('<div class="timestamp">' + $.timeago(tweet.created_at) + '</div>');
      //$timestamp.text(tweet.created_at)
      $timestamp.appendTo($tweet)
      //add 4 icons
      var $comment = $('<i class="fas fa-comment comment icon"></i>')
      var $like = $('<i class="fas fa-heart like icon"></i>')
      var $retweet = $('<i class="fas fa-retweet retweet icon"></i>')
      var $share = $('<i class="fas fa-share share icon"></i>')
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      //$tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
    $( ".username" ).on('click', function( event ) {
      var currentUser = event.target.innerText.slice(1,1000)
      console.log(currentUser)
      renderFeed(event, currentUser)
      $("#update-feed").text('Back')
    });
    $('.icon').hover(function() {
      $(this).css("background-color", "yellow");
      }, function(){
      $(this).css("background-color", "");
    });
  }
  renderFeed();
  //$button.on("click", renderFeed);
  $button.on("click", function(event) {
    renderFeed();
    $("#update-feed").text('Update Feed')
  });
  //$button.on("click", renderFeed);
  //$username.on("click", function(event) {
    //console.log(tweet.user)
  //});
  window.isItBeautifulYet = true
});