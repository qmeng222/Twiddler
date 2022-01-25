$(document).ready(function(){
  var $app = $('#app');

  //title twiddler 2.0
  // var $title = $('<h1>Twiddler 2.0</h1>');
  // $("h1").prepend($app);
  // $title.on("click", function(event){
  //   console.log(event);
  //   alert('The title of this page is: ' + event.target.innerText);
  // });


  var $feed = $('#feed');
  //


  var renderFeed = function (array) {
    var index = array.length - 1;
    while(index >= 0){
      var tweet = array[index];
      var $tweet = $('<div class="tweet"></div>');
      var $user = $('<p class="username"></p>');
      var $message = $('<p class="message"></p>');
      var $photo = $('<img class="profile-photo">');
      var $time = $('<div class="timestamp"></div>');
      var $iconComment = $('<i class="fas fa-comments comment"></i>');
      var $iconRetweet = $('<i class="fas fa-retweet retweet"></i>');
      var $iconLike = $('<i class="fas fa-heart like"></i>');
      var $iconShare = $('<i class="fas fa-share share"></i>');
      var path = 'assets/img/' + tweet.user +'.png';
      $photo.attr('src', path).appendTo($tweet);
      $user.text('@' + tweet.user).appendTo($tweet);
      $message.text(tweet.message).appendTo($tweet);
      var timestamp = jQuery.timeago(tweet.created_at);
      $time.text(timestamp).appendTo($tweet);
      $iconComment.appendTo($tweet);
      $iconRetweet.appendTo($tweet);
      $iconLike.appendTo($tweet);
      $iconShare.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;


      // var handlerOnClick = function () {
      //   var currentUser = tweet.user
      //   $user.on('click', funtion () {
      //     $feed.html('');
      //     renderFeed(streams.users[currentUser]);
      //   })
      // }();
      var handleUsernameClick = function () {
        var currentUser = tweet.user;
        $user.on('click',function(){
        $feed.html('');
        renderFeed(streams.users[currentUser]);

        //add back button
        $button.text("back");

      })
      }();
    }
  }

  renderFeed(streams.home);


//botton update feed
  // var myCoolFunction = function() {
  //   alert("Love");
  //   generateRandomTweet();
  // }
  // var $update = $('<div id="update-feed">Click Me!</div>')
  // $update.appendTo($app);
  var $button = $("<button id='update-feed'>Check New Tweet</button>");
  $button.appendTo("#updateButton");
  $button.on('click', function () {
    $feed.html('');
    renderFeed(streams.home);
    $button.text("Check New Tweet")
;  });

// click on user name show all timeline tweets
  // $('.username').click(function(){
  //  $feed.html('');

  // });

});

window.isItBeautifulYet = true;