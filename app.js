$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Header Title Back to Top Button

  var $header = $('<div class = "header"></div>');
    //Title
    var $title = $('<h1 id = "title"><a href ="index.html">Twiddler<br>2.0<br></a></h1>');
    //Back to Top Button
    var $topbutton = $('<h3 class = topButton><input class = "button" type = "submit" value = "Back To Top"></input></h3>')

      $header.appendTo($app)
  $title.appendTo($header)
  $topbutton.appendTo($header)

  // mainFeed, tweets will be appendTo this
  var $mainFeed = $('<div class = "main-feed"></div>')
  $mainFeed.appendTo($app)

  var index = streams.home.length -1;
  var currentIndex = streams.home.length;
  var newIndex = currentIndex;

  //load initial tweets
  function loadTweets (start, end, firstTime) {
      while(start >= end) {
        if (firstTime) {
          var tweet = streams.home[start]
          buildTweet(tweet).appendTo($mainFeed)
          start -= 1
        } else {
          start = streams.home.length;
          while (start > end) {
            var tweet = streams.home[end + 1]
            buildTweet(tweet).prependTo($mainFeed)
            start -= 1
            end += 1
          }
        }
      }
  }
  loadTweets(index, 0, true)


  function checkTweets(){
    // streams.home.length is constantly updating,
    // set newIndex to new value and compare to currentIndex
    newIndex = streams.home.length
    // if newIndex sees there are more tweets, run loadNewTweets
    if (newIndex > currentIndex) {
      loadTweets(newIndex, currentIndex, false)
    }
    // set interval so that page is constantly checking for more tweets
    setTimeout(function() {
      checkTweets();
    }, 10000)
  }
  checkTweets()

  // function showMoreTweets() {
  //   //similar to above, but different starting index
  //   newIndex = streams.home.length;
  //   while (newIndex > currentIndex) {
  //     var tweet = streams.home[currentIndex + 1]
  //     buildTweet(tweet).prependTo($mainFeed)
  //     newIndex -= 1;
  //     currentIndex += 1;
  //   }
  // }

  function buildTweet(currentTweet) {
    var $tweetContainer = $('<div class = "tweetContainer"></div>')
        //photo
        var $tweetPhoto = $('<img src = "assets/img/'+ currentTweet.user + '.png">');
        //username
        var $tweetUser = $('<div class="tweetUser">@' + currentTweet.user + '</div>')
        //msg
        var $tweetMsg = $('<div class ="tweetMessage">' + currentTweet.message + '</div>');
        //icons
        var $tweetIcons = $('<div class = "icons"></div>');
          var $comment = $('<img src = "assets/icons/comment-29-16.png">');
          var $retweet = $('<img src = "assets/icons/retweet-1-16.png">');
          var $like = $('<img src = "assets/icons/like-fill-1-16.png">');
          var $share = $('<img src = "assets/icons/share-82-16.png">');
          $comment.appendTo($tweetIcons);
          $retweet.appendTo($tweetIcons);
          $like.appendTo($tweetIcons);
          $share.appendTo($tweetIcons);
        //time
        var $tweetTime =$('<div class = "tweetTime">' + currentTweet.created_at + '</div>')

        //load into container to build individual tweet
        $tweetPhoto.appendTo($tweetContainer)
        $tweetUser.appendTo($tweetContainer)
        $tweetMsg.appendTo($tweetContainer)
        $tweetIcons.appendTo($tweetContainer)
        $tweetTime.appendTo($tweetContainer)


        return $tweetContainer
  }

});