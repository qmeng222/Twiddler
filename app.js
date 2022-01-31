$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  // --- HOME FEED SETION --->
  var trackingObj = {};
  var $homeFeedSection = $('<section id="feed"></section>');
  var $buttonDiv = $('<div class="buttons"></div>');
  var $homeFeedButton = $('<button id = "update-feed">Update Feed</button>');
  var $tweetDiv = $('<div class="tweetsContainer"></div>');
  $homeFeedButton.appendTo($buttonDiv);
  $buttonDiv.appendTo($homeFeedSection);
  $tweetDiv.appendTo($homeFeedSection);


  var trackingArr = [];
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
   // $tweet.text('');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($tweetDiv);
    trackingObj[tweet.message] = 1;
    index -= 1;
  }

  $homeFeedSection.appendTo($app);



  $homeFeedButton.on("click", function(event) {
    var seen = {};
    $('.tweet').each(function() {
      var message = $(this).text();
      if (seen[message]) {
        $(this).remove();
      } else {
        seen[message] = true;
      }
    });
    for (var i = 0; i < streams.home.length; i++) {
      var fullTweet = '@'+streams.home[i].user + ': '+ streams.home[i].message;
      var time = streams.home[i].created_at;
        if (seen[fullTweet] === undefined) {
          var newTweet = streams.home[i];
          var $newTweet = $('<div class="tweet"></div>');
          $newTweet.text('@' + newTweet.user + ': ' + newTweet.message);
          $newTweet.prependTo($tweetDiv);
          $tweetDiv.appendTo($homeFeedSection);
        }
    }
     return event;
  });






});

