//jQuery for TWiddler
      $(document).ready(function(){
      // Select already existing elements
        var $app = $('#app');
        $app.html('');

        // Create new HTML elements\
        var $title = $('<h1><strong>Twiddler</strong></h1>');
        var $twitterlogo = $('<i class="twitterlogo fab fa-twitter"></i>')
        //elems to update all feed
        // Create an div element with and its ID is 'feed' at the end of the page
        var $updateFeed = $('<div id="feed"></div>')
        //create button obj called 'Update Feed' with ID  "update-feed"
        var $feedButton = $('<button id="update-feed" type="button">Update Feed</button>');

      //elms to add new Tweet box - extra credit
        var $newTweet = $('<div class="tweetBox"<div>');
        var $userName = $('<label for="name"><b>Username</b></label>');
        var $userNameFiled = $('<input type="username" placeholder="Enter Username" name="uname" required>');
        var $tweetMessage= $('<label for="message"><b>Enter Twiddler Message</b></label>');
        var $tweetMessageFiled = $('<input type="tweetmessage" placeholder="Enter Username" name="uname" required>');

      // Create event handler functions
      //create title click
        var handleTitleClick = function(event) {
          alert('The title of this page is: ' + event.target.innerText);
        };

      //create rendereFeed function to load all the posts
       var renderFeed = function(event, user){
          //Remove all previously existing Tweets from the Feed
        $updateFeed.html('');
        if(user !== undefined){
          $feedButton.text('Back');
        } else {
          $feedButton.text('Update Feed');
        }
          var allTweets =  streams.home;
          var index = allTweets.length - 1;
          // For each Tweet in the allTweets array (in reverse order)
          while(index >= 0){
          //  Create a new Tweet UI component
          var tweet = allTweets[index];
          var $tweet = $('<div class="tweet"></div>');
          var $profilephoto = $('<img class="profile-photo"></img>');
          var $username = $('<div class="username"></div');
          var $message = $('<p class="message"> </p>');
          var $timestamp = $('<time class="timestamp"></time>');
          var $images = $('<img class="icon"> <i class="comment fas fa-comments"></i> <i class="retweet fas fa-retweet"></i> <i class="like far fa-heart"></i> <i class="share fas fa-share"></i> </img>');
          //add appropriate data to each tweet
          $profilephoto.attr('src', 'assets/img/'+ tweet.user + '.png').appendTo($tweet);
          $username.text('@' + tweet.user).appendTo($tweet);
          $message.text(tweet.message).appendTo($tweet);
          $timestamp.text($.timeago(tweet.created_at)).appendTo($tweet);
          $images.appendTo($tweet);
          if(user) {
            if(user === '@'+ tweet.user) {
              $tweet.appendTo($updateFeed);
            }
          } else {
            $tweet.appendTo($updateFeed);
          }
            index -= 1;
        }
        $('.username').on('click', handleUsernameClick);
     };

        //create handleUsernameClick functition to filter specific users feed
        var handleUsernameClick = function(event){
          var user = event.target.innerText;
          renderFeed(event, user);
     };

       //add title to app div
       $twitterlogo.prependTo($title);
       $title.prependTo($app);
       $feedButton.appendTo($app);
       $updateFeed.appendTo($app);
       $('time.timeago').timeago();
        renderFeed();

       // Set event listeners (providing appropriate handlers as input)
        $title.on('click', handleTitleClick);
        $feedButton.on('click', renderFeed);
        $('.username').on('click',  handleUsernameClick);


        //new tweet box
        $userName.appendTo($newTweet);
        $userNameFiled.appendTo($newTweet);
        $tweetMessage.appendTo($newTweet);
        $tweetMessageFiled.appendTo($newTweet);
        $newTweet.appendTo($title);
       });
