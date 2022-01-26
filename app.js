 $(document).ready(function(){
				jQuery("time.timeago").timeago();
        var $app = $('#app');
        $app.html('');

// creating elements
var $title = $('<div class="header"><h1>Twiddler</h1></div>');


var $like = $('<li class="icons"></li>');
var $retweet = $('<li class="icons"></li>');
var $share = $('<li class="icons icons_"></li>');
var $comment = $('<li class="icons"></li>');


var $button = $('<button id="update-feed">Update Feed</button>');
var $feed = $('<div id="feed"></div>');

//appendItems
$title.appendTo($app);
$button.appendTo($app);
$feed.appendTo($app);
// event handlers


// create feed




//organize feed


//Renders feed
        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
					var $tweet = $('<div class="tweet"></div>');
					var $profilePhoto = $('<img class="profile__photo" src="assets/img/' + tweet.user + '.png">');
					var $message = $('<p class="tweet__message"></p>');
					var $username = $('<span class="username"></span>');
				var $timestamp = $('<span class="timestamp"></span>');
					$timestamp.text($.timeago(tweet.created_at))
					$timestamp.appendTo($tweet);
					$username.text(tweet.user);
					$username.prependTo($tweet);
          $message.text( tweet.message);
					$message.appendTo($tweet);
					$profilePhoto.prependTo($tweet);
          $tweet.appendTo($feed);
          index -= 1;
        }

      });


