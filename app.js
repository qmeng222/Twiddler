$(document).ready(function(){
  var $app = $('#app');
  //$app.html('');



  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
  console.log(event);
  alert('The title of this page is: ' + event.target.innerText);
  });

  var $update = $('<button>Update Feed</button>');$update.appendTo($app);
  $update.on("click", function(newUpdates) {
  newUpdates.preventDefault();
  newTweets();

  });

  var $feed = $('#feed');
  $feed.appendTo($app);



  var newTweets = function() {
    $feed.html('');
    var index = streams.home.length - 1;
    while (index >= 0){

      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');

      var $photo = $('<div class="profile-photo"></div>');
        if (tweet.user === 'douglascalhoun'){
          $('<img src="assets/img/douglascalhoun.png" alt="" width="50px"/>').appendTo($photo);
        }
        if (tweet.user === 'mracus'){
          $('<img src="assets/img/mracus.png" alt="" width="50px"/>').appendTo($photo);
        }
        if (tweet.user === 'sharksforcheap'){
          $('<img src="assets/img/sharksforcheap.png" alt="" width="50px"/>').appendTo($photo);
        }
        if (tweet.user === 'shawndrost'){
          $('<img src="assets/img/shawndrost.png" alt="" width="50px"/>').appendTo($photo);
          $photo.appendTo($tweet);

        }
      $photo.appendTo($tweet);

      var $message = $('<div class="message"></div>');
      $message.html(tweet.message);
      $message.appendTo($tweet);


      var $username = $('<div class="username"></div>');
      $username.html(tweet.user);
      $username.appendTo($tweet);


      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.html(tweet.created_at);
      $timestamp.appendTo($tweet);


      var $icon = $('<div class="icon"></div>');
      $('<img src="assets/icons/Like.png" alt="" width="33px"/>').appendTo($icon);
      $('<img src="assets/icons/Comment.png" alt="" width="29px"/>').appendTo($icon);
      $('<img src="assets/icons/Retweet.png" alt="" width="30.5px"/>').appendTo($icon);
      $('<img src="assets/icons/Share.png" alt="" width="32px"/>').appendTo($icon);
      $icon.appendTo($tweet);
      $tweet.appendTo($feed);

      index -= 1;
    }
  };


});