 $(document).ready(function(){
				jQuery("time.timeago").timeago();
        var $app = $('#app');
        $app.html('');

// creating elements
var $title = $('<div class="header"><h1>Twiddler</h1></div>');

console.log(streams.home);



var $button = $('<button id="update-feed">Update Feed</button>');
var $feed = $('<div id="feed"></div>');

//appendItems
$title.appendTo($app);
$button.appendTo($app);
$feed.appendTo($app);


//Renders feed
var renderFeed = function (event) {
        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
var $tweet = $('<div class="tweet"></div>');
					var $profilePhoto = $('<img class="profile__photo" src="assets/img/' + tweet.user + '.png">');
					var $message = $('<p class="tweet__message"></p>');
					var $username = $('<span class="username"></span>');
				var $timestamp = $('<span class="timestamp"></span>');
var $like = $('<img class="icons like" src="assets/img/like.gif">');
var $retweet = $('<img class="icons retweet" src="assets/img/retweet-24.png">');
var $share = $('<img class="icons share" src="assets/img/share-3-24.png">');
var $comment = $('<img class="icons comment" src="assets/img/comments.gif">');
					$username.text(tweet.user).prependTo($tweet);
          $message.text( tweet.message).appendTo($tweet);
					$profilePhoto.prependTo($tweet);
						$timestamp.text($.timeago(tweet.created_at))
					$timestamp.appendTo($tweet);
$like.appendTo($tweet);
$comment.appendTo($tweet)
$share.appendTo($tweet)
$retweet.appendTo($tweet);
  $tweet.appendTo($feed);
          index -= 1;
        }        }

//event handlers

$button.on('click', renderFeed);

      });


