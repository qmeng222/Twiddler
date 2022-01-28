$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  $("time.timeago").timeago();

  var $app = $('#app');
  var $title = $('<h1 id=title>Pupper</h1>');
  var $feed = $('<div id=feed></div>');
  var $updateFeed = $('<button id=update-feed>Update</button>')


  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);

  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  var userFeed = function(username) {
    var result = [];
    for (var i = 0; i < streams.home.length; i++) {
      if (streams.home[i].user === username) {
        result.push(streams.home[i])
      };
    };
    return result;
  };

  var renderfeed = function(user) {
    var page = streams.home
    if (user !== undefined) {
      page = userFeed(user);
    }
    var index = page.length - 1;
    while(index >= 0){
      var tweet = page[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.appendTo($feed);
      var $message = $('<div class="message"></div>');
      var $user = $('<div class="username"></div>');
      var $img = $('<img class="profile-photo">');
      var $timestamp = $('<div class="timestamp timeago"></div>');
      var $comment = $('<i class="fas fa-comment icon comment" >');
      var $retweet = $('<i class="fas fa-retweet icon retweet" >');
      var $like = $('<i class="fas fa-solid fa-paw icon like" >');
      var $share = $('<i class="fas fa-share icon share" >');
      $img.attr("src", function() {
        if (tweet.user === 'Sibby') {
          return 'assets/img/Sibby.jpg';
        } else if (tweet.user === 'Simba') {
          return 'assets/img/Simba.jpg';
        } else if (tweet.user === 'Simbobway') {
          return 'assets/img/Simbobway.jpg';
        } else if (tweet.user === 'Simby') {
          return 'assets/img/Simby.jpg';
        }
      });
      $img.appendTo($tweet);
      $user.text('@' + tweet.user);
      $user.appendTo($tweet);
      $message.text(tweet.message);
      $message.appendTo($tweet);
      $timestamp.text($.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      index -= 1;
    }
  }

  renderfeed();

  $updateFeed.on("click", function(event) {
    $feed.empty();
    renderfeed();
    $('#update-feed').html('Update');
  })

  $(document).on("click", '.username', function(event) {
    var text = $(this).text()
    userClick = text.substring(1);
    $feed.empty();
    renderfeed(userClick);
    $('#update-feed').html('Back');
  })

  window.isItBeautifulYet = true
});
