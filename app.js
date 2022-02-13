$(document).ready(function(){
  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });


  var $app = $('#app');
  $app.html('');
  var $title = $('<h1>Twiddler</h1>');
  var $buttonPlacement = $('<h2></h2>');
  $title.appendTo($app);
  $buttonPlacement.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $updateFeed = $('<button id="update-feed" type="button">Update Feed</button>');
  $updateFeed.appendTo($buttonPlacement);

  var $feed = $('<div id="feed"></div>');


  var renderFeed = function() {
    if (arguments[0]) {
      var clickedUser = arguments[0];
      console.log(clickedUser);
    }
    var index = streams.home.length - 1;
    var usedTweets = [];
    while(index >= 0){
      var tweet = streams.home[index];
      var isDuplicateTweet = false;
      //console.log(index);
      if (clickedUser && ('@' + tweet.user + ':') !== clickedUser) {
        index--;
        continue;
      }
      for (var i = 0; i < usedTweets.length; i++) {
        if (JSON.stringify(tweet) === JSON.stringify(usedTweets[i])) {
          isDuplicateTweet = true;
          break;
        }
      }
      if (isDuplicateTweet) {
        index++;
        continue;
      }
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<div class="message"></div>');
      var $profilePhoto = $('<img class="profile-photo"></img>');
      var $username = $('<div class="username"></div>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $comment = $('<i class="comment fa-solid fa-comment"</i>');
      var $retweet = $('<i class="retweet fa-solid fa-retweet"></i>');
      var $like = $('<i class="like fa-solid fa-thumbs-up"></i>');
      var $share = $('<i class="share fa-solid fa-share-from-square"></i>');

      if (tweet.user === 'sharksforcheap') {
        $profilePhoto = $('<img class="profile-photo" src="assets/img/sharksforcheap.png"></img>');
      } else if(tweet.user === 'douglascalhoun'){
        $profilePhoto = $('<img class="profile-photo" src="assets/img/douglascalhoun.png"></img>');
      } else if(tweet.user === 'mracus'){
        $profilePhoto = $('<img class="profile-photo" src="assets/img/mracus.png"></img>');
      } else if(tweet.user === 'shawndrost'){
        $profilePhoto = $('<img class="profile-photo" src="assets/img/shawndrost.png"></img>');
      }
      $message.text(tweet.message);
      $profilePhoto.appendTo($tweet);
      $username.text('@' + tweet.user + ':');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      usedTweets.push(streams.home[index]);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);


      $username.on("click", function() {
        $feed.html('');
        $updateFeed.remove();
        $updateFeed = $('<button id="update-feed" type="button">Back</button>');
        $updateFeed.appendTo($buttonPlacement);
        $updateFeed.on("click", function () {
          $feed.html('');
          currentUser = '';
          $updateFeed.remove();
          $updateFeed = $('<button id="update-feed" type="button">Update Feed</button>');
          $updateFeed.appendTo($buttonPlacement);
          renderFeed();
        })

        var currentUser = jQuery(this).text();
        if (currentUser === '@douglascalhoun:') {
          renderFeed(currentUser);
        } else if (currentUser === '@shawndrost:') {
          renderFeed(currentUser);
        } else if (currentUser === '@mracus:') {
          renderFeed(currentUser);
        } else if (currentUser === '@sharksforcheap:') {
          renderFeed(currentUser);
        }



      })

      $tweet.appendTo($feed);

      index -= 1;
    }
  }


  $updateFeed.on("click", function() {
    $feed.html('');
    renderFeed();
  });

  renderFeed();




  $feed.appendTo($app);

});
window.isItBeautifulYet = true;