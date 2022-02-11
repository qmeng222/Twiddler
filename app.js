

 $(document).ready(function() {
   var $app = $('#app');

   //create new HTML elements
   var $title = $('<h1 id="title">Twiddler</h1>');
   var $feedtitle = $('<h4 id="title">Feeds</h1>');
   var $feed = $('<div id="feed"></div>');

   $('time.timeago').timeago();

    // Create event handler functions
   $updateFeed.on('click', function(event) {
     $feed.empty();
     $renderFeed();
     $updateFeed.text('Update');
   });


   var nameClickHandler = function(user) {
     return function(event) {
       $feed.empty();
       $renderFeed(user);
       $updateFeed.text('Go back');
     };
   };



   //append new HTML elements
   $title.appendTo($app);
   $feed.appendTo($app);
   $updateFeed.appendTo($app);

   // Set event listeners (providing appropriate handlers as input)
   var $renderFeed = function(user) {
     var userFeed = streams.home;
     if (user) {
       userFeed = streams.users[user];
     }

     var index = userFeed.length - 1;
     while (index >= 0) {
       var tweet = userFeed[index];
       var $tweet = $('<div class="tweet"></div>');
       $tweet.appendTo($feed);

       var $profilePhoto = $('<img class ="profile-photo"></img>');
       $profilePhoto.attr('src', tweet.profilePhotoURL);
       $profilePhoto.appendTo($tweet);

       var $username = $('<div class = "username"></div>');
       $username.text( '@' + tweet.user);
       $username.on('click', nameClickHandler(tweet.user));

       $username.appendTo($tweet);

       var $message = $('<div class = "message"></div>');
       $message.text(tweet.message);
       $message.appendTo($tweet);

       var $comment = $('<i class="comment fa-solid fa-comment"></i>');
       $comment.appendTo($tweet);

       var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
       $retweet.appendTo($tweet);

       var $like = $('<i class="fas fa-thumbs-up icon like"></i>');
       $like.appendTo($tweet);

       var $share = $('<i class = "fas fa-share icon share"></i>');
       $share.appendTo($tweet);

       var $timestamp = $('<div class = "timestamp timeago"></div>');
       $timestamp.text($.timeago(tweet.created_at));
       $timestamp.appendTo($tweet);


       //$tweet.text('@' + tweet.user + ': ' + tweet.message);

       index -= 1;
     }
   };

   window.isItBeautifulYet = true;
 });

