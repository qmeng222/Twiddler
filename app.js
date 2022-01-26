
$(document).ready(function(){

        // Select the div with the ID #app
        //var $app = $('#app');
        var $feed = $("#feed");

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
          var $username = $('<div class="username"></div>');
          var $img = $('<img class="profile-photo">');
          var $timeStamp = $('<div class="timestamp"></div>');
          var $comment = $('<i class="fas fa-comments comment"></i>');
          var $retweet = $('<i class="fas fa-retweet retweet"></i>');
          var $like = $('<i class="fas fa-thumbs-up like"></i>');
          var $share = $('<i class="fas fa-share-square share"></i>');
          //////////////////////////



          $username.text('@' + tweet.user + ': ' );
          $message.text(tweet.message);
          $tweet.append($message);
          $tweet.append($username);
          $tweet.append($img);
          $timeStamp.append(jQuery.timeago(tweet.created_at));
          $tweet.append($timeStamp);
          $tweet.append($comment);
          $tweet.append($retweet);
          $tweet.append($like);
          $tweet.append($share);


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
          var $comment = $('<i class="fas fa-comments comment"></i>');
          var $retweet = $('<i class="fas fa-retweet retweet"></i>');
          var $like = $('<i class="fas fa-thumbs-up like"></i>');
          var $share = $('<i class="fas fa-share-square share"></i>');
          //////////////////////////////////

          $username.text('@' + tweet.user + ': ' );
          $message.text(tweet.message);
          $tweet.append($message);
          $tweet.append($username);
          $tweet.append($img);
          $timeStamp.append(jQuery.timeago(tweet.created_at));
          $tweet.append($timeStamp);
          $tweet.append($comment);
          $tweet.append($retweet);
          $tweet.append($like);
          $tweet.append($share);


          $tweet.appendTo($feed);
          index -= 1;

        }

      });


      // on user click
      $("#feed").on("click", "div .username", function(event) {
        // filter tweets to show only the users'
        var user = ($(this).text())
        //$(".username").not(this).hide();



        const username =user.substring(1, user.length - 2)
        console.log(username)
        console.log(user, streams.users[username])

        $feed.empty();
        var index = streams.users[username].length - 1;
        //console.log(streams)
        while(index >= 0){

          var tweet = streams.users[username][index];
          //console.log(tweet)
          // feature short-hand names
          var $tweet = $('<div class="tweet"></div>');
          var $message=$('<div class="message"></div>');
          var $username = $('<div class="username"></div>');
          var $img = $('<img class="profile-photo">');
          var $timeStamp = $('<div class="timestamp"></div>');
          var $comment = $('<i class="fas fa-comments comment"></i>');
          var $retweet = $('<i class="fas fa-retweet retweet"></i>');
          var $like = $('<i class="fas fa-thumbs-up like"></i>');
          var $share = $('<i class="fas fa-share-square share"></i>');
          //////////////////////////////////

          $username.text('@' + tweet.user + ': ' );
          $message.text(tweet.message);
          $tweet.append($message);
          $tweet.append($username);
          $tweet.append($img);
          $timeStamp.append(jQuery.timeago(tweet.created_at));
          $tweet.append($timeStamp);
          $tweet.append($comment);
          $tweet.append($retweet);
          $tweet.append($like);
          $tweet.append($share);


          $tweet.appendTo($feed);
          index -= 1;

        }





        // change button to ready "Back"
        $("#update-feed").text("Back");

        $("#update-feed").on("click", function() {
          $("#update-feed").text("Update Feed");
        })


      })




    });




