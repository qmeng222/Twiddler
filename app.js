$(document).ready(function(){
  //selects selector with id app
  var $app = $('#app');
  //clears html
  $app.html('');

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