$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  $(".userFeed").hide()

  // ------------------------------------------------------------------------------------------------

  // Header Title Back to Top Button

  var $header = $('<div class = "header"></div>');
    //Title
    var $title = $('<a id = "title" href ="index.html">Twiddler 2.0</a>');
    var $topbutton = $('<h3 class = "topButton"><input class = "button" type = "submit" value = "Back To Top"></input></h3>')
    //show New Tweets button
    $topbutton.appendTo($navigation)
    $title.appendTo($header)
  $header.appendTo($app)

  // ------------------------------------------------------------------------------------------------

  //navigation
  var $navigation = $('<section class = "topNav"></section>')
    //Back to Top Button
    var $showNew = $('<input class = "showNew" type = "button"  type="submit" value="Latest Tweet">')
    // var $PauseResume = $('<input class = "PauseResume" type = "button" type="submit" value="Pause">')
    var $homeBack = $('<input class = "homeBack" type = "button" type="submit" href = "index.html" value="Home">')
    $showNew.appendTo($navigation)
    $homeBack.appendTo($navigation)
    // $PauseResume.appendTo($navigation)
  $navigation.appendTo($app)
  // ------------------------------------------------------------------------------------------------
  // mainFeed
  var $mainFeed = $('<section class = "mainFeed"></section>') // contains all tweets
  $mainFeed.attr("id", "feed").appendTo($app)

  // ------------------------------------------------------------------------------------------------

  //keeping track of current size of feed
  var currentCount = streams.home.length;  // initial size of feed,
  var newCount = currentCount              // later set newCount to currentCount to compare if there are new tweets

  // ------------------------------------------------------------------------------------------------
  function buildTweet(tweetObj) {
    var tweet = tweetObj
    var $tweet = $('<div class = "tweet"></div>')
    $tweet.attr('id', "" + tweet.user + "")

      var $tweetHeader = $('<div class = "tweetHeader"></div>')
      $tweetHeader.appendTo($tweet)
        var $photo = $('<img class = photo src = ' + tweet.profilePhotoURL + ' >').attr('id', "" + tweet.user + "")
        var $user = $('<div class = "user"></div>')
        $photo.appendTo($tweetHeader)
        $user.attr('id', "" + tweet.user + "").data('userName', tweet.user).text('@' + tweet.user).appendTo($tweetHeader)

        var $message = $('<p class = "message"></p>')
        $message.text(tweet.message).appendTo($tweetHeader)

      var $tweetFooter = $('<div class = "tweetFooter"></>')
      $tweetFooter.appendTo($tweet)
        var $icons = $('<div class = "icons"></div>')

        $('<img  src = assets/icons/like-fill-1-16.png>').appendTo($icons)
        $('<img  src = assets/icons/comment-29-16.png>').appendTo($icons)
        $('<img  src = assets/icons/share-82-16.png>').appendTo($icons)
        $('<img  src = assets/icons/retweet-1-16.png>').appendTo($icons)

        var $timeStamp = $('<p class = "timeStamp"></p>')
        $timeStamp.text(tweet.created_at).appendTo($tweetFooter)
        $icons.appendTo($tweetFooter)

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
    $(".user").on("click", function(){
      $(".homeBack").prop("value", "Back")
      var userName = $(this).data('userName')
      filter = userName
      filterTweets(userName)
    })
  }
  loadTweet(true) // intial load tweets

  // ------------------------------------------------------------------------------------------------
  // Turn on filter and makes sure that each new tweet is filtered until var filter is cleared
  var filter = "";

  function filterTweets (userNameToFilter){
    $(".tweet").not("#" + userNameToFilter + "").hide()
  }
  // ------------------------------------------------------------------------------------------------


  //BUTTONS
  $(".homeBack").on("click", function() {
    if ($(this).val() === "Back") {
      $(this).prop("value", "Home")
    }
    $(".tweet").show()
    filter = ""
  })


  $('.showNew').on("click", function() {
    newCount = streams.home.length;
    loadTweet(false)
    if (filter !== ""){
      filterTweets(filter)
    }
  })

  // ------------------------------------------------------------------------------------------------
  function checkTweets() {
    newCount = streams.home.length;
    if (newCount >= currentCount) {
      loadTweet(false)
      if (filter !== ""){
        filterTweets(filter)
      }
    }
    setTimeout(function() {
      checkTweets();
    }, 10000);
  }
  checkTweets()
  // ------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------
});