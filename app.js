$(document).ready(function(){
  jQuery("time.timeago").timeago();

  // CODING FORMAT - Select already existing elements
  var $body = $('body');
  var $app = $('#app');
  $app.html('');

  // CODING FORMAT - Create new HTML elements
  var $header = $('<header></header>')
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed" class="grid"></div>'); //make it grid

  // CODING FORMAT - Create event handler functions
  var renderFeed = function(index, user){  //user parameter
    $feed.empty();

    if (!user) {
      $updateFeed.text('Update Feed');
    } else {
      var index = streams.users[user].length - 1;
      handleUsernameClick()
    }

    while (index >= 0) {
      if (user === undefined) {
        var tweet = streams.home[index];
      } else {
        var tweet = streams.users[user][index];
      }

      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"/>');
      var $userName = $('<div class="username"></div>');
      var $tweetMessage = $('<div class="message"></div>');
      var $timeStamp = $('<div class="timestamp"></div>');

      var $tweetIcons = $('<div class="icon"></div>');
      var $commentIcon = $('<i class="comment far fa-comment"></i>');
      var $likeIcon = $('<i class="like far fa-heart"></i>');
      var $retweetIcon = $('<i class="retweet fas fa-retweet"></i>');
      var $shareIcon = $('<i class="share far fa-share-square"></i>');

      //add data into divs
      $tweet.appendTo($feed)
      $profilePhoto.attr('src', 'assets/img/'+tweet.user+'.png');
      $userName.text('@' + tweet.user);
      $tweetMessage.text(tweet.message);
      $timeStamp.text(jQuery.timeago(tweet.created_at));

      //organize tweet elements
      $tweet.append($profilePhoto).append($userName).append($tweetMessage).append($timeStamp);
      $tweetIcons.append($commentIcon).append($likeIcon).append($retweetIcon).append($shareIcon);
      $tweetIcons.appendTo($tweet);

      $userName.on('click', function(){
        renderFeed(event, $(this).text().slice(1))
      });

      index -= 1;
    }

  }

  var handleUsernameClick = function() {
    if ($updateFeed.text() === 'Update Feed') { $updateFeed.text('Back') };
  };

  //initial tweets
  renderFeed(streams.home.length-1, undefined);

  // CODING FORMAT - Set event listeners (providing appropriate handlers as input
  $updateFeed.on('click', function(){
    renderFeed(streams.home.length-1, undefined)
  });

  // CODING FORMAT - Append new HTML elements to the DOM
  $title.appendTo($header);
  $header.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app)


  window.isItBeautifulYet = true;

});