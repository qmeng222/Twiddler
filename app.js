$(document).ready(function(){
  // selecting already existing elems
  var $app = $('#app');


  // creating new elements
  var $title = $("<h1>Twiddler</h1>");
  var $feed = $('<div id="feed"></div>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $section1 = $("<section class='section1'></section>");
  var $subSection = $("<section class='friendsList'></section>")
  var $friendsTitle = $("<h2 class='friendsTitle'>Friends List</h2>")
  var $friend1 = $("<p class='friend'>@douglascalhoun</p>")
  var $friend2 = $("<p class='friend'>@mracus</p>")
  var $friend3 = $("<p class='friend'>@sharksforcheap</p>")
  var $friend4 = $("<p class='friend'>@shawndrost</p>")


// // helper funcs
var renderFeed = function (user) {
  if (arguments.length !== 0) {
    var currentUser = streams.users[user];
    var index = currentUser.length - 1;
    while (index >= 0) {
      var tweet = currentUser[index];
      var $tweet = $("<div class='tweet'></div>");
      var $pfp = $("<img class='profile-photo'></img>");
      var $username = $("<div class='username'></div>");
      var $message = $("<p class='message'></p>");
      var $timestamp = $("<div class='timestamp'></div>");
      var $icon1 = $("<i class='icon far fa-comment comment'></i>")
      var $icon2 = $("<i class='icon fas fa-retweet retweet'></i>")
      var $icon3 = $("<i class='icon far fa-thumbs-up like'></i>")
      var $icon4 = $("<i class='icon fas fa-share-alt share'></i>");
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $message.text(tweet.message);
      $pfp.attr('src', "assets/img/" + tweet.user + ".jpeg");
    $username.text('@' + tweet.user);
    $pfp.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $icon1.appendTo($tweet)
    $icon2.appendTo($tweet)
    $icon3.appendTo($tweet)
    $icon4.appendTo($tweet)
    $tweet.appendTo($feed);
    $updateFeed.html('Back');
    index -= 1;
    }
  } else {
  // no argument
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $pfp = $("<img class='profile-photo'></img>");
    var $username = $("<div class='username'></div>");
    var $message = $("<p class='message'></p>");
    var $timestamp = $("<div class='timestamp'></div>");
    var $icon1 = $("<i class='far fa-comment comment'></i>");
    var $icon2 = $("<i class='fas fa-retweet retweet'></i>");
    var $icon3 = $("<i class='far fa-thumbs-up like'></i>");
    var $icon4 = $("<i class='fas fa-share-alt share'></i>");
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $message.text(tweet.message);
    $pfp.attr('src', "assets/img/" + tweet.user + ".jpeg");
    $username.text('@' + tweet.user);
    $pfp.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $icon1.appendTo($tweet)
    $icon2.appendTo($tweet)
    $icon3.appendTo($tweet)
    $icon4.appendTo($tweet)
    $tweet.appendTo($feed);
    index -= 1;
  }
 }
}


$friendsTitle.appendTo($subSection);
$friend1.appendTo($subSection);
$friend2.appendTo($subSection);
$friend3.appendTo($subSection);
$friend4.appendTo($subSection);
$title.appendTo($section1);
$updateFeed.appendTo($section1);
$subSection.appendTo($section1);
$section1.appendTo($app);
$feed.appendTo($app);

renderFeed();


  $('#feed').on('click', '.username', function (event) {
    $feed.empty();
    var name = event.target.innerText.replace('@', '');
    console.log(name);
    renderFeed(name);
  });

  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

 $updateFeed.on('click', function (event) {
   $updateFeed.html('Update Feed');
   $feed.empty()
   renderFeed();
 });

//  $friend1.on(()'click') function (event) {
//    $feed.empty();
//    renderFeed('douglascalhoun');
//  }

 $friend1.on('click', function(event) {
   $feed.empty();
   renderFeed('douglascalhoun');
 })
 $friend2.on('click', function(event) {
  $feed.empty();
  renderFeed('mracus');
})
$friend3.on('click', function(event) {
  $feed.empty();
  renderFeed('sharksforcheap');
})
$friend4.on('click', function(event) {
  $feed.empty();
  renderFeed('shawndrost');
})
window.isItBeautifulYet = true
});


