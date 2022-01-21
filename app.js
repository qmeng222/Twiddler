$(document).ready(function () {

  var $feed = $('#feed');
  var $home = $('#home');
  var $update = $('#update-feed');
  var $form = $('.tweet-form');
  var $back = $('#back');
  var $twiddlers = $('.feed-container');
  $back.hide();

  var updateFeed = function (selectedUser) {
    var index = selectedUser ? streams.users[selectedUser].length - 1 : streams.home.length - 1;
    while (index >= 0) {
      var tweet = selectedUser ? streams.users[selectedUser][index] : streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $img = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png" alt="User Profile Picture"/>');
      var $twiddlerContainer = $('<div class="twiddler-container"></div>');
      var $username = $('<div class="username" id="' + tweet.user + '">' + '@' + tweet.user + '</div>');
      var $message = $('<div class="message">' + tweet.message + '</div>');
      var $interactions = $('<div class="interactions"><i class="fas fa-comment comment"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i><i class="fas fa-share"></i></div>');
      var $timeStamp = $('<time class="timeago timestamp" datetime=' + tweet.created_at.toISOString() + '></time>');

      $twiddlerContainer.append($username).append($message).append($interactions).append($timeStamp);
      $tweet.prepend($img).append($twiddlerContainer);
      $tweet.appendTo($feed);
      index -= 1;
    }
    $("time.timeago").timeago();
  };

  var userFeed = function (selectedUser) {
    $form.hide();
    $back.show();
    $update.hide();
    $feed.empty();

    updateFeed(selectedUser);
  }

  $twiddlers.on('click', '#shawndrost', function () { userFeed('shawndrost') });
  $twiddlers.on('click', '#sharksforcheap', function () { userFeed('sharksforcheap') });
  $twiddlers.on('click', '#mracus', function () { userFeed('mracus') });
  $twiddlers.on('click', '#douglascalhoun', function () { userFeed('douglascalhoun') });

  $update.on('click', function (event) {
    $feed.empty();
    updateFeed();
  });

  $('#home, #back').on('click', function (event) {
    if ($form.is(':visible')) {
      return;
    }

    $form.show();
    $back.hide();
    $update.show();
    $feed.empty();
    updateFeed();
  });

  updateFeed();
});