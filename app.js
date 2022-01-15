$(document).ready(function() {

  // create and append app div
  var $app = $('#app');
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);

  // create and append feed div
  var feedDiv = $('#feed');
  var $feedDiv = $('<div id="feed"></div>');
  $feedDiv.appendTo($app);

  // create and append update feed button
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  $updateFeedButton.insertAfter($title);

  //timeago setup
  jQuery('.timeago').timeago();
  $('.timestamp').on('click', function() {
    $('.timeago').timeago('update', new Date());
  });
  jQuery.timeago.settings.allowFuture = true;

  // renders the updated feed with tweets in appropriate format
  var renderFeed = function(user) {
    $feedDiv.text('');
    if (user !== undefined) {
      var index = streams.users[user].length - 1;
      var input = true;
    } else {
      var index = streams.home.length - 1;
      var input = false;
    }

    while (index >= 0) {
      if (input) {
        var tweet = streams.users[user][index];
      } else {
        var tweet = streams.home[index];
      }
      var $tweet = $('<div class="tweet"></div>');
      $tweet.appendTo('#feed');

      var $tweetImg = $('<img class="profile-photo">');
      var profilePhotos = {
        'douglascalhoun': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/douglascalhoun.png',
        'mracus': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/mracus.png',
        'sharksforcheap': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/sharksforcheap.png',
        'shawndrost': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/shawndrost.png',
        'visitor': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/visitor.png'
      };
      var imgSrc = profilePhotos[tweet.user];
      $tweetImg.attr('src', imgSrc);
      $tweet.append($tweetImg);

      var $user = $('<span class="username"></span>');
      $tweet.append($user);
      $user.text('@' + tweet.user);

      var $message = $('<p class="message"></p>');
      $tweet.append($message);
      $message.text(tweet.message);

      var $timestamp = $('<time class="timestamp timeago"></time>');
      $tweet.append($timestamp);
      $timestamp.text(jQuery.timeago(tweet.created_at));

      var $commentIcon = $('<i id="comment-icon" class="icon comment fas fa-comment"></i>');
      $tweet.append($commentIcon);

      var $retweetIcon = $('<i id="retweet-icon" class="icon retweet fas fa-retweet"></i>');
      $tweet.append($retweetIcon);

      var $likeIcon = $('<i id="like-icon" class="icon like fas fa-heart"></i>');
      $tweet.append($likeIcon);

      var $shareIcon = $('<i id="share-icon" class="icon share fas fa-share"></i>');
      $tweet.append($shareIcon);

      index--;
    }
  };

  // execute renderFeed to load tweets on the landing page
  renderFeed();

  // add click event to update feed button
  $(document).on('click', '#update-feed', function() {
    if ($updateFeedButton.text() === 'Update Feed') {
      renderFeed();
    } else {
      $updateFeedButton.text('Update Feed');
      renderFeed();
    }
  });

  // add hover event to change icon color
  var $icons = $('.icon');
  $(document).on('mouseenter', '.icon', function() {
    $(this).css('color', 'lightblue');
  });
  $(document).on('mouseleave', '.icon', function() {
    $(this).css('color', 'black');
  });

  // add click event to switch from home feed to user feed and back to home feed
  var $allTweets = $('.tweet');
  var $usernames = $('.username');
  var handleUsernameClick = $(document).on('click', '.username', function(event) {
    if ($updateFeedButton.text() === 'Update Feed') {
      $updateFeedButton.text('Back');
      var user = $(event.target).text().slice(1);
      renderFeed(user);
    }
  });

  window.isItBeautifulYet = true;
});