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
  $title =$('<h1>Twiddler 2.0</h1>');
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
  //Main Feed function
  var renderFeed = function() {
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
    var dateTime = $.timeago(tweet.created_at);
    //Element
    var $dateTime = $('<span class="timestamp">'+dateTime+'</span>');
    //Create icons for tweet box
    //Comment
    // var $testComment =$('<img class="comment" src="assets/icons/placeholder.png">');
    // var $testRetweet =$('<img class="retweet" src="assets/icons/placeholder.png">');
    // var $testLike =$('<img class="like" src="assets/icons/placeholder.png">');
    // var $testShare =$('<img class="share" src="assets/icons/placeholder.png">');

    var $comment =$('<i class="far fa-comment comment icon"></i>');
    var $retweet =$('<i class="fas fa-retweet retweet icon"></i>');
    var $like =$('<i class="far fa-thumbs-up like icon"></i>');
    var $share =$('<i class="fas fa-external-link-alt share icon"></i>');



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
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);

    $username.on("click", function(event){
      var name = $(event.target).text().replace('@','');
      console.log(name);
      userClick(name);
      $updateBtn.text('Back');
      $updateBtn.on("click", function(){
        $feedContainer.html('');
        $updateBtn.text('Update Feed');
        renderFeed();
      })
    });

    //$testComment.appendTo($tweet);
    // $testRetweet.appendTo($tweet);
    // $testLike.appendTo($tweet);
    // $testShare.appendTo($tweet);
    index -= 1;
  }};
  renderFeed();
  //Update Feed button click
  $updateBtn.on("click", function(){
    $feedContainer.html('');
    renderFeed();
  });

 //function for username click
 var userClick = function(name){
  $feedContainer.html('');
  var index = streams.users[name].length - 1;
  while(index >= 0){
    var tweet = streams.users[name][index];
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
    var dateTime = $.timeago(tweet.created_at);
    //Element
    var $dateTime = $('<span class="timestamp">'+dateTime+'</span>');
    //Create icons for tweet box
    //Comment

    var $comment =$('<i class="far fa-comment comment icon"></i>');
    var $retweet =$('<i class="fas fa-retweet retweet icon"></i>');
    var $like =$('<i class="far fa-thumbs-up like icon"></i>');
    var $share =$('<i class="fas fa-external-link-alt share icon"></i>');



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
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);

    index -=1;

 }};


  /*
  =============================================
  New Tweet Form
  =============================================
  */
  //Create new tweet container
  $newTweetContainer=$('<div class="newtweet container"></div>');
  //append conainter to DOM
  $newTweetContainer.appendTo($app);

  $underCon1 =$('<h1 class="under-con">Create New Tweet - Coming Soon </h1>')
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

  $underCon2 =$('<h1 class="under-con">Friends List Coming Soon </h1>')
  $underCon2.appendTo($friendsListContainer);

  //Minimums Met
  window.isItBeautifulYet = true;
});