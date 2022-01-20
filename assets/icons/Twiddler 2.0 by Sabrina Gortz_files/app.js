$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $glass = $('<main class="glass"></main>');
  $glass.appendTo($app);

  var $dashboard = $('<section class="dashboard"></section>');
  $dashboard.appendTo($glass);

  var $mainUser = $('<div class="user"></div>');
  $mainUser.appendTo($dashboard);

  var friendsList = $('<div class="friend-list"></div>');
  $friendsList.appendTo($dashboard);


  // // Create an h1 element with the text "Twiddler"
  // var $title = $('<h1 id="title">Welcome to <br/>Twiddler 2.0 !</h1>');
  // // Append the h1 element to the DOM, nested inside of the #app div
  // $title.appendTo($app);
  // // Set a click event listener on the h1 element
  // $title.on("click", function(event) {
  //   console.log(event);
  //   alert('The title of this page is: ' + event.target.innerText);
  // });

  // //Selecting elements and adding them to the page
  // var $glass = $('<main class="glass"></main>');
  // $glass.appendTo($app);
  // var $circularPortrait = ('<div class="circular--portrait"></div>');
  // circularPortrait.appendTo($app);

  // var index = streams.home.length - 1;
  // while(index >= 0){
  //   var tweet = streams.home[index];
  //   var $tweet = $('<div class="tweet"></div>');
  //   $tweet.text('@' + tweet.user + ': ' + tweet.message);
  //   $tweet.appendTo($app);
  //   index -= 1;
  // }

});