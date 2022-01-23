$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');
  jQuery("time.timeago").timeago();

  // Timestamp setting
  jQuery.timeago.settings.allowFuture = true;

  // Create new HTML elements
  var $wrapper = $('<div class="wrapper"></div>');
  var $feed = $('<div id="feed"><div>');
  var $updateFeed = $('<button id="update-feed" class =" updatebutton btn-outline-primary btn-sm ">Update Feed</button>');
  var $title = $('<h1 class="row">Twiddler</h1>');
  var currentIndex = streams.home.length - 1;





  // create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }
  var handleUpdateClick = function(event) {
    var currentFeedCount = streams.home.length;
    if (event.target.innerText === "Update Feed") {
      currentIndex = Math.min( currentIndex + 3, currentFeedCount -1);
    }
    $feed.empty();
    renderFeed(currentIndex);
    $updateFeed.text("Update Feed");
    $feed.appendTo($app);
  }
  var handleUsernameClick = function(event) {
    var user = event.target.innerText;
    $feed.empty();
    renderFeed(currentIndex,user);
    $feed.appendTo($app);
    $updateFeed.text("Back");
    console.log(event.target.innerText);

  }

  // $('.update').click(function(){
	// 	var $this = $(this);
	// 	$this.toggleClass('SeeMore2');
	// 	if($this.hasClass('SeeMore2')){
	// 		$this.text('See More');
	// 	} else {
	// 		$this.text('See Less');
	// 	}
	// });


  // set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  $updateFeed.on("click", handleUpdateClick);
  // $feed.$tweet.$username.on('click', handleUsernameClick);



  // Create helper functions

  var renderFeed = function(index, user) {
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profilephoto = $('<img class="profile-photo"></img>');
      var $content = $('<div class="content"></div>');
      var $username = $('<span class="username"></span>');
      $username.on('click', handleUsernameClick);
      var $message = $('<p class="message"></p>');
      var $timestamp = $('<span class="timestamp"></span>');
      var $icon = $('<div class="icon"></div>');
      var $comment = $('<i class="comment far fa-comment-dots"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fab fa-gratipay"></i>');
      var $share = $('<i class="share fas fa-share-alt"></i>');
      var render = function() {
        $profilephoto.attr("src", tweet.profilePhotoURL);
        $username.text('@' +tweet.user);
        $message.text(tweet.message);
        $timestamp.text(jQuery.timeago(tweet.created_at));
        $comment.attr("src", "assets/icons/placeholder.png");
        $retweet.attr("src", "assets/icons/placeholder.png");
        $like.attr("src", "assets/icons/placeholder.png");
        $share.attr("src", "assets/icons/placeholder.png");

        $profilephoto.appendTo($tweet);
        $content.appendTo($tweet);
        $username.appendTo($content);
        $message.appendTo($content);
        $timestamp.appendTo($tweet);
        $comment.appendTo($icon);
        $retweet.appendTo($icon);
        $like.appendTo($icon);
        $share.appendTo($icon);
        $icon.appendTo($tweet);
        $tweet.appendTo($feed);
      }

      if (user === undefined) {
        render();
      }
      if (user === ("@" + tweet.user)) {
        render();
      }
    index -= 1;
    }
  }



  // initialize feed
  renderFeed(currentIndex);


  // append new HTML elements to the DOM
  // $title.appendTo($app);
  $wrapper.appendTo($app);
  $title.appendTo($wrapper);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);


  window.isItBeautifulYet = true;
});