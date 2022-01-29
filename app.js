$(document).ready(function(){
  // Select the div with the ID #app
  var $app = $('<div id = "app"></div>');
  $app.appendTo('body');
  $app.html('');

  // Create an element within the #app element with id feed
  var $feed = $('<div id = "feed"></div>');
  $feed.appendTo($app);

  //functions - Begin --------------
  var JQhtmlDiv = function(className) {
    return $('<div class="' + className + '"></div>');
  }

  var JQhtmlIcon = function(className) {
    return $('<i class="' + className + '"></i>');
  }

  var feedGenerator = function(user) {
    if(user) {
      var streamSource = streams.users[user];
    } else {
      var streamSource = streams.home;
    }
    var index = streamSource.length - 1;
    while(index >= 0){
      var tweet = streamSource[index];
      var $tweet = JQhtmlDiv('tweet');
      var $message = JQhtmlDiv('message');
      var $userName = JQhtmlDiv('username');
      var $timeStamp = JQhtmlDiv('timestamp');
      var $userImage = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');

      //icons
      var $comment = JQhtmlIcon("comment fas fa-comment");
      var $retweet = JQhtmlIcon("retweet fas fa-retweet");
      var $like = JQhtmlIcon("like fas fa-thumbs-up");
      var $share = JQhtmlIcon("share fas fa-share");

      //set the content within desired elements
      $message.text(tweet.message);
      $userName.text('@' + tweet.user);
      $timeStamp.text(jQuery.timeago(tweet.created_at));

      //insert elements into the DOM
      $tweet.appendTo($feed);
      // handle tweet elements
      tweetElements = [$message, $userName, $userImage, $timeStamp, $comment,
        $retweet, $like, $share];
      tweetElements.forEach(function(tweetElement) {
        tweetElement.appendTo($tweet);
      })
      index -= 1;
    }
  }

  function refreshFeed(user) {
    var feedBtnTxt = user ? 'Back' : 'Update Feed';
    var $updateFeed = $('<button id="update-feed" type="button">'+feedBtnTxt+'</button>' );
    $updateFeed.appendTo($feed);
    feedGenerator(user);

    $(".tweet .username").on("click", function(event) {
      var user = $(this).text().substring(1);
      $feed.html('');
      refreshFeed(user);
    });

    $updateFeed.on("click", function(event) {
      $feed.html('');
      refreshFeed();
    });
  };
  // functions - end ------------------------

  refreshFeed();

  window.isItBeautifulYet = true;

});