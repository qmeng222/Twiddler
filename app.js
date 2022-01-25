$(document).ready(function(){
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  $app.html('');
  $title.appendTo($app);
  $title.on("click", function(event) {
    //console.log(event);
    alert('The title of this page is: ' + event.target.innerText); // for each username click
});




  // Create handler functions
  function renderFeed(user) {
  //$feed.html(''); // .empty?


  var index = streams.home.length - 1;
  console.log(user);
  console.log(user, index, indexed);
    // if the username is not undefined
    // execute for streams user
    //debugger;
    if (user !== undefined) {
      var indexed = streams.users[user].length - 1;
      while(indexed >= 0){
        var username = streams.users;
        //console.log(username);

        var img = $('<img class="profile-photo" src="assets/img/'+ user + '.png"> </img>');
        var $tweet = $('<div class="tweet"></div>');
        var $message = $('<div class="message">' + username + '</div>');
        var $username = $('<div class="username">' + '@' + user + '</div>');
        //var $timestamp = $('<div class="timestamp">' + jQuery.timeago(new Date(tweet.created_at)) + '</div>');
        var $comment = $('<i class="comment far fa-comment"></i>');
        //console.log('<i class="far fa-comment"></i>');
        //console.log(var comment = $0);
        var $retweet = $('<i class="retweet fas fa-retweet"></i>');
        var $like = $('<i class="like far fa-heart"></i>');
        var $share = $('<i class="share far fa-share-square"></i>');

        // //$username.appendTo($app);


        // Append new HTML elements to the DOM
        img.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        //$timestamp.appendTo($tweet);
        $comment.appendTo($tweet);
        $retweet.appendTo($tweet);
        $like.appendTo($tweet);
        $share.appendTo($tweet);
        $tweet.appendTo($feed);// app
        //$text.appendTo($username);

        indexed -= 1;
      } // link tweets to log 11

    } else {
    //else use streams home --> generate all users
  // streams.users[user] access users tweets
  while(index >= 0){
    var tweet = streams.home[index];
    //console.log(tweet);
    var img = $('<img class="profile-photo" src="assets/img/'+ tweet.user + '.png"> </img>');
    var $tweet = $('<div class="tweet"></div>');
    var $message = $('<div class="message">' + tweet.message + '</div>');
    var $username = $('<div class="username">' + '@' + tweet.user + '</div>');
    var $timestamp = $('<div class="timestamp">' + jQuery.timeago(new Date(tweet.created_at)) + '</div>');
    var $comment = $('<i class="comment far fa-comment"></i>');
    //console.log('<i class="far fa-comment"></i>');
    //console.log(var comment = $0);
    var $retweet = $('<i class="retweet fas fa-retweet"></i>');
    var $like = $('<i class="like far fa-heart"></i>');
    var $share = $('<i class="share far fa-share-square"></i>');

    // //$username.appendTo($app);


    // Append new HTML elements to the DOM
    img.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    $tweet.appendTo($feed);// app
    //$text.appendTo($username);

    index -= 1;
  } // link tweets to log 11
}

  console.log(user);


};




    function handleUsernameClick(user) {
      // populate a feed with only the users tweets
      // if a username is referenced
      // use that username to populate only that users feed
      // var i = streams.users.length - 1;
      // var index = streams.home.length - 1;
      // while(index >= 0){
      //   var tweet = streams.home[index];
      //   var $tweet = $('<div class="tweet"></div>');
      //   var $message = $('<div class="message">' + tweet.message + '</div>');
      //   var $username = $('<div class="username">' + '@' + tweet.user + '</div>');
      //   var $timestamp = $('<div class="timestamp">' + jQuery.timeago(new Date(tweet.created_at)) + '</div>');


      //   if(tweet.user === 'shawndrost') {
      //     $tweet.addClass(tweet.user);
      //     $username.appendTo($tweet);
      //     $message.appendTo($tweet);
      //     $timestamp.appendTo($tweet);
      //   }
      //   index -= 1;

      //   $tweet.appendTo($feed);
      // }
      // if (tweet.user === 'shawndrost') {
      //  // console.log(tweet.user);
      //   renderFeed('shawndrost');
      //   } else if (tweet.user === 'sharksforcheap'){
      //     renderFeed(tweet.user);
      //   } else if (tweet.user === 'douglascalhoun') {
      //     renderFeed(tweet.user);
      //   } else if (tweet.user === 'mracus') {
      //     renderFeed(tweet.user);
      //   }



    };


//     var index = streams.home.length - 1;
//     var tweet = streams.home[index];
// var $tweet = $('<div class="tweet"></div>');
// var $username = $('<button id="update-user">' + '@' + tweet.user + '</button>'); //'<button id="update-user">Update Feed</button>'
// $username.appendTo($app);
// //$tweet.appendTo($feed);
// $username.click("#update-user", function (event) {
//   // if the username is clicked
//   // render a feed with only that usernames tweets
//   $feed.empty();
//   handleUsernameClick();
// });

// turn the username into a button/ clickable item
// append the username to the tweet
// when you click the clickable item (username)
  // run the handle click function


  var $username = $('<div class="username">' + '@' + 'sharksforcheap' + '</div>');
  var $tweet = $('<div class="tweet"></div>');
  //$feed.html('');
  $username.appendTo($feed);
  $username.on("click", function(event) {
    //console.log(event);
    renderFeed(event.target.innerText); // for each username click

});


var $button = $('<button id="update-feed">Update Feed</button>');
$button.appendTo($app);
$button.click("#update-feed", function (event) {
  $feed.empty();
  renderFeed();

});


  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);
//console.log(user);
  //renderFeed();
  renderFeed('mracus');

});

