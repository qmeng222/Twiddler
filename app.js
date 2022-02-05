$(document).ready(function(){

  var $app = $('#app');
  $app.html('');

  var $title = $('<h1 id= "logo"><img src= "./assets/img/logo.png"></h1>');
  var $button = $('<button id= "update-feed">Update Feed</button>');
  var $feed = $('<div id = "feed"></div>');

  // $title.on("click", function(event) {
  //   console.log(event);
  //   alert('The title of this page is: ' + event.target.innerText);
  // });

  var renderFeed = function (user) {

    var feedData = streams.users[user] || streams.home;

      $('#feed').empty();

      var index = feedData.length - 1;

      while(index >= 0){
        var tweet = feedData[index];
        var $tweet = $('<div class="tweet"></div>');

        var $profile = $('<img class= "profile-photo" src="./assets/img/' + tweet.user + '.png"></img>');
        var $username = $('<div class= "username"></div>');
        var $message = $('<p class= "message"></p>');
        var $timestamp = $('<div class= "timestamp"></div>');
        var $comment = $('<i class= "icon comment fas fa-comment-alt"></i>');
        var $retweet = $('<i class= "icon retweet fas fa-retweet"></i>');
        var $like = $('<i class= "icon like fab fa-gratipay"></i>');
        var $share = $('<i class= "icon share fas fa-share-square"></i>');

        $message.text(tweet.message);
        $username.text('@' + tweet.user);
        $profile.attr(tweet.user);
        $timestamp.text(jQuery.timeago(tweet.created_at));

        $tweet.append($profile);
        $tweet.append($username);
        $tweet.append($message);
        $tweet.append($timestamp);
        $tweet.append($comment);
        $tweet.append($retweet);
        $tweet.append($like);
        $tweet.append($share);

        $tweet.appendTo($feed);
        index -= 1;

       $('.username').on("click", function(event) {
        var user = event.target.innerText;
        user = user.slice(1);
        handleUsernameClick(user);
       });
      }

};

  renderFeed();
  $button.on("click", renderFeed);

  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  function handleUsernameClick(user) {
    renderFeed(user);
    $button.text('Back');
    $button.on('click', function(event) {
      renderFeed();
      $button.text('Update Feed');
    })
  }

window.isItBeautifulYet = true;

});