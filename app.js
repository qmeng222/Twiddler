 $(document).ready(function(){
				jQuery("time.timeago").timeago();
        var $app = $('#app');
        $app.html('');

// creating elements
var $title = $('<div class="header"><h1>Twiddler</h1></div>');
var $button = $('<button id="update-feed">Update Feed</button>');
var $feed = $('<div id="feed"></div>');

//appendItems
$title.appendTo($app);
$button.appendTo($app);
$feed.appendTo($app);


//Renders feed
var renderFeed = function (userName) {
        $feed.empty();
// if there is a user - only show that users tweets from the streams.home
// else show all tweets

        if (userName) {
      // array of tweets to render = username tweets only
        var arrayofTweets = streams.users[userName];
        } else {
      //array of tweets to render is all tweets streams.home
      var arrayofTweets = streams.home;
        }


 for (var i = arrayofTweets.length - 1; i >=0; i--) {

// tweet will equal array of tweets [index];
          var tweet = arrayofTweets[i];
          var $tweet = $('<div class="tweet"></div>');
					var $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
					var $message = $('<p class="message"></p>');
					var $username = $('<span class="username"></span>');
				  var $timestamp = $('<span class="timestamp"></span>');
          var $like = $('<i class=" like far fa-thumbs-up"></i>');
          var $retweet = $('<i class="retweet fas fa-retweet"></i>');
          var $share = $('<i class="share far fa-share-square"></i>');
          var $comment = $('<i class="comment far fa-comment"></i>');
					$profilePhoto.prependTo($tweet);
          $username.text('@' + tweet.user).prependTo($tweet);
					$timestamp.text($.timeago(tweet.created_at))
					$timestamp.appendTo($tweet);
          $message.text( tweet.message).appendTo($tweet);
$like.appendTo($tweet);
$comment.appendTo($tweet)
$share.appendTo($tweet)
$retweet.appendTo($tweet);
$tweet.appendTo($feed);

var userNameClick = function () {
var userName = $(this).text().slice(1);
console.log(userName);
$feed.empty();
$button.text('Back');
renderFeed(userName)


}

$username.on('click', userNameClick);

}

     }

renderFeed();

//event handlers

var updateButton = function () {
renderFeed();
$button.text('Update Feed');
}

$button.on("click", updateButton);
});


