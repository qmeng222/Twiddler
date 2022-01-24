$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
    $app.html('');

    // Create new HTML elements
  var $header = $('<header></header>')
  var $title = $('<h1>Twiddler</h1>')
  var $updateFeedBtn = $('<button id="update-feed" type="button">Update Feed</button>')
  var $feed = $('<section id="feed">Feed</section>');
    var formatTweet = function (tweet) {
      var $tweet = $('<div class="tweet"></div>');
      var $img = $(`<img class="profile-photo" src=${streams.users[tweet.user][0].profilePhotoURL} alt=${tweet.user}></img>`);
      var $user = $(`<div class="username">@${tweet.user}</div>`);
      var $timestamp = $(`<div class="timestamp">${$.timeago(tweet.created_at)}</div>`);
      var $tweetMessage = $(`<p class="message">${tweet.message}</p>`)
      var $iconsSection = $('<div class="icon-container"></div>');
      var $commentIcon = $('<i class="fas fa-comments icon comment"></i>');
      var $retweetIcon = $('<i class="fas fa-retweet icon retweet"></i>');
      var $likeIcon = $('<i class="fas fa-thumbs-up icon like"></i>');
      var $shareIcon = $('<i class="fas fa-share-square icon share"></i>');
      $iconsSection.append([$commentIcon, $retweetIcon, $likeIcon, $shareIcon])
      $tweet.append([$img, $user, $timestamp, $tweetMessage, $iconsSection])
      return $tweet
    }

    var renderFeed = function (user) {
      $feed.html('');
      if (user === undefined) {
        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = formatTweet(tweet);
          $tweet.appendTo($feed);
          index -= 1;
          }
      } else {
        var index = streams.users[user].length - 1;
        while(index >= 0){
          var tweet = streams.users[user][index];
          var $tweet = formatTweet(tweet);
          $tweet.appendTo($feed);
          index -= 1;
          }
      }
    }

  renderFeed();

    // Create event handler functions

  var handleUpdateFeedClick = function (event) {
    console.log(event);
    renderFeed();
    if (event.target.innerText === "back") {
      $updateFeedBtn.text("Update Feed");
    };
  }

  var handleTitleClick = function (event) {
    console.log(event);
    alert('the title of the page is: ' + event.target.innerText);
  };

  var handleUsernameClick = function(event) {
      renderFeed(event.target.innerText.split('@')[1]);
      $updateFeedBtn.text('back');
  }
    // Set event listeners (providing appropriate handlers as input)
  $updateFeedBtn.on("click", handleUpdateFeedClick);

  $title.on("click", handleTitleClick);

  $feed.on("click", ".username", handleUsernameClick);

    // Append new HTML elements to the DOM
  $header.appendTo($app);
  $title.appendTo($header);
  $updateFeedBtn.appendTo($header);
  $feed.appendTo($app);

  window.isItBeautifulYet = true;
});