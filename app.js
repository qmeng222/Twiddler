//jQuery for TWiddler
      $(document).ready(function(){
      // Select already existing elements
        var $app = $('#app');
        $app.html('');
        $('time.timeago').timeago();

        // Create new HTML elements
        var $title = $('<h1><strong>Twiddler 2.0</strong></h1>').prependTo($app);
        var $twitterlogo = $('<i class="twitterlogo fab fa-twitter"></i>').prependTo($title);
        //elems to update all feed
        var $updateFeed = $('<div id="feed"></div>').appendTo($app);
        var $feedButton = $('<button id="update-feed" type="button">Update Feed</button>').prependTo($app);

        // //create sidebar
        // var $sidebar = $('<div id="sidebar"></div>').appendTo($app);
        // var $sidebaroptions = $('<div class="sidebaroptions"></div').appendTo($sidebar);
        // var $homeButton = $('<i class="home fas fa-home"></i>').appendTo($sidebaroptions);
        // //elms for friendsList - extra credit
        // var $friendslist = $('<div class="friendslist"> <i class="friends fas fa-user-friends"></i></div>').appendTo($sidebaroptions);
        // var $listsOffriends = $('<ul id ="friends-list">  <li class="friend">shawndrost</li>  <li class="friend">sharksforcheap</li> <li class="friend">mracus</li> <li class="friend">douglascalhoun </li> </ul>').appendTo($friendslist);
        // //  $friendslist.prependTo($app);

      // //elms to add new Tweet box - extra credit
      //   var $newTweet = $('<form id="new-tweet-form"></form>');
      //   var $userName = $('<label for="username"><b>Username</b></label>').appendTo($newTweet);
      //   var $userNameFiled = $('<input type="username" name="username">').appendTo($newTweet);
      //   var $tweetMessage= $('<label for="message"><b>What\'s happening? </b></label>').appendTo($newTweet);
      //   var $tweetMessageFiled = $('<input type="tweetmessage" name="message">').appendTo($newTweet);
      //   var $tweetIcons = $('<img class="tweeticon"> <i class="media fab fa-medium"></i> <i class="GIF fas fa-images"></i> <i class="emoji fas fa-smile-beam"></i> <i class="schedule fas fa-calendar-alt"></i> </img>').appendTo($newTweet);
      //   var $submitButton = $('<button id="submit" type="button">Submit</button>').appendTo($newTweet);
      //   $newTweet.appendTo($title);

      // Create event handler functions

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
        // $('.friend').on('click',  handleFriendslistClick);
     };

      //create handleUsernameClick function to filter specific users feed
      var handleUsernameClick = function(event){
        var user = event.target.innerText;
        // var user = event.target.innerText.slice(1);
        renderFeed(event, user);
    };

      // //create handleFriendslistClick function
      // var handleFriendslistClick= function(event){
      //   var user = '@' + event.target.innerText;
      //   renderFeed(event, user)
      // };

      //create handleSubmitnewTweet function
      var TwriteATweet = function(event){
        window.visitor  = $("input[name*='username']").val();
        var newMessage = $("input[name*='message']").val();
        //add newUsername to users obj
        window.users.push(window.visitor);
        //add new username to friendslist
        $('#friends-list').append('<li class="friend">'+ window.visitor + '</li>')
        //adds tweet data to the user's stream array-- streams.user
        //adds tweet data to the home stream array -- streams.home
        writeTweet(newMessage);
        //renders the new tweet immediatly
        var user = '@'+ window.visitor;
        renderFeed(event, user);
      }

      //crete backtoTop function
      var backtoTop = function(event){
          window.scrollTo(0, 0);
      };


      renderFeed();

       // Set event listeners (providing appropriate handlers as input)
        $feedButton.on('click', renderFeed);
        $('.username').on('click',  handleUsernameClick);
        // $('.friend').on('click',  handleFriendslistClick);
        // $('#submit').on('click', TwriteATweet);
        // $('.home').on('click', backtoTop)

        window.isItBeautifulYet = true

       });
