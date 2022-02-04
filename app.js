$(document).ready(function(){
  //=========================================================
  // CODING FORMAT - Select already existing elements
  //=========================================================
  var $body = $('body');
  var $app = $('#app');
  $app.html('');

  //=========================================================
  // CODING FORMAT - Create new HTML elements
  //=========================================================
  var $title = $('<h1>Twiddler</h1>'); //created and stored in $title

  //home feed botton
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');

  //create new div for feed so renderfeed aka new feeds can be posted in here
  var $feed = $('<div id="feed"></div>')  //create a div with id='feed'

  //=========================================================
  // CODING FORMAT - Create event handler functions
  //=========================================================
  var renderFeed = function(index){
    $feed.empty();
    while (index >= 0) {
      // var index = streams.home.length - 1;
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message + index);
      $tweet.appendTo($feed);
      index -= 1;
    }
  }

  //=========================================================
  // CODING FORMAT - Set event listeners (providing appropriate handlers as input
  //=========================================================
  //substuded original code with below code to output initial tweets
  renderFeed(streams.home.length-1);

  $updateFeed.on('click', function(){
    index = streams.home.length - 1
    renderFeed(index)
  }); //click event listener

  //=========================================================
  // CODING FORMAT - Append new HTML elements to the DOM
  //=========================================================
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app)



});