$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1 class="title">Twiddler</h1>');
  $title.appendTo($app);

  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  $button.appendTo($app);
  // $button.on("click", function(event) {
  // })

  var $createFeed = $('<div id="feed"></div>');
  $createFeed.appendTo($app);

  var $feed = $('#feed');
  var index = 0;
  var lastRender = 0;
  var empty = [];

  var renderFeed = function (user, renderFrom) { // chnage source to user or home feed
    if (renderFrom !== undefined) {
      while(index < (renderFrom) + 1){ // while the index is less than the max
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>'); // image username timestamp tweet like share comment

        var $createPFP = $("<img class='profile-photo' src='" + tweet.profilePhotoURL + "'>")
        var $createUsername = $("<span class='username'>@" + tweet.user +"</div>")
        var $createMessage = $("<div class='message'>" + tweet.message + "</div>")
        var $createTimestamp= $("<div class='timestamp'>"+ $.timeago(tweet.created_at) +"</div>")
        var $createComment= $("<i class='comment fa-solid fa-comment-dots fa-2x icons'></i>")
        var $createRetweet= $("<i class='retweet fa-solid fa-retweet fa-2x icons'></i>")
        var $createLike= $("<i class='like fa-solid fa-heart fa-2x icons'></i>")
        var $createShare= $("<i class='share fa-solid fa-share-from-square fa-2x icons'></i>")

        $createPFP.appendTo($tweet);
        $createUsername.appendTo($tweet);
        $createTimestamp.appendTo($tweet);
        $createMessage.appendTo($tweet);
        $createComment.appendTo($tweet);
        $createRetweet.appendTo($tweet);
        $createLike.appendTo($tweet);
        $createShare.appendTo($tweet);

        $createComment.add($createRetweet).add($createShare).add($createLike).hover(
          function() {
            $( this ).addClass( "fa-beat" );
          }, function() {
            $( this ).removeClass( "fa-beat" );
          }
        );


        $createUsername.on("click", function(event) {
          var currentUser = event.target.innerText.substring(1);
          $feed.html('');
          index = 0
          $button.text('Back')
          renderFeed(currentUser);
        })

        // $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + index); send all of this too tweet div
        $tweet.prependTo($feed);
        index++;
      }
    } else if (user === undefined) {
      while(index < streams.home.length){ // while the index is less than the max
        lastRender = streams.home.length
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>'); // image username timestamp tweet like share comment

        var $createPFP = $("<img class='profile-photo' src='" + tweet.profilePhotoURL + "'>")
        var $createUsername = $("<span class='username'>@" + tweet.user +"</div>")
        var $createMessage = $("<div class='message'>" + tweet.message + "</div>")
        var $createTimestamp= $("<div class='timestamp'>"+ $.timeago(tweet.created_at) +"</div>")
        var $createComment= $("<i class='comment fa-solid fa-comment-dots fa-2x icons'></i>")
        var $createRetweet= $("<i class='retweet fa-solid fa-retweet fa-2x icons'></i>")
        var $createLike= $("<i class='like fa-solid fa-heart fa-2x icons'></i>")
        var $createShare= $("<i class='share fa-solid fa-share-from-square fa-2x icons'></i>")

        $createPFP.appendTo($tweet);
        $createUsername.appendTo($tweet);
        $createTimestamp.appendTo($tweet);
        $createMessage.appendTo($tweet);
        $createComment.appendTo($tweet);
        $createRetweet.appendTo($tweet);
        $createLike.appendTo($tweet);
        $createShare.appendTo($tweet);

        $createComment.add($createRetweet).add($createShare).add($createLike).hover(
          function() {
            $( this ).addClass( "fa-beat" );
          }, function() {
            $( this ).removeClass( "fa-beat" );
          }
        );

        $createUsername.on("click", function(event) {
          var currentUser = event.target.innerText.substring(1);
          $feed.html('');
          index = 0
          $button.text('Back')
          renderFeed(currentUser);
        })

        // $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + index); send all of this too tweet div
        $tweet.prependTo($feed);
        index++;
      }
    } else {
      while(index < streams.users[user].length){ // while the index is less than the max
        var tweet = streams.users[user][index];
        var $tweet = $('<div class="tweet"></div>'); // image username timestamp tweet like share comment

        var $createPFP = $("<img class='profile-photo' src='" + tweet.profilePhotoURL + "'>")
        var $createUsername = $("<span class='username'>@" + tweet.user +"</div>")
        var $createMessage = $("<div class='message'>" + tweet.message + "</div>")
        var $createTimestamp= $("<div class='timestamp'>" + $.timeago(tweet.created_at) + "</div>")
        // var $createInteracts= $("<div class='icon'></div>")
        var $createComment= $("<i class='comment fa-solid fa-comment-dots fa-2x icons'></i>")
        var $createRetweet= $("<i class='retweet fa-solid fa-retweet fa-2x icons'></i>")
        var $createLike= $("<i class='like fa-solid fa-heart fa-2x icons'></i>")
        var $createShare= $("<i class='share fa-solid fa-share-from-square fa-2x icons'></i>")

        $createPFP.appendTo($tweet);
        $createUsername.appendTo($tweet);
        $createTimestamp.appendTo($tweet);
        $createMessage.appendTo($tweet);
        // $createInteracts.appendTo($tweet);
        $createComment.appendTo($tweet);
        $createRetweet.appendTo($tweet);
        $createLike.appendTo($tweet);
        $createShare.appendTo($tweet);

        $createComment.add($createRetweet).add($createShare).add($createLike).hover(
          function() {
            $( this ).addClass( "fa-beat" );
          }, function() {
            $( this ).removeClass( "fa-beat" );
          }
        );

        $createUsername.on("click", function(event) {
          var currentUser = event.target.innerText.substring(1);
          $feed.html('');
          index = 0
          $button.text('Back')
          renderFeed(currentUser);
        })

        // $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + index); send all of this too tweet div
        $tweet.prependTo($feed);
        index++;
      }
    }
  }

  while(index < streams.home.length){
    renderFeed();
  }

  $button.on("click", function(event) {
    if (event.target.innerText === 'Update Feed') {
      renderFeed();
    } else if (event.target.innerText === 'Back') {
      $button.text('Update Feed')
      $feed.html('')
      index = 0
      renderFeed(empty[0],lastRender);
    }
  })

  window.isItBeautifulYet = true;
});