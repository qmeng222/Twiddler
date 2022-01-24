$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($app);
    index -= 1;
  }

});