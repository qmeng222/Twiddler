"use strict";

$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('This is an event: ' + event.target.innerText);
  });

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($app);
    index -= 1;
  }



});
console.log('hello');
