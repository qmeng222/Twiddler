$(document).ready(function(){
        // Select the div with the ID #app
        //var $app = $('#app');
        var $feed = $("#feed");
      /*
        $app.html('');
        // Create an h1 element with the text "Twiddler"
        var $title = $('<h1>Twiddler</h1>');

        // Append the h1 element to the DOM, nested inside of the #app div
        $title.appendTo($app);

        // Set a click event listener on the h1 element
        $title.on("click", function(event) {
          console.log(event);
          alert('the title of this page is ' + event.target.innerText)
        });

        // Update Feed Button
        var $update = $("<button type='button' id='updated-feed'>Update Feed</button>");
        $update.appendTo($app)
        $update.click(function() {
          $tweet.text('@' + tweet.user + ': ' + tweet.message);
        });
      */

        $("#heading").on("click", function() {
          console.log(event);
          alert("the title of this page is " + event.target.innerText)
        });

        var index = streams.home.length - 1;
        //console.log(streams.home)
        while(index >= 0){

          var tweet = streams.home[index];
          //console.log(tweet)
          var $tweet = $('<div class="tweet"></div>');
          var $message=$('<div class="message"></div>');
          $tweet.text('@' + tweet.user + ': ' );
          $message.text(tweet.message);
          $tweet.append($message);
          $tweet.appendTo($feed);
          index -= 1;
        }


        $("#update-feed").on("click", function() {
          //console.log(streams.home)
          $feed.empty()

          var index = streams.home.length - 1;
        //console.log(streams)
        while(index >= 0){

          var tweet = streams.home[index];
          //console.log(tweet)
          // feature short-hand names
          var $tweet = $('<div class="tweet"></div>');
          var $message=$('<div class="message"></div>');
          var $username = $('<div class="username"></div>');
          var $img = $('<img class="profile-photo">');
          var $timeStamp = $('<div class="timestamp"></div>');
          var $comment = $('<div class="comment"></div>');
          var $retweet = $('<div class="retweet"></div>');
          var $like = $('<div class="like"></div>');
          var $share = $('<div class="share"></div>');
          $message.append(tweet.message);
          $tweet.append($message);
          $tweet.append($username);
          $tweet.appendTo($feed);
          // adding username to username div
          $username.append("@" + tweet.user);
          // adding image to tweet
          $tweet.append($img);
          // adding time stamp data to timestamp
          console.log(tweet.created_at)
          $timeStamp.append(tweet.created_at);
          // adding timestamp to tweet
          $tweet.append($timeStamp);

          index -= 1;

        }

        });
      });




