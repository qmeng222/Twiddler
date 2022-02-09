      $(document).ready(function(){
        //Select already existing elements
        var $app = $('#app');
        $app.html('');

        // Create new HTML elements
        var $title = $('<h1 class="title primary-header">Twiddler</h1>');
        var $button = $('<button id="update-feed">Update Feed</button>');
        var $feed = $('<main id="feed"></main>')

        //create event handler functions

        var renderTweet = function(tweet) {
          var $tweet = $('<div class="tweet"></div>');
          $tweet.append('<img class="profile-photo" src="assets/img/' + tweet.user + '.png" alt="User Profile Picture"/>');
          $tweet.append('<div class="username">' + '@' + tweet.user + '</div>')
          $tweet.append('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
          $tweet.append('<p class="message">' + tweet.message + '</p>');
          $tweet.append('<i class="icon comment fa-solid fa-comment"></i>');
          $tweet.append('<i class="icon retweet fa-solid fa-retweet"></i>');
          $tweet.append('<i class="icon like fa-solid fa-thumbs-up"></i>');
          $tweet.append('<i class="icon share fa-solid fa-share-nodes"></i>');
          $feed.append('');
          $tweet.appendTo($feed);
        };

        var renderFeed = function(target) {
          $feed.html('');
          if (target !== undefined) {
            $button.text('Back');
            var stream = streams.users[target];
            var index = stream.length - 1;
            while(index >= 0) {
              var tweet = stream[index];
              renderTweet(tweet);
              index -= 1;
            }
          } else {
            var index = streams.home.length - 1;
            while(index >= 0){
              var tweet = streams.home[index];
              renderTweet(tweet);
              index -= 1;
            }
          }
        };

        // Set event listeners
        $( "div" ).on("click", ".username", function(event) {
          var text = (event.target.innerText).slice(1);
          renderFeed(text);
        });

        $button.on("click", function() {
          $button.text('Update Feed');
          index = streams.home.length - 1;
          renderFeed()
        });

        //append new HTML elemets to the DOM
        $title.appendTo($app);
        $button.appendTo($app);
        $feed.appendTo($app);
        renderFeed();
        window.isItBeautifulYet = true;
      });