$(document).ready(function(){
  //selects elements with id app using css selector
  var $app = $('#app');
  //clears html
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page: ' + event.target.innerText);
  })

  //index of last tweet in collection
  var index = streams.home.length - 1;
  //iterate backwards
  while(index >= 0){
    //most recent tweet
    var tweet = streams.home[index];
    //UI element, create new div with class tweet
    var $tweet = $('<div class="tweet"></div>');
    //text of above tweet
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    //take div and put it on app
    $tweet.appendTo($app);
    index -= 1;
  }

});