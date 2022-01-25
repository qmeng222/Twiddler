$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  var $header = $('<h1>Twiddler</h1>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');




  var renderFeed = function(array){
    for(var i = array.length - 1; i >= 0; i--){
      var $div = $('<div class="tweet"></div>');
      var $message = $('<p class="message"></p>');
      var $username = $('<div class="username"></div>');
      var $proImg = $('<img class="profile-photo">');
      var path = "assets/img/" + array[i].user + ".png";
      var $currentTime = $('<div class="timestamp"></div');

      var $iconComment = $('<i class="fas fa-comments icon comment"></i>');
      var $iconLike = $('<i class="far fa-heart icon like"></i>');
      var $iconShare = $('<i class="fas fa-share icon share"></i>');
      var $iconRetweet = $('<i class="fas fa-retweet icon retweet"></i>');

      $proImg.attr("src", path);
      $username.text('@' + array[i].user);
      $message.text(array[i].message);

      var timestamp = jQuery.timeago(array[i].created_at);
      $currentTime.text(timestamp);

      $div.appendTo($feed);
      $proImg.appendTo($div);
      $username.appendTo($div);
      $message.appendTo($div);
      $currentTime.appendTo($div);

      $iconComment.appendTo($div);
      $iconLike.appendTo($div);
      $iconShare.appendTo($div);
      $iconRetweet.appendTo($div);


      var handleUsernameClick = function(){
        var currentUser = array[i].user;
        $username.on('click',function(){
        $feed.html('');
        $button.text('back');
        renderFeed(streams.users[currentUser]);
      })
      }();
    }
  }

  renderFeed(streams.home);


  $button.on('click', function(){
    $feed.html('');
    renderFeed(streams.home);
    $button.text('Update Feed');
  });

  $header.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  window.isItBeautifulYet = true;

});
