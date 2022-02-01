$(document).ready(function(){
  var $app = $('#app');
  var $row = $('<div class="row"></div>')
  var $leftCol = $('<div class="left-col"></div>')
  var $rightCol = $('<div class="right-col"></div>')
  var $title = $('<h1 class="title">Game <small>of</small> Twiddlers</h1>');
  var $updateBtn = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $wolfPack = $('<div class="wolf-pack"><h3>Wolf Pack</h3><ul id="friends-list"></ul></div>');

  $title.appendTo($app);
  $row.appendTo($app);
  $leftCol.appendTo($row);
  $rightCol.appendTo($row);
  $updateBtn.appendTo($leftCol);
  $feed.appendTo($rightCol);
  $wolfPack.appendTo($leftCol);

  var update = $('#update-feed');
  var feed = $('#feed');
  var holder = $('#holder');
  var printedAlready = [];
  var back = false

  $(window).load(function(){
    for( var user in streams.users ){
      $('<li class="friend"><img class="wp-avatar" src="' + streams.users[user][0].profilePhotoURL + '" alt="User Avatar" ></li>').appendTo($('#friends-list'));
    }
    renderTweets([])
  })

  update.on('click', function() {
    if (update.text() === 'Back') {
      update.text('Update Feed')
      feed.empty()
      back = true;
      renderTweets([])
    } else if (update.text() === 'Update Feed'){
      scheduleNextTweet()
      renderTweets([])
    }
  })

  $(document).on('click', '.username',function(e) {
    var userTweets = [];
    var copy = e.currentTarget.innerText;
    $('.tweet > .info > .username').filter(function(){
      return $(this).text() !== copy;
    }).parent().parent().remove();
    update.text('Back');
  })

  function removeDuplicateTweets(arr){
    var copy = arr.slice().map(function(item) { return item.message; });
    var res = arr.filter(function(item) {
      return copy.includes(item.message);
    })
    return res;
  }

  function checkIfAlreadyPrinted(filtered) {
    var copy = printedAlready.slice().map(function(item) { return item.message; });
    var res = filtered.filter(function(item) {
      return !copy.includes(item.message);
    })

    return res;
  }

  function renderTweets(userTweets){
    var index = 0;
    var filtered = removeDuplicateTweets(streams.home);

    if (printedAlready.length > 1) {
      filtered = checkIfAlreadyPrinted(filtered);
    }
    filtered.sort(function(a,b) {return a.created_at - b.created_at; });

    if (userTweets.length > 1) {
      filtered = userTweets;
    }

    if (back === true) {
      filtered = removeDuplicateTweets(streams.home);
    }

    while(index < filtered.length) {
      var tweet = filtered[index];
      if (!back) {
        printedAlready.push(filtered[index]);
      }
      var $tweet = $('<div class="tweet"></div>');
      var $info = $('<div class="info"></div>');
      var $icons = $('<div class="icons"></div>');
      $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '" alt="profile photo" >').appendTo($tweet);
      $info.appendTo($tweet);

      $('<div class="username">@'+ tweet.user + '</div>').appendTo($info);
      $('<p class="message">' + tweet.message + '</p>').appendTo($info);
      $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>').appendTo($info);
      $icons.appendTo($info);
      $('<i class="fas fa-comment comment"></i>').appendTo($icons);
      $('<i class="fas fa-retweet retweet"></i>').appendTo($icons);
      $('<i class="fas fa-thumbs-up like"></i>').appendTo($icons);
      $('<i class="fas fa-share share"></i>').appendTo($icons);


      $tweet.prependTo($feed);
      index++;
    }
    back = false;
  }
  window.isItBeautifulYet = true;
});