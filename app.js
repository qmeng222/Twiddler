$(document).ready(function () {



  //creat function to render feed
  function renderFeed(user) {
    $feed.html($feed);
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];

      //filter the input of user, if user is undefined or select the tweet.user to filter the tweet
      if (typeof user === "undefined" || tweet.user==user) {

        var $tweet = $('<div class="tweet"></div>');
        //$tweet.text('@' + tweet.user + ': ' + tweet.message);
        var $photo = $('<div><img src="assets/img/' + tweet.user + '.png"  class="profile-photo"></div>');
        $photo.appendTo($tweet);
        var $userName = $('<div class ="username">@' + tweet.user + '</div>');
        $userName.appendTo($tweet);
        $userName.on('click', handleUsernameClick);
        var $message = $('<div class ="message">' + tweet.message + '</div>');
        $message.appendTo($tweet);
        var time = $.timeago(tweet.created_at);
        var $timeStamp = $('<div class ="timestamp">' + time + '</div>');
        $timeStamp.appendTo($tweet);
        var $comment = $('<i class="fa-solid fa-comment icon comment" ></i>');
        $comment.appendTo($tweet);
        var $retweet = $('<i class="fa-solid fa-retweet icon retweet" ></i>');
        $retweet.appendTo($tweet);
        var $like = $('<i class="fa-solid fa-heart icon like" ></i>');
        $like.appendTo($tweet);
        var $share = $('<i class="fa-solid fa-share icon share" ></i>');
        $share.appendTo($tweet);

        //create function mouseover to change icon color
        $(".icon").hover(function () {
          $(this).css("color", "red");
        }, function () {
          $(this).css("color", "black");
        });
        //add tweet to feed
        $tweet.appendTo($feed);
      }
        index -= 1;
    }

  }


  //create handleUsernameClick to feed only clicked user's tweets

  var handleUsernameClick = function (event) {
    $feed.html('');
    var click = event.target.innerText;
    var user = click.substring(1);
    $button_upfeed.html("Back");
    renderFeed(user);
  }




  var $app = $('#app');
  $app.html('');

  //title of Twiddler
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  // $title.on("click", function (event) {
  //   console.log(event);
  //   alert('The title of this page is: ' + event.target.innerText);
  // });

  //Create a button with the ID "update-feed".
  var $button_upfeed = $('<button>Update Feed</button>');
  $button_upfeed.appendTo($app);
  $button_upfeed.attr("id", 'update-feed');

  //defined $feed
  var $feed = $('<div></div>');
  $feed.appendTo($app);
  $feed.attr('id', 'feed');

  renderFeed();

  //Add a click event listener to the button.
  $button_upfeed.on('click', function (event) {
     renderFeed();
     $button_upfeed.html("Update Feed");
    })


});
window.isItBeautifulYet = true ;