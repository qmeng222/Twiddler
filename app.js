$(document).ready(function(){ //document is the global scope of the html file

  //select already existing elements
  var $app = $('#app'); //the element with the id 'app' is stored to the variable '$app' as a jQuery array
  $app.html('');

  //CREATE NEW HTML ELEMENTS
  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed"></div>');

  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  $updateFeed.appendTo($app);

  var targetUserUpdate = function(event) {

    var targetUser = event.target.innerText.slice(1);

    if (targetUser) {
      $feed.html('');
      $updateFeed.text('Back');

      var index = streams.users[targetUser].length - 1;
      while(index >= 0){
        var $profilePhoto = $('<img class="profile-photo"></img>');
        var $username = $('<div class="username"></div>');
        var $message = $('<div class="message"></div>');
        var $timeStamp = $('<div class="timestamp"></div>');
        var $comment = $('<i class="comment far fa-comments"></i>');
        $comment.hover(
          function() {
            $(this).addClass("hover");
          }, function() {
            $(this).removeClass("hover");
          }
        );

        var $retweet = $('<i class="fas fa-retweet" class="icon"></i>');
        $retweet.hover(
          function() {
            $(this).addClass("hover");
          }, function() {
            $(this).removeClass("hover");
          }
        );

        var $like = $('<i class="far fa-heart" class="icon"></i>');
        $like.hover(
          function() {
            $(this).addClass("hover");
          }, function() {
            $(this).removeClass("hover");
          }
        );

        var $share = $('<i class="fas fa-share" class="icon"></i>');
        $share.hover(
          function() {
            $(this).addClass("hover");
          }, function() {
            $(this).removeClass("hover");
          }
        );

        var $tweet = $('<div class="tweet"></div>');

        var tweet = streams.users[targetUser][index];
        $tweet.appendTo($feed);
        $tweet.append($profilePhoto, $username, $message, $timeStamp, $comment, $retweet, $like, $share);
        $username.text('@' + tweet.user);
        $username.click(targetUserUpdate);
        $message.text(tweet.message);
        $timeStamp.text(jQuery.timeago(tweet.created_at));

        if (tweet.user === 'douglascalhoun') {
          $profilePhoto.append('<img src="assets/img/douglascalhoun.png" alt="profilePhoto"></img>');
        }
        if (tweet.user === 'shawndrost') {
          $profilePhoto.append('<img src="assets/img/shawndrost.png" alt="profilePhoto"></img>');
        }
        if (tweet.user === 'mracus') {
          $profilePhoto.append('<img src="assets/img/mracus.png" alt="profilePhoto"></img>');
        }
        if (tweet.user === 'sharksforcheap') {
          $profilePhoto.append('<img src="assets/img/sharksforcheap.png" alt="profilePhoto"></img>');
        }
        index -= 1;
      }
    }
  }

  var renderFeed = function(event) {
    $feed.empty();
    $updateFeed.text('Update Feed');
    var index = streams.home.length - 1;

    while(index >= 0){
      var $profilePhoto = $('<img class="profile-photo"></img>');
      var $username = $('<div class="username"></div>');
      var $message = $('<div class="message"></div>');
      var $timeStamp = $('<div class="timestamp"></div>');
      var $comment = $('<i class="comment far fa-comments"></i>');
      $comment.hover(
        function() {
          $(this).addClass("hover");
        }, function() {
          $(this).removeClass("hover");
        }
      );

      var $retweet = $('<i class="retweet fas fa-retweet" ></i>');
      $retweet.hover(
        function() {
          $(this).addClass("hover");
        }, function() {
          $(this).removeClass("hover");
        }
      );

      var $like = $('<i class="like far fa-heart"></i>');
      $like.hover(
        function() {
          $(this).addClass("hover");
        }, function() {
          $(this).removeClass("hover");
        }
      );

      var $share = $('<i class="share fas fa-share"></i>');
      $share.hover(
        function() {
          $(this).addClass("hover");
        }, function() {
          $(this).removeClass("hover");
        }
      );

      var $tweet = $('<div class="tweet"></div>');

      var tweet = streams.home[index];
      $tweet.appendTo($feed);
      $tweet.append($profilePhoto, $username, $message, $timeStamp, $comment, $retweet, $like, $share);
      $username.text('@' + tweet.user);
      $username.click(targetUserUpdate); //
      $message.text(tweet.message);
      $timeStamp.text(jQuery.timeago(tweet.created_at));

      if (tweet.user === 'douglascalhoun') {
        $profilePhoto.append('<img src="assets/img/douglascalhoun.png" alt="profilePhoto"></img>');
      }
      if (tweet.user === 'shawndrost') {
        $profilePhoto.append('<img src="assets/img/shawndrost.png" alt="profilePhoto"></img>');
      }
      if (tweet.user === 'mracus') {
        $profilePhoto.append('<img src="assets/img/mracus.png" alt="profilePhoto"></img>');
      }
      if (tweet.user === 'sharksforcheap') {
        $profilePhoto.append('<img src="assets/img/sharksforcheap.png" alt="profilePhoto"></img>');
      }
      index -= 1;
    }
  }

  renderFeed();
  $updateFeed.on("click", () => renderFeed());


  //APPEND NEW HTML ELEMENTS TO DOM
  $title.prependTo($app);
  $feed.appendTo($app);


  window.isItBeautifulYet = true;
});