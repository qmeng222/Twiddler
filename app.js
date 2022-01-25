$(document).ready(function(){
  $("time.timeago").timeago();
  var $app = $('#app');
  $app.html('');

//Heading
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
  console.log(event);
  alert('The title of this page is: ' + event.target.innerText);
  });

//Update Button Made
  var $update = $('<button>Update Feed</button>');$update.appendTo($app);

//Home Button Made
  var $home = $('<button>Home</button>');$home.appendTo($app);

//Create Feed Element
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

//Create Span To Use For User
  var $span = $('span');

//Gets New Tweets
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
      $username.html('@<span class="' + tweet.user + '">' + tweet.user + '</span>');
      $username.appendTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.html($.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      var $icon = $('<div class="icon"></div>');
        $('<img class="like" img src="assets/icons/Like.png" alt="" width="33px"/>').appendTo($icon);
        $('<img class="comment" img src="assets/icons/Comment.png" alt="" width="29px"/>').appendTo($icon);
        $('<img class="retweet" img src="assets/icons/Retweet.png" alt="" width="30.5px"/>').appendTo($icon);
        $('<img class="share" img src="assets/icons/Share.png" alt="" width="32px"/>').appendTo($icon);
      $icon.appendTo($tweet);
      $tweet.appendTo($feed);

      index -= 1;
    }

  };


//Puts Intital Tweets On Page
  newTweets();

//Show User Tweets
  // var userTweets = function(person) {
  //   $feed.html('');

   //   newTweets(tweet);
  // };

//Calls On Update
  $update.on("click", function(newUpdates) {
    newUpdates.preventDefault();
    $update.text('Update Feed');
    newTweets();
    });

//Go Home
  $home.on("click", function(event) {
    console.log(event);
    alert('We Home: ' + event.target.innerText);
    });

//Back Button
  //var $back = $('<button>Go Back</button>');$back.appendTo($app);


//Click User
$feed.on('click', 'span', function(event) {
  $feed.html('');
  $update.text('Back');
  var username = this.className;
    var index = streams.users[username].length - 1;
    while (index >= 0){

      var tweet = streams.users[username][index];
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
      $username.html('@<span class="' + tweet.user + '">' + tweet.user + '</span>');
      $username.appendTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.html($.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      var $icon = $('<div class="icon"></div>');
        $('<img class="like" img src="assets/icons/Like.png" alt="" width="33px"/>').appendTo($icon);
        $('<img class="comment" img src="assets/icons/Comment.png" alt="" width="29px"/>').appendTo($icon);
        $('<img class="retweet" img src="assets/icons/Retweet.png" alt="" width="30.5px"/>').appendTo($icon);
        $('<img class="share" img src="assets/icons/Share.png" alt="" width="32px"/>').appendTo($icon);
      $icon.appendTo($tweet);
      $tweet.appendTo($feed);

      index -= 1;
    }
 });




});

