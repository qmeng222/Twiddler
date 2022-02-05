$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // html elements
  var $leftColumn = $("<div class='leftColumn'></div>")
  var $homeFeed = $("<div id='feed'></div>")
  var $updateButton = $("<button id='update-feed'>Update Feed</button>")
  var $title = $("<h1 class='title'>Twiddler</h1>")
  var $tweet = $('<div class="tweet"></div>');
  var specificUser = '';

  var handleUpdateButton = function() {
    $homeFeed.empty();
    $updateButton.html('Update Feed');
    renderFeed();
  }

  var handleUserFeed = function() {
    $homeFeed.empty();
    $updateButton.html('Back')
    specificUser = $(this).text().slice(1);
    renderFeed(specificUser);
  }

  var handleIconColor = function () {
    $(this).css("color", "grey")
  }

  var revertIconColor = function () {
    $(this).css("color", "black")
  }

  // event listeners
  $updateButton.on("click", handleUpdateButton)
  $(document).on("click", '.username', handleUserFeed)

  // append html elements to the DOM
  $leftColumn.appendTo($app)
  $title.appendTo($leftColumn)
  $updateButton.appendTo($leftColumn)
  $homeFeed.appendTo($app)

  // helper functions
  var generateIcons = function(tweet) {
    var $icons = ['comment far fa-comments fa-2x', 'retweet fa fa-retweet fa-2x',
    'like fa fa-heart fa-2x', 'share fa fa-share fa-2x']

    for (var i = 0; i < $icons.length; i++) {
      var $icon = $(`<i class="icons ${$icons[i]}"></i>`)
      $icon.appendTo(tweet)
    }
    $(".icons").hover(handleIconColor, revertIconColor)
  }

  var renderFeed = function(uniqueUser) {
    var index = streams.home.length - 1;

    if (uniqueUser) {
      index = streams.users[uniqueUser].length - 1;
    }

    while(index >= 0){
      var tweet = streams.home[index];
      console.log(tweet)

      if (uniqueUser) {
        tweet = streams.users[uniqueUser][index];
      }

      var $tweet = $('<div class="tweet"></div>');
      var $profilePic = $(`<img class="profile-photo" src=${tweet.profilePhotoURL}>`)
      var $username = $(`<span class="username">@${tweet.user}</span>`)
      var $message = $(`<p class="message">${tweet.message}</p>`)
      var $timestamp = $(`<span class="timestamp">${jQuery.timeago(tweet.created_at)}<span/>`);

      $tweet.appendTo($homeFeed);
      $profilePic.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      generateIcons($tweet);

      index -= 1;
    }
  }
  renderFeed();
});
window.isItBeautifulYet = true;