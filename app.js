$(document).ready(function(){
  var $app = $('#app');
  $app.html('');



  //create title element
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  //create button element
  $app.append('<button id="update-feed">Update Feed</button>');
  var $updateFeed = $('#update-feed');


  //create feed element
  $app.append('<div id="feed"></div>');
  var $feed = $('#feed')
  renderfeed($feed, streams.home);

  //update feed event
  $updateFeed.on("click", function(event) {
    document.querySelector('button').innerText = "Update Feed";
    console.log(event);
    console.log(streams.home[0].created_at);
    //empty feed
    $($feed).empty();
    //event
    renderfeed($feed, streams.home);

  });



  // event for update button
  // renderfeed
  function renderfeed($feed, array){
    var index = array.length - 1;
    while(index >= 0){
      var tweet = array[index];
      var $tweet = $('<div class="tweet"></div>');

      //username
      var $username = $('<span class="username"></span>');
      $username.text('@'+ tweet.user);
      //username click event
      $username.on("click", function(event){
        document.querySelector('#update-feed').innerText = "Back";
        $($feed).empty();
        //recall renderfeed with the array of selected user
        var user = event.target.innerText.slice(1);
        var userarray = streams.users[user];
        renderfeed($feed , userarray);

      });

      //profile-photo
      var $profile = $('<img class="profile-photo" src='+ tweet.profilePhotoURL + '></br>');

      //userfeed
      var $message = $('<p class="message">' + tweet.message + '</p>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);

      //timestamp
      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));

      //icons
      var $comment = $('<i class="icon comment fas fa-comments"></i>');
      var $like = $('<i class="icon like fas fa-thumbs-up"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $share = $('<i class="icon share fas fa-share"></i>');


      $profile.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $like.appendTo($tweet);
      $retweet.appendTo($tweet);
      $share.appendTo($tweet);




      $tweet.appendTo($feed);
      index -= 1;
    }

  }

});

window.isItBeautifulYet = true;