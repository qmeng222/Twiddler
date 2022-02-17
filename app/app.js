



var loadTweets = function(data, $) {
  var classes = [ 'emptyImg', 'emptyMessage', 'emptyTime']
  var keys = ['profilePhotoUR', 'message', 'created_at']
  var addedHeight = 0;
  $('div.tweet').each(function(ind) {
    console.log(this)
    var $tweet = $(this);
    $tweet.addClass(' loaded');
    var $childern = $($tweet.children());
    $childern.each(function(c) {
      var $child = $(this);
      var key = keys[c];
      var val;
      if(key === 'created_at') {
        val = $.timeago(new Date(data[ind][key]))
        $child.text(val);
        $child.toggleClass(classes[c]);
      } else if(key === 'profilePhotoUR') {
        var imgVal = data[ind]['profilePhotoURL']  ? data[ind]['profilePhotoURL'] : './assets/img/visitor.png';
        var userName = data[ind]['user']
        var $headerChild = $($child.children());
        var $hChild0 = $($headerChild[0]);
        var $hChild1 = $($headerChild[1]);
        $hChild0.attr('src', imgVal);
        $hChild1.text('@' + userName);
        $hChild0.toggleClass('emptyImg');
        $hChild1.toggleClass('emptyHead');
      } else {
        val = data[ind][key];
        $child.text(val);
        $child.toggleClass(classes[c]);
      }

    })
  })
}







var updateWithNewTweets = function($, streams, $feed) {
  var numToGrab = streams.addedToUpdate;
  var addedTweets = streams.home.slice(0, numToGrab).reverse();
  addedTweets.forEach(function(tweet) {
    var $tweet = createTweet($, tweet);
    $tweet.prependTo($('#feed'));
  })
  $('#update-feed').css('visibility', 'hidden')
}




var userInit = async function($, streams) {
  var tweets = await getUserTweets($);
  streams.home = tweets;
  loadTweets(tweets, $);
}






$(document).ready(function(){
  window.streams = {};
  streams.home = [];
  streams.addedToUpdate = 0;
  var $feed = $('#feed');
  $feed.delegate( ".username", "click", function() {
    var user = $( this ).text();
  });

  $('#update-feed').on('click', function() {
    updateWithNewTweets($, streams, $feed);
  });

  if(!streams.home.length) {
    createEmptyTweets($, $feed);
    userInit($, streams);
  } else {
    loadTweets(streams.home, $)
  }

  setInterval(function() {
    checkForNewTweets($, streams);
  }, 5000);
});


