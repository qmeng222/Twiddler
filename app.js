$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id ="update-feed">Back</button>');
  var $feed = $('#feed');

  $title.appendTo($app);
  $button.appendTo($app);

  $("#update-feed").on("click", function(event) {
    updateFeed();
  });

  var updateFeed = function () {
    /*The following line of code was actually done at the very end, due to me not carefully reading
    all IOCE. I assumed that we were not allowed to clear the feed each update, rather we had to keep
    what was already instantiated, then build on top of it and manipulate it. This caused ghost issues with
    chronological order intermittently, as well as the tweet class not being identified. I knew I would need to
    fix that issue, but I probably would have saved time if I had done this beforehand. Overall was a good lesson.
    I did get a better understanding of some of the jQuery functions, such as unique() and uniqueSort(), which
    also had me consider the version of jQuery we were using.
    */
    $feed.find(".tweet").remove();
    var index = streams.home.length-1;

    while(index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');

      if(tweet.user === 'mracus') {
        var $photo = $('<img class="profile-photo" src="assets/img/mracus.png">');
      } else if(tweet.user === 'douglascalhoun') {
        var $photo = $('<img class="profile-photo" src="assets/img/douglascalhoun.png">');
      } else if(tweet.user === 'sharksforcheap') {
        var $photo = $('<img class="profile-photo" src="assets/img/sharksforcheap.png">');
      } else if(tweet.user === 'shawndrost') {
        var $photo = $('<img class="profile-photo" src="assets/img/shawndrost.png">');
      } else {
        var $photo = $('<img class="profile-photo" src="assets/img/visitor.png">');
      }
      $photo.appendTo($tweet);

      var $username = $('<div class="username"></div>');
      $username.text("@" + tweet.user);
      $username.appendTo($tweet);

      var $message = $('<div class="message"></div>');
      $message.text(tweet.message);
      $message.appendTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      var $comment = $('<i class="comment fas fa-comments"></i>');
      $comment.appendTo($tweet);

      var $retweet = $('<i class="retweet fas fa-share-square"></i>');
      $retweet.appendTo($tweet);

      var $like = $('<i class="like fas fa-thumbs-up"></i>');
      $like.appendTo($tweet);

      var $share = $('<i class="share fas fa-share"></i>');
      $share.appendTo($tweet);

      $tweet.appendTo($feed);


      index -= 1;
      $(".username").on("click", function(event) {
        /*Would like to add, hide and detach work, but they do not pass the test.
        They keep empty tweet elements which cause it to fail. Not something huge, but
        good to remember for the future.

        ALSO, figuring out how to filter out outer elements based on inner elements was the most time-consuming
        and frustrating part. This module DEFINITELY made me go back a few times to all the documentation.
        It also made me really brainstorm, and pseudo code. Once I did, the parent function really showed out to me
        */
        removed = $feed.find('.username:not(:contains(' + $(this).text() + '))').parent().empty();
      });
    }

    $feed.appendTo($app);
  }

  updateFeed();
  window.isItBeautifulYet = true;
});