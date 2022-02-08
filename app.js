$(document).ready(function(){
  // Select the div with the ID #app
  var $app = $('#app');

  // Create an h1 element with the text "Twiddler"
  var $title = $('<h1>Twiddler</h1>');
  // Create a button element with id named update-feed
  var $button = $('<button id=update-feed>Update Feed</button>');
  // Create a div element with id named feed
  var $twitterFeed = $('<div id=feed></div>');

  $app.html('');

  // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);
  // Append the button element to the DOM, nested inside of the #app div
  $button.appendTo($app);
  // Append the div feed element to the DOM, nested inside of the #app div
  $twitterFeed.appendTo($app);

  // Set a click event listener on the h1 element
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  // Set a click event listener on the button element
  $button.on('click', function() {

  });

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($twitterFeed);
    index -= 1;
  }
});