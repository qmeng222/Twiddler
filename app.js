

$(document).ready(function(){
  //This is where the structure is made
  var $app = $('#app');
  $app.html('');

  var $head = $("<div id ='head'></div>")
  $head.appendTo($app);

  var $feed = $("<div id ='feed'></div>");

  var $column1 = $("<div id = 'col1'></div>")
  var $column2 = $("<div id = 'col2'></div>")

  $column2.append($feed);
  $app.append($column1, $column2);

  //Elements of the page--------------------------------------------

  //TITLE
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($head);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  //UPDATE FEED BUTTON
  var $updateFeed = $("<button id = 'update-feed' width='100' height='50'> Update Feed</button>");
  $updateFeed.appendTo($column1);

  //looping from the last tween to the first tweet
  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });

  function generate_handler(user) {
    return function(event) {
      $clearFeed();
      $renderFeed(user);
      $updateFeed.text('Back');
    };
  }
  var $renderFeed = function(user){
    if(user === undefined){
      var tweetstream = streams.home;
    }else{
      var tweetstream = streams.users[user];
      console.log(tweetstream);
    }
    var index = tweetstream.length - 1;
    while(index >= 0){
      var tweet = tweetstream[index];
      var $tweet = $('<div class="tweet"></div>');
      //$tweet.text('@' + tweet.user + ': ' + tweet.message +'\n '+tweet.created_at);
      var $c1 = $("<div id = 'c1'></div>")
      var $c2 = $("<div id = 'c2'></div>")
      //profil picture
      var $profile = $('<img class = "profile-photo" alt="Profile Picture" width="100" height="100"></img>');
      $profile.attr("src", tweet.profilePhotoURL);
      //username
      var $username = $('<div class = "username"></div>');
      $username.text('@'+ tweet.user);

      $username.on('click', generate_handler(tweet.user));
      //Message
      var $message = $("<div class = 'message'></div>");
      $message.text(tweet.message);

      //Timestamp
      var $timestamp = $("<div class ='timestamp'></div>");
      var timeAgo = jQuery.timeago(new Date(tweet.created_at));
      $timestamp.text(timeAgo);


      //ICONS
      $icons = $('<div class="icons"></div>');

      var $comment = $('<i class="comment fas fa-comment"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-heart"></i>');
      var $share = $('<i class="share fas fa-share"></i>');

      //Append to $icons

     $comment.appendTo($icons);
     $retweet.appendTo($icons);
     $like.appendTo($icons);
     $share.appendTo($icons);



      $profile.appendTo($c1);
      $username.appendTo($c1);
      $message.appendTo($c2);
      $timestamp.appendTo($c2);
      $icons.appendTo($c2);
      $c1.appendTo($tweet);
      $c2.appendTo($tweet);

      $tweet.appendTo($feed);
      index -= 1;
    }
  }
  var $clearFeed = function(){
    for(let i = 0; i<streams.home.length ;i++){
      var tweet = streams.home[i];
      var someText = '@' + tweet.user + ': ' + tweet.message;
      $('div').remove('.tweet');
    }
  }
  $renderFeed();
  $updateFeed.on("click", function(event) {
    $updateFeed.text('Update Feed');
    //Loop to remove tweets on display
    $clearFeed();

    //loop that ads new tweets and old tweets onto display
    $renderFeed();
  });
  window.isItBeautifulYet = true;
});

