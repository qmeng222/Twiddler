$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  $(".userFeed").hide()

  // ------------------------------------------------------------------------------------------------

  // Header Title Back to Top Button

  var $header = $('<div class = "header"></div>');
    //Title
    var $title = $('<h1 id = "title"><a href ="index.html">Twiddler<br>2.0<br></a></h1>');
    var $topbutton = $('<h3 class = "topButton"><input class = "button" type = "submit" value = "Back To Top"></input></h3>')
    //show New Tweets button
    $topbutton.appendTo($navigation)
    $title.appendTo($header)
  $header.appendTo($app)

  // ------------------------------------------------------------------------------------------------

  //navigation
  var $navigation = $('<section class = "topNav"></section>')
    //Back to Top Button
    var $showNew = $('<input class = "showNew" type = "button" type="submit" value="Latest Tweet">')
    var $home = $('<input class = "home" type = "button" type="submit" href = "index.html" value="Home">')
    $showNew.appendTo($navigation)
    $home.appendTo($navigation)
  $navigation.appendTo($app)
  // ------------------------------------------------------------------------------------------------
  // mainFeed

  var $timeline = $('<section class = "timeline"></section>') // contains mainfeed of all tweets and unique user tweets
    var $mainFeed = $('<section class = "mainFeed"></section>') // contains all tweets
    $mainFeed.appendTo($timeline)
  $timeline.appendTo($app)
  // ------------------------------------------------------------------------------------------------

  //keeping track of current size of feed
  var currentCount = streams.home.length;  // initial size of feed,
  var newCount = currentCount              // later set newCount to currentCount to compare if there are new tweets

  // ------------------------------------------------------------------------------------------------
  function buildTweet(tweetObj) {
    var tweet = tweetObj
    var $tweet = $('<div class = "tweet"></div>')
        var $photo = $('<img class = photo src = ' + tweet.profilePhotoURL + ' >')
        var $user = $('<p class = "user"></p>')
        var $message = $('<p class = "message"></p>')
        var $icons = $('<div class = "icons"></div>')
          $('<img class = "photo" src = assets/icons/like-fill-1-16.png>').appendTo($icons)
          $('<img class = "comment" src = assets/icons/comment-29-16.png>').appendTo($icons)
          $('<img class = "share" src = assets/icons/share-82-16.png>').appendTo($icons)
          $('<img class = "retweet" src = assets/icons/retweet-1-16.png>').appendTo($icons)
        var $timeStamp = $('<p class = "timeStamp"></p>')

        $photo.appendTo($tweet)
        $user.addClass(tweet.user).data('userName', tweet.user).text('@' + tweet.user).appendTo($tweet)
        $tweet.addClass(tweet.user)
        $message.text(tweet.message).appendTo($tweet)
        $icons.appendTo($tweet)
        $timeStamp.text(tweet.created_at).appendTo($tweet)

    // console.log(streams.home.indexOf(tweet), newCount, currentCount)

        return $tweet
  }
  // ------------------------------------------------------------------------------------------------
  function loadTweet (firstTime) { // passing in boolean, pass in false if I want to load additional tweets
    var index = streams.home.length -1
    if (firstTime === true) {
      while (index >= 0) {
        var tweet = streams.home[index];
        buildTweet(tweet).appendTo($mainFeed)

        index -= 1
      }
    }
    if (firstTime === false){
      while (newCount > currentCount) {
        var tweet = streams.home[currentCount]
        buildTweet(tweet).prependTo($mainFeed)

        currentCount += 1
      }
    }
  }
  loadTweet(true) // intial load tweets
  // ------------------------------------------------------------------------------------------------

  $(".user").on("click", function(){
    $(".home").prop("value", "Back")
    var userName = $(this).data('userName')
    $(".tweet").hide()
  })
  // ------------------------------------------------------------------------------------------------
  // set newCount to new size of stream,
  // function checkTweets() {
  //   newCount = streams.home.length;
  //   if (newCount >= currentCount) {
  //     loadTweet(false)
  //   }
  //   setTimeout(function() {
  //     checkTweets();
  //   }, 10000);
  // }
  // checkTweets()
  // ------------------------------------------------------------------------------------------------

  $('.showNew').on("click", function() {
    newCount = streams.home.length;
    loadTweet(false)
  })
  $('.home').on("click", function() {
    $(".tweet").show()


  })
  // ------------------------------------------------------------------------------------------------
});