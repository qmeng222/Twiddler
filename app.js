$(document).ready(function () {
  var $app = $('#app');
  $app.html('');

  jQuery(document).ready(function () {
    jQuery("time.timeago").timeago();
  });

  window.isItBeautifulYet = true







  // this div id=title houses the title and the update me button/back
  var $title = $('<div id=title><h1><p>Twiddler 2.0</p></h1></div>');
  $title.appendTo($app);

  var $updated_feed_button = $('<section id=update-feed><button>Update Feed</button></section>');

  $updated_feed_button.appendTo($title);

  $updated_feed_button.on("click", function (event) {
    $feed.html('');
    $updated_feed_button.html('<section id=update-feed><button>Update Feed</button></section>');
    refreshFeed();
  });



  // this div id=feed houses the feed of tweeds
  var $feed = $('<div id=feed></div>');
  $feed.appendTo($app);

  function refreshFeed(name) {

    if (name === undefined) {
      var index = streams.home.length - 1;
      while (index >= 0) {
        var tweet = streams.home[index];
        var photoDir = "assets/img/" + tweet.user + ".png";
        var $tweet = $('<div class="tweet"></div>');
        var $username = $('<section class="username"></section>');
        var $photo = $('<section class="photo"></section>');
        var $message = $('<section class="message"></section>');
        var $comboCRLS = $('<section class=comboCRLS></section>');
        var $timestamp = $('<section class="timestamp"></section>');

        $username.text('@' + tweet.user + ': ');
        $('<img class="profile-photo" src=' + photoDir + '></img>').appendTo($photo);
        $message.text(tweet.message);
        $('<i class="comment fa-regular fa-comment"></i>').appendTo($comboCRLS);
        $('<i class="retweet fa-solid fa-retweet"></i>').appendTo($comboCRLS);
        $('<i class="like fa-regular fa-star"></i>').appendTo($comboCRLS);
        $('<i class="share fa-regular fa-circle-user"></i>').appendTo($comboCRLS);
        $timestamp.text(jQuery.timeago(streams.home[index].created_at));

        $username.appendTo($tweet);
        $photo.appendTo($tweet);
        $message.appendTo($tweet);
        $comboCRLS.appendTo($tweet);
        $timestamp.appendTo($tweet);

        $tweet.appendTo($feed);
        index -= 1;

      }

    } else {
      for (var index = streams.home.length - 1; index >= 0; index--) {
        if (streams.home[index].user === name) {

          var tweet = streams.home[index];
          var photoDir = "assets/img/" + tweet.user + ".png";
          var $tweet = $('<div class="tweet"></div>');
          var $username = $('<section class="username"></section>');
          var $photo = $('<section class="photo"></section>');
          var $message = $('<section class="message"></section>');
          var $comboCRLS = $('<section class=comboCRLS></section>');
          var $timestamp = $('<section class="timestamp"></section>');

          $username.text('@' + tweet.user + ': ');
          $('<img class="profile-photo" src=' + photoDir + '></img>').appendTo($photo);
          $message.text(tweet.message);
          $('<i class="comment fa-regular fa-comment"></i>').appendTo($comboCRLS);
          $('<i class="retweet fa-solid fa-retweet"></i>').appendTo($comboCRLS);
          $('<i class="like fa-regular fa-star"></i>').appendTo($comboCRLS);
          $('<i class="share fa-regular fa-circle-user"></i>').appendTo($comboCRLS);
          $timestamp.text(jQuery.timeago(streams.home[index].created_at));

          $username.appendTo($tweet);
          $photo.appendTo($tweet);
          $message.appendTo($tweet);
          $comboCRLS.appendTo($tweet);
          $timestamp.appendTo($tweet);

          $tweet.appendTo($feed);
        }

      }

    }

    $('.username').click(function (event) {
      $feed.html('');
      $updated_feed_button.html('<section id=update-feed><button>Back</button></section>');
      refreshFeed(event.target.innerText.slice(1, -2));
    });

    $("i").hover(function () {
      $(this).css("background-color", "lightblue");
    }, function () {
      $(this).css("background-color", "white");
    });


  }


  // this div id=footer houses the username input, comment textarea and list of friends to dynamitaclly change feed
  var $footer = $('<div id=footer>...</div>');
  $footer.appendTo($app);

  refreshFeed();
});

