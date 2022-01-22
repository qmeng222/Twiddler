$(document).ready(function(){
  // Select the div with the ID #app
  var $app = $('#app');

  // Reset the html to ''
  $app.html('');

  // Create an h1 element with the text "twiddler"
  var $title = $('<h1>Twiddler</h1>');

  // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);

  // Set a click event listener on the h1 element
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  // Create a button with the ID "update-feed"
  var $updateBtn = $('<button id="update-feed">Update Feed</button>');

  // Append the button to the DOM, nested inside of the #app div
  $updateBtn.appendTo($app);

  // Create a div with the ID "feed"
  var $feed = $('<div id="feed"></div>')

  // Append the div#feed to the DOM, nested inside the #app div
  $feed.appendTo($app);

  // Add a click event listener on the #update-feed button
  $updateBtn.on("click", function(event) {
    updateFeed();
  })

  var updateFeed = function() {
    var index = streams.home.length - 1;
    $(".tweet").remove();
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  updateFeed();

});