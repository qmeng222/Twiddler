$(document).ready(function() {

  // create and append app div
  var $app = $('#app');
  var $title = $('<h1>twiddler</h1>');
  $title.appendTo($app);

  // create and append feed div
  var feedDiv = $('#feed');
  var $feedDiv = $('<div id="feed"></div>');
  $feedDiv.appendTo($app);

  // create and append update feed button
  var $updateFeedButton = $('<button id="update-feed" class="button">update feed</button>');
  var $updateFeedDiv = $('<div id="update-feed-div"></div>');
  $updateFeedDiv.insertAfter($title);
  $updateFeedButton.appendTo($updateFeedDiv);

  //timeago setup
  jQuery('.timeago').timeago();
  $('.timestamp').on('click', function() {
    $('.timeago').timeago('update', new Date());
  });

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
      $tweetImg.attr('src', tweet.profilePhotoURL);
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
    if ($updateFeedButton.text() === 'update feed') {
      renderFeed();
    } else {
      $updateFeedButton.text('update feed');
      renderFeed();
    }
  });

  // add hover event to change username color (behaves like a hyperlink)
  $(document).on('mouseenter', '.username', function() {
    $(this).css('color', '#39798f');
  });
  $(document).on('mouseleave', '.username', function() {
    $(this).css('color', 'rgb(90, 178, 207)');
  })

  // add hover event to change button color
  $(document).on('mouseenter', '.button', function() {
    $(this).css('background-color', '#bdbdbd');
  });
  $(document).on('mouseleave', '.button', function() {
    $(this).css('background-color', '#d6d6d4');
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
    if ($updateFeedButton.text() === 'update feed') {
      $updateFeedButton.text('back');
      var user = $(event.target).text().slice(1);
      renderFeed(user);
    }
  });

  // add new tweet form
  var $newTweetForm = $('<form method="post" id="new-tweet-form" type="submit"></form>');
  $('h1').after($newTweetForm);

  var newTweet = function() {
    // add new tweet username input
    var $newTweetUsernameDiv = $('<div id="new-tweet-username" class="new-tweet-divs"></div>');
    var $newTweetUsernameLabel = $('<label for="username-input">username</label>');
    var $newTweetUsernameInput = $('<input type="text" id="username-input" placeholder="@..." class="new-tweet-inputs" name="username" required>');
    $newTweetForm.append($newTweetUsernameDiv);
    $newTweetUsernameDiv.append($newTweetUsernameLabel);
    $newTweetUsernameDiv.append($newTweetUsernameInput);

    // add new tweet message input
    var $newTweetMessageDiv = $('<div id="new-tweet-message" class="new-tweet-divs"></div>')
    var $newTweetMessageLabel = $('<label for="message-input">what are you thinking about?</label>');
    var $newTweetMessageInput = $('<input id="message-input" name="message" type="text" class="new-tweet-inputs" placeholder="..." required>');
    $newTweetForm.append($newTweetMessageDiv);
    $newTweetMessageDiv.append($newTweetMessageLabel);
    $newTweetMessageDiv.append($newTweetMessageInput);

    // add new tweet submit form button
    var $newTweetSubmitDiv = $('<div id="new-tweet-submit" class="new-tweet-divs"></div>')
    var $newTweetSubmitInput = $('<input type="submit" id="new-tweet-submit-btn" class="new-tweet-inputs button" value="twiddle"></input>');
    $newTweetForm.append($newTweetSubmitDiv);
    $newTweetSubmitDiv.append($newTweetSubmitInput);

    // add new tweet to feed on form submit
    $newTweetForm.submit(function(event) {
      event.preventDefault();
      window.visitor = $newTweetUsernameInput.val();
      writeTweet($newTweetMessageInput.val());
      renderFeed();
      $newTweetUsernameInput.val('');
      $newTweetMessageInput.val('');
    });
  }
  newTweet();

  // create friends list
  var $friendsListDiv = $('<div id="friends-list-div"></div>');
  var $friendsListHeader = $('<h2 id="friends-header">friend\'s list</h2>');
  var $friendsListUl = $('<ul id="friends-list"></ul>');
  $friendsListDiv.insertBefore($updateFeedDiv);
  $friendsListDiv.append($friendsListHeader);
  $friendsListDiv.append($friendsListUl);

  var friends = streams.users;
  for (var user in friends) {
    var $friendsListLi = $('<li class="friend username"></li>');
    $friendsListLi.text('@' + user);
    $friendsListUl.append($friendsListLi);
  }

  window.isItBeautifulYet = true;

});