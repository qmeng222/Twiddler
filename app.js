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
        'douglascalhoun': 'assets/img/douglascalhoun.png',
        'mracus': 'assets/img/mracus.png',
        'sharksforcheap': 'assets/img/sharksforcheap.png',
        'shawndrost': 'assets/img/shawndrost.png',
        'visitor': 'assets/img/visitor.png'
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

  // add new tweet div
  var $newTweetForm = $('<form action="" method="get" id="new-tweet-form"></form>');
  $updateFeedButton.before($newTweetForm);

  var $newTweetUsernameDiv = $('<div id="new-tweet-username" class="new-tweet-divs"></div>');
  var $newTweetUsernameLabel = $('<label for="username-input">Enter your username</label>');
  var $newTweetUsernameInput = $('<input type="text" id="username-input" placeholder="@..." class="new-tweet-inputs" required>');
  $newTweetForm.append($newTweetUsernameDiv);
  $newTweetUsernameDiv.append($newTweetUsernameLabel);
  $newTweetUsernameDiv.append($newTweetUsernameInput);

  var $newTweetMessageDiv = $('<div id="new-tweet-message" class="new-tweet-divs"></div>')
  var $newTweetMessageLabel = $('<label for="message-input">What are you thinking about?</label>');
  var $newTweetMessageInput = $('<textarea id="message-input" rows="3" cols="20" class="new-tweet-inputs" placeholder="..." required></textarea>');
  $newTweetForm.append($newTweetMessageDiv);
  $newTweetMessageDiv.append($newTweetMessageLabel);
  $newTweetMessageDiv.append($newTweetMessageInput);


  var $newTweetSubmitDiv = $('<div id="new-tweet-submit" class="new-tweet-divs"></div>')
  var $newTweetSubmitInput = $('<button type="submit" id="new-tweet-submit-btn" class="new-tweet-inputs" value="Submit">Twiddle</button>');
  $newTweetForm.append($newTweetSubmitDiv);
  $newTweetSubmitDiv.append($newTweetSubmitInput);



  window.isItBeautifulYet = true;
});