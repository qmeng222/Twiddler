$(document).ready(function(){
  var $body = $('body');
  var $app = $('#app');  //select div from the DOM
  $app.html('');  //why?

  var $title = $('<h1>Twiddler</h1>'); //created and stored in $title
  $title.appendTo($app);

  //home feed botton
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  $updateFeed.appendTo($app);


  //--------------------------------------------------------------------
  //create new div for feed so renderfeeds aka new feeds can be posted in here
  var $feed = $('<div id="feed"></div>')  //create a div with id='feed'
  // $feed.text('testtesttest')
  $feed.appendTo($app)
  //---------------------------------------------------------------------------

  //--------------------------------------------------------------------
  //There's a similar code in dataGenerator.js to auto generate new tweets I think in the backend?
  //so the below code is used to post 10 tweets from the newest to oldest?
  //the below code was given and moved from index.html
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];  //individual tweets
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($app);
    index -= 1;
  }

  var lastIdx = 10;
  $updateFeed.on('click', function(){
    var index = streams.home.length - 1
    //if condition to check if duplicated output
    while (index > lastIdx) {
      var tweet = streams.home[lastIdx+1]   //rechieve individual tweet from streams.home
      var $tweet = $('<div class="tweet"></div>')
      $tweet.text('@' + tweet.user + ': ' + tweet.message + (lastIdx+1));
      $tweet.prependTo($feed)
      lastIdx += 1;
    }
  }); //click event listener
















//--------------------------------------------------------------------
// $title.on("click", function(event){
//   console.log(event);
//   alert("The title is " + event.target.innerText);
// })
// $title.hover(
//   function(){
//     $(this).css('background-color', 'red')  //why 'this' & $title all work?
//   }, function(){
//     $title.css('background-color', 'green')
//   }
// )



//----------------------------------------------------------
//below is a mouseover practise
// $("h1")
//   .mouseover(function(){
//    $("h1").css("background-color", "red");
//   })
//   .mouseout(function(){
//     $("h1").css("background-color", "green");
//   })
//----------------------------------------------------------



});