$(document).ready(function(){
  jQuery("time.timeago").timeago();

  //=========================================================
  // CODING FORMAT - Select already existing elements
  //=========================================================
  var $body = $('body');
  var $app = $('#app');
  $app.html('');

  //=========================================================
  // CODING FORMAT - Create new HTML elements
  //=========================================================
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');  //create a div with id='feed'
  //=========================================================
  // CODING FORMAT - Create event handler functions
  //=========================================================
  var renderFeed = function(index, user){  //user parameter require in project instruction
    $feed.empty();

    if (!user) {
      // var index = streams.home.length - 1;
      // var tweet = streams.home[index]; //if define tweet here it will affect home feed and everything becomes the same for every updatefeed click
      $updateFeed.text('Update Feed');
    } else {
      var index = streams.users[user].length - 1;
      // var tweet = streams.users[user][index];
      $updateFeed.text('Back');
    }

    while (index >= 0) {
      // var tweet = streams.home[index];
      // index = streams.home.length - 1
      // var tweet = streams.home[index];
      if (user === undefined) {
        var tweet = streams.home[index];
        // $updateFeed.text('Update Feed');
      } else {
        var tweet = streams.users[user][index];
        // $updateFeed.text('Back');
      }
      var $tweet = $('<div class="tweet"></div>');
      // FORMAT - Create new HTML elements
      // var $profilePhoto = $(<img class="profile-photo" src=" assets/img/ + tweet.user + .png ">);
      var $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"/>');
      var $userName = $('<span class="username"></span>');
      var $tweetMessage = $('<p class="message"></p>');
      var $timeStamp = $('<span class="timestamp"></span>');

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

      //organize and add elements
      $tweet.append($profilePhoto).append($userName).append($tweetMessage).append($timeStamp);
      $tweetIcons.appendTo($tweet);
      $tweetIcons.append($commentIcon).append($likeIcon).append($retweetIcon).append($shareIcon);

      //have to do this for for icons?
      $commentIcon.hover(
        function(){
          $(this).css('background-color', 'red');
        }, function(){
          $(this).css('background-color', 'green'); //how to make it default to background color?
        }
      );

      //helper function for hover  ..........
      //username needs hover too, later

      $userName.on('click', function(){
        // console.log($(this).text().slice(1))
        renderFeed(event, $(this).text().slice(1))
      });

      index -= 1;
    }

  }


  //=========================================================
  // CODING FORMAT - Set event listeners (providing appropriate handlers as input
  //=========================================================
  //substuded original code with below code to output initial tweets
  renderFeed(streams.home.length-1, undefined);

  $updateFeed.on('click', function(){
    renderFeed(streams.home.length-1, undefined)
  });

  //=========================================================
  // CODING FORMAT - Append new HTML elements to the DOM
  //=========================================================
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app)

});