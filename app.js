$(document).ready(function(){
  jQuery("time.timeago").timeago();
  // var tweetArray =[];
  var data = [];
  // var userArray =[];
  var $app = $('#app');
  $app.html('');
  //////// helper function /////////
///check against data if message by user exist, return boolean
  var exist = function(str,key,array){
    for (let i = 0 ; i < array.length ; i++){
      if(array[i][key] === str){
        return true;
      }
    }
    return false;
  };
// add input obj to feed, return html
  var addToFeed = function(obj){
    var $tweet = $('<div class="tweet"></div>');
    var $userName = $(`<div class="username">@${obj.user}</div>`)
    var $message = $(`<div class="message">${obj.message}</div>`)
    var $profilePhoto = $(`<img src= "" class="profile-photo"/>`);
    var $timeStamp = $(`<div class="timestamp">${jQuery.timeago(obj.time)}</div>`);
    var $comment = $('<i class="fas fa-comment comment"></i>').hover(function(){
      $(this).css('transform', 'scale(1.5)')
      $(this).css('color', 'red')
    }, function(){
      $(this).css('transform', '')
      $(this).css('color', '')
    });
    var $retweet = $('<i class="fas fa-retweet retweet"></i>').hover(function(){
      $(this).css('transform', 'scale(1.5)')
      $(this).css('color', 'red')
    }, function(){
      $(this).css('transform', '')
      $(this).css('color', '')
    });
    var $like = $('<i class="fas fa-like like"></i>').hover(function(){
      $(this).css('transform', 'scale(1.5)')
      $(this).css('color', 'red')
    }, function(){
      $(this).css('transform', '')
      $(this).css('color', '')
    });
    var $share = $('<i class="fas fa-share share"></i>').hover(function(){
      $(this).css('transform', 'scale(1.5)')
      $(this).css('color', 'red')
    }, function(){
      $(this).css('transform', '')
      $(this).css('color', '')
    });
    $userName.appendTo($tweet);
    $message.appendTo($tweet);
    $profilePhoto.appendTo($tweet);
    $timeStamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    $userName.on("click", function(event) {
      $feed.empty()
      var filterUser = data.filter(obj => obj.user === event.target.innerText.slice(1) )
      for (let i = 0 ; i < filterUser.length; i++){
        var userData = addToFeed(filterUser[i]);
        $('#feed').prepend( userData );
      }
    });
    return $tweet
  }
////////////

  var $button = $('<button id="update-feed">back</button>');
  $button.appendTo($app);

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);


  var loadTweet = function (){
    var index = 0;
    while(index < streams.home.length){
      var tweet = streams.home[index];

      if(!exist('@' + tweet.user + ': ' + tweet.message,'display',data)){
        var tweetData = {
          user: tweet.user,
          message: tweet.message,
          time: tweet.created_at,
          display: '@' + tweet.user + ': ' + tweet.message
        };
        data.push(tweetData);
        // var $tweet = addToFeed(tweetData);
        //   $('#feed').prepend( $tweet );
      }
      index ++;
    }
    for (let i = 0 ; i < data.length ; i++){
      var tweet = data[i];
      var $tweet = addToFeed(tweet);
      $('#feed').prepend( $tweet );
    }
  };

  $('#update-feed').on("click", function(event) {
    $feed.empty()
    loadTweet();
  });




  var $title = $('<h1>Twiddler</h1>');

  $title.appendTo($app);

loadTweet();
});
window.isItBeautifulYet = true


