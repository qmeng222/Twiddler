
$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

    //-----Title-----
    var $title = $('<h1 class="header">Station Twiddler</h1>');
    $title.appendTo($app);
    $title.on("click", function(event) {
      console.log(event);
      alert('Survival is insufficient');
    });
    var $subheader = $('<h2>20 years after the flu <br> Your friends are sending beacons of hope</h2>');
    $subheader.appendTo($title);

    //-----Update Feed button-----
    var $updateFeed = $('<button id="update-feed"></button>');
    $updateFeed.text('Update Feed');
    $updateFeed.appendTo($app);

    var $feed = $('<div id="feed"></div>');
    $feed.appendTo($app);
    renderFeed($feed, streams.home);

    $updateFeed.on("click", function(event) {
      document.querySelector('button').innerText = "Update Feed";
        $($feed).empty();
        renderFeed($feed, streams.home);
    });

});

//-----RenderFeed function - refactored-----
function renderFeed($feed, array) {
  var index = array.length - 1;
  while (index >= 0) {
    var tweet = array[index];
    var $tweet = $('<div class="tweet"></div>');

    //username
    var $username = $('<p class="username"></p>');
    $username.text('@' + tweet.user);
    //username feed
    $username.on("click", function(event) {
      document.querySelector('button').innerText = "Back";
      $($feed).empty();
      var user = event.target.innerText.slice(1);
      var userArray = streams.users[user];
      renderFeed($feed, userArray);
    });

    //message
    var $message = $('<p class="message">' + tweet.message + '</p>');

    //profile-photo
    var $img = $('<img class="profile-photo" src=' + tweet.profilePhotoURL + '>');

    //timestamp
    var $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text(jQuery.timeago(tweet.created_at));

    //icons
    var $comment = $('<i class="icon comment fas fa-comment-dots"></i>');
    var $like = $('<i class="icon like fas fa-fire-alt"></i>');
    var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
    var $share = $('<i class="icon share fas fa-satellite-dish"></i>');

    //-----Append elemnts to Tweet-----//

    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $img.prependTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $like.appendTo($tweet);
    $retweet.appendTo($tweet);
    $share.appendTo($tweet);

    //-----Apend Tweet to Feed-----//
    $tweet.appendTo($feed);
    index -= 1;
  }
};

window.isItBeautifulYet = true;
  //   //-----New Tweet Form-----
  //     var $form = $('<form>Send a beacon of hope...</form>')
  //     $form.appendTo($app);

  // //-----Friend's List-----
  // var $friendlist = $('<div class="container" id="friendlist"><strong>The Undersea</strong></div>');
  // $friendlist.appendTo($app);
  // var i = window.users.length - 1;

  // while (i >=0) {
  //   var friend = window.users[i];

  //   var $friend = $('<div class="friends"></div>');
  //   $friend.text('@' + friend);
  //   $friend.appendTo($friendlist);
  //   i--;
  // }