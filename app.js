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

  // Create an id of feed within app
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  // Making a new function here because I am going to have to use this at least twice and
  // I don't want to repeat myself (DRY)
  var renderMessages = function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);

      $message = $('<div class="message"></div>');
      $message.text(tweet.message);
      $message.appendTo($tweet);

      $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);

      $profilePhoto = $('<img src="assets/icons/placeholder.png" class="profile-photo"></img>');
      $profilePhoto.appendTo($tweet);

      $timestamp = $('<div class="timestamp"></div>')
      $timestamp.text(tweet.created_at);
      $timestamp.appendTo($tweet);

      $tweet.appendTo($feed);
      index -= 1;
    }
  }

  renderMessages();

  // Create a button to update the feed
  var $updateFeed = $('<button id="update-feed">Update</button>');
  $updateFeed.prependTo($app);

  // Functionality of the update button
  $updateFeed.on('click', function(even) {
    $feed.empty();
    renderMessages();
  })



});