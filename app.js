$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1 class="title">Twiddler</h1>');
  $title.appendTo($app);

  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  $button.on('click', function(event) {
    renderFeed();
  });
  $button.appendTo($app);

  var $createFeed = $('<div id="feed"></div>');
  $createFeed.appendTo($app);

  var $feed = $('#feed');

  var renderFeed = function () { // chnage source to user or home feed
    var $feed = $('#feed');
    $feed.html("");

    var index = streams.home.length - 1
    while(index >= 0) { // while the index is less than the max
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>'); // image username timestamp tweet like share comment

      var $createPFP = $("<img class='profile-photo'>")
      $createPFP.attr('src', tweet.profilePhotoURL);
      var $createUsername = $("<span class='username'>@" + tweet.user +"</div>")
      var $createMessage = $("<div class='message'>" + tweet.message + "</div>")
      var $createTimestamp= $("<div class='timestamp'>"+ $.timeago(tweet.created_at) +"</div>")
      var $createComment= $("<i class='comment fa-solid fa-comment-dots fa-2x icons'></i>")
      var $createRetweet= $("<i class='retweet fa-solid fa-retweet fa-2x icons'></i>")
      var $createLike= $("<i class='like fa-solid fa-heart fa-2x icons'></i>")
      var $createShare= $("<i class='share fa-solid fa-share-from-square fa-2x icons'></i>")

      $tweet.append($createPFP, $createUsername, $createTimestamp, $createMessage, $createComment, $createRetweet, $createLike, $createShare);

      $createComment.add($createRetweet).add($createShare).add($createLike).hover(
        function() {
          $( this ).addClass( "fa-beat" );
        }, function() {
          $( this ).removeClass( "fa-beat" );
        }
      );

      $($createUsername).on("click", function(event) {
        var currentUser = event.target.innerText.substring(1);
        $button.text('Back')
        renderUserFeed(currentUser);
      })

      // $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + index); send all of this too tweet div
      $tweet.appendTo($feed);
      index--;
    }
  };

  renderFeed();

  var renderUserFeed = function (user) {
    var $feed = $('#feed');
    $feed.html("");

    var index = streams.users[user].length - 1
    while(index >= 0){ // while the index is less than the max
      var tweet = streams.users[user][index];
      var $tweet = $('<div class="tweet"></div>'); // image username timestamp tweet like share comment

      var $createPFP = $("<img class='profile-photo'>")
      $createPFP.attr('src', tweet.profilePhotoURL);
      var $createUsername = $("<span class='username'>@" + tweet.user +"</div>")
      var $createMessage = $("<div class='message'>" + tweet.message + "</div>")
      var $createTimestamp= $("<div class='timestamp'>"+ $.timeago(tweet.created_at) +"</div>")
      var $createComment= $("<i class='comment fa-solid fa-comment-dots fa-2x icons'></i>")
      var $createRetweet= $("<i class='retweet fa-solid fa-retweet fa-2x icons'></i>")
      var $createLike= $("<i class='like fa-solid fa-heart fa-2x icons'></i>")
      var $createShare= $("<i class='share fa-solid fa-share-from-square fa-2x icons'></i>")

      $tweet.append($createPFP, $createUsername, $createTimestamp, $createMessage, $createComment, $createRetweet, $createLike, $createShare);

      $createComment.add($createRetweet).add($createShare).add($createLike).hover(
        function() {
          $( this ).addClass( "fa-beat" );
        }, function() {
          $( this ).removeClass( "fa-beat" );
        }
      );



      // $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + index); send all of this too tweet div
      $tweet.appendTo($feed);
      index--;
    }
  }


  $button.on("click", function(event) {
    if (event.target.innerText === 'Update Feed') {
      renderFeed();
    } else if (event.target.innerText === 'Back') {
      $button.text('Update Feed');
      renderFeed();
    }
  })

  $('.username').on("click", function(event) {
    var currentUser = event.target.innerText.substring(1);
    // $button.text('Back')
    renderUserFeed(currentUser);
  })

  window.isItBeautifulYet = true;
});