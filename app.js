$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

 /*
  =============================================
  Helper Functions
  =============================================
*/

  /*
  =============================================
  Title & Home/Update Buttons
  =============================================
*/
  //Create div container to store elements
  $titleContainer =$('<div class="title container"></div>');
  //Append title to DOM.
  $titleContainer.appendTo($app);
  //Create an h1 element for the title and store it.
  $title =$('<h1>Twiddler</h1>');
  //Append title to container
  $title.appendTo($titleContainer);
  //Create update feed button
  $updateBtn =$('<button type="button" id="update-feed">Update Feed</input>');
  //Attach to title
  $updateBtn.appendTo($titleContainer);



  /*
  =============================================
  Tweet Feed
  =============================================
  */
  //create container
  $feedContainer =$('<div class="feed container" id="feed"></div>');
  //append container to DOM
  $feedContainer.appendTo($app);
  var tweetGen = function() {
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    //create var for the message of the tweet
    var message = tweet.message;
    // use jquery to create an element
    var $message = $('<p class="message">'+message+'</p>');
    // var for username
    var username = '@' + tweet.user;
    //element
    var $username = $('<span class="username">'+username+'</span>');
    //jquery element for profile pics
    var $profilePic = $('<img class="profile-photo" src="assets/img/'+tweet.user+'.png"/>');
    //var for date time
    var dateTime = format(tweet.created_at);
    //Element
    var $dateTime = $('<span class="timestamp">'+dateTime+'</span>');
    //$tweet.text('@' + tweet.user + ': ' + tweet.message);
    //create container for tweets
    $tweetContainer =$('<div class="tweet-feed"></div>');
    //append everything to appear
    $tweetContainer.appendTo($feedContainer);
    $tweet.appendTo($tweetContainer);
    $message.appendTo($tweet);
    $username.appendTo($tweet);
    $profilePic.appendTo($tweet);
    $dateTime.appendTo($tweet);
    index -= 1;
  }};
  tweetGen();

  $updateBtn.on("click", function(){
    $feedContainer.html('');
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      //create var for the message of the tweet
      var message = tweet.message;
      // use jquery to create an element
      var $message = $('<p class="message">'+message+'</p>');
      // var for username
      var username = '@' + tweet.user;
      //element
      var $username = $('<span class="username">'+username+'</span>');
      //jquery element for profile pics
      var $profilePic = $('<img class="profile-photo" src="assets/img/'+tweet.user+'.png"/>');
      //var for date time
      var dateTime = format(tweet.created_at);
      //Element
      var $dateTime = $('<span class="timestamp">'+dateTime+'</span>');
      //$tweet.text('@' + tweet.user + ': ' + tweet.message);
      //create container for tweets
      $tweetContainer =$('<div class="tweet-feed"></div>');
      //append everything to appear
      $tweetContainer.appendTo($feedContainer);
      $tweet.appendTo($tweetContainer);
      $message.appendTo($tweet);
      $username.appendTo($tweet);
      $profilePic.appendTo($tweet);
      $dateTime.appendTo($tweet);
      index -= 1;
    }
  });

  /*
  =============================================
  New Tweet Form
  =============================================
  */
  //Create new tweet container
  $newTweetContainer=$('<div class="newtweet container"></div>');
  //append conainter to DOM
  $newTweetContainer.appendTo($app);

  $underCon1 =$('<h1 class="under-con">Under Construction</h1>')
  $underCon1.appendTo($newTweetContainer);
  /*
  =============================================
  Friends List
  =============================================
  */
  //create friends list container
  $friendsListContainer=$('<div class="friends container"></div>');
  //append container to DOM
  $friendsListContainer.appendTo($app);

  $underCon2 =$('<h1 class="under-con">Under Construction</h1>')
  $underCon2.appendTo($friendsListContainer);


});