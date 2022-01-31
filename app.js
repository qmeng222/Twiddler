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
  var $homeFeedButton = $('<button id = "update-feed">Update Feed</button>');
  $homeFeedButton.appendTo($homeFeedSection);

  var trackingArr = [];
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($homeFeedSection);
    trackingObj[tweet.message] = 1;
    index -= 1;
  }

  $homeFeedSection.appendTo($app);


  // run a new loop outside the button element
    // if diff form previous loop push retunr in button element??
  // var checkDuplicates function(input) {

  // }
  // only when the UPDATE button is clicked will the below code run... so maybe write function that
    // pusher to object outside and invoke inside?
    //  WE NEED TO PASS A CLICK HANDLER
      // click handler should be in charge of invoking the funtion not you
      //should I be in "document" below or a diff element?
      //add wrapper function around?? video 47 min?

  $homeFeedButton.on("click", function(event) {

    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      console.log(tweet.message);
      $tweet.appendTo($homeFeedSection);
      index -= 1;
      return event;
    };
  });

  // $(document).on("click", "#update-feed", function() {

  //   var index = streams.home.length - 1;
  //   while(index >= 0){
  //     var tweet = streams.home[index];
  //     var $tweet = $('<div class="tweet"></div>');
  //     $tweet.text('@' + tweet.user + ': ' + tweet.message);
  //     $tweet.appendTo($homeFeedSection);
  //     trackingArr.push(tweet.message);
  //     index -= 1;

  //   }

  // });





});

