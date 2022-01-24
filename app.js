$(document).ready(function(){
  var $app = $('#app');
  $app.html('');


  var $header = $('<div class = "header"></div>');
    var $title = $('<a id = "title" href ="index.html">Twiddler 2.0</a>');
    $title.appendTo($header)
  $header.appendTo($app)


  var $navigation = $('<section class = "topNav"></section>')
    var $showNew = $('<input class = "showNew" id = "update-feed" type = "button"  type="submit" value="Update Tweet">')
      var $showNewButtonText = $('<h4>Update Tweet</h4>')
      $showNewButtonText.appendTo($showNew)
    $showNew.appendTo($navigation)
  $navigation.appendTo($app)

  var $feedContainer = $('<section></section>')
  $feedContainer.prop("id", "feed").appendTo($app)
    var $homeFeed = $('<div class = "homeFeed"></div>')
    $homeFeed.appendTo($feedContainer)
    var $userFeed = $('<div class = "userFeed"></div>')
    $userFeed.appendTo($feedContainer)


//----------------------------------------------------------------------------------------------------------------------------------------------------------
    function buildTweet(tweetObj) {
      var tweet = tweetObj
      var $tweet = $('<div class = "tweet"></div>')
      // $tweet.attr('id', "" + tweet.user + "")

        var $tweetHeader = $('<div class = "tweetHeader"></div>')
        $tweetHeader.appendTo($tweet)
          var $photo = $('<img class = profile-photo src = ' + tweet.profilePhotoURL + ' >').attr('id', "" + tweet.user + "")
          $photo.appendTo($tweetHeader)
          var $user = $('<div class = "username"></div>')
          $user.attr('id', "" + tweet.user + "").text('@' + tweet.user).appendTo($tweetHeader)

          var $message = $('<p class = "message"></p>')
          $message.text(tweet.message).appendTo($tweetHeader)

        var $tweetFooter = $('<div class = "tweetFooter"></>')
        $tweetFooter.appendTo($tweet)
          var $icons = $('<div class = "icons"></div>')

          $('<i class = "like fas fa-thumbs-up" src = assets/icons/placeholder.png>').appendTo($icons)
          $('<i class = "comment fas fa-comment-alt" src = assets/icons/placeholder.png>').appendTo($icons)
          $('<i class = "share fas fa-share-alt" src = assets/icons/placeholder.png>').appendTo($icons)
          $('<i class = "retweet fas fa-retweet" src = assets/icons/placeholder.png>').appendTo($icons)


          var $timeStamp = $('<time class = "timestamp" ><time class = "timeago"> ' + $.timeago(tweet.created_at) + ' </time>')

          $timeStamp.appendTo($tweetFooter)
          $icons.appendTo($tweetFooter)

          return $tweet
    }
//----------------------------------------------------------------------------------------------------------------------------------------------------------

  var currentCount = streams.home.length;
  var newCount = currentCount

  function loadTweet (firstTime) {
    var index = streams.home.length -1
    if (firstTime === true) {
      while (index >= 0) {
        var tweet = streams.home[index];
        buildTweet(tweet).appendTo($homeFeed)

        index -= 1
      }
    }
    if (firstTime === false){
      while (newCount > currentCount) {
        var tweet = streams.home[currentCount]
        buildTweet(tweet).prependTo($homeFeed)

        currentCount += 1
      }
    }

  }

  loadTweet(true)

  $('#update-feed').on("click", function() {


    if ($(this).val() === "Update Tweet"){
      newCount = streams.home.length;
      loadTweet(false)
    }
    if ($(this).val() === "Back"){
      $(".userFeed div.tweet").remove()
      $("#update-feed").prop("value", "Update Tweet").text("Update Tweet")
      $($(".homeFeed div.remove")).removeClass("remove").addClass("tweet")
      $(".homeFeed").show()

    }
  })

  $(".homeFeed").on("click", ".tweet .username", function (){
      $(".userFeed").show()
      $("#update-feed").prop("value", "Back").text("Back")
      $($(".homeFeed div.tweet")).removeClass("tweet").addClass("remove")
      $(".homeFeed").hide()

      var userName = $(this).attr("id")
      var userStream = streams.users[userName]
      var index = userStream.length - 1

      while (index >= 0) {
        var tweet = userStream[index];
          buildTweet(tweet).appendTo($userFeed)
          index -= 1
      }
  })
  window.isItBeautifulYet = true

});