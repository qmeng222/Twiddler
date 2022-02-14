$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  /*//////////////////////////

    Create New HTML elements

  *///////////////////////////
  // step 1
  var $title = $('<h1 class="title">not-Twitter</h1>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>')


  /*////////////////////////

      Event Handlers

  *//////////////////////////
  var renderFeed = function (user) {
    $feed.html('');
    var index = null;
    var currentStream = null;
    if(user === undefined){
      //render tweets from home.Stream
      index = streams.home.length -1;
      currentStream = streams.home
    }else if(user !== undefined){
      //render tweets from user.Stream
      index = streams.users[user].length -1;
      currentStream = streams.users[user]
    }

    while(index >= 0) {
      var tweet = currentStream[index];
      var timeago= jQuery.timeago(tweet.created_at)
      var $likeIcon = $('<i class="fa-solid fa-thumbs-up like"></i>')
      var $retweetIcon =  $('<i class="fa-solid fa-retweet retweet"></i>')
      var $commentIcon =  $('<i class="fa-regular fa-comment comment"></i>')
      var $shareIcon =  $('<i class="fa-solid fa-share-from-square share"></i>')
      var $timeStamp = $('<div class="timestamp timeago">'+timeago+'</div>')
      var $message = $('<p class="message">'+ tweet.message +'</p>')
      var $user = $('<div class="username">@'+tweet.user+'</div>')
      var $profilePhoto = $('<img class="profile-photo" src='+tweet.profilePhotoURL+'>')
      var $tweet = $('<div class="tweet"></div>');

      $user.on('click', function (event) {
        ////////////////HERE IS MY ISSUE THE PAGE DOES CHANGE BUT NOT THE CORRECT USER IS SHOWN
        var currUser = event.target.innerText.slice(1);
         renderFeed(currUser)
        $('#update-feed').text('back')
      });

      $tweet.appendTo($feed)
          //tweet info ///////////
      $profilePhoto.appendTo($tweet)
      $user.appendTo($tweet)
      $message.appendTo($tweet)
      $timeStamp.appendTo($tweet)
      //icons ////////////////
      $likeIcon.appendTo($tweet)
      $retweetIcon.appendTo($tweet)
      $commentIcon.appendTo($tweet)
      $shareIcon.appendTo($tweet);
      index -= 1;
    }
  }

  var handleTitleClick = function(event) {
    alert("The tittle of this page is: " + event.target.innerText);
    };
  /*////////////////////////

      Event Listeners

  *//////////////////////////
  $title.on("click", handleTitleClick)
  $updateFeed.on("click", function() {
    $('#update-feed').text('Update Feed')
    renderFeed()
  })

  /*////////////////////////

      Append new HTML elements to DOM

  *//////////////////////////
  renderFeed()

  $title.appendTo($app)
  $updateFeed.appendTo($app)
  $feed.appendTo($app)

});

window.isItBeautifulYet = true