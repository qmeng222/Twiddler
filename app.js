
$(document).ready(function () {
  var $app = $('#app');
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button type="button" id="update-feed">Update Feed</button>')
  var $feed = $('<div id="feed"></div>')
  $app.html(''); //removes any html from the page
  $("time.timeago").timeago();
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);
  $title.on("click", function (event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });
  $button.on("click", function (event) {
    console.log(event)
    alert("Button has been pressed " + event.target.innerText)
    $feed.html('');
    var index = streams.home.length - 1;

    while (index >= 0) {
      var tweet = streams.home[index]; //no jQuery.. data from backend
      var $tweet = $('<div class="tweet"></div>'); //use $ to create new div

      var elapsed = Date.now() - tweet.created_at;
      elapsed = Math.floor(elapsed / 1000 / 60);
      commentIcon = './assets/icons/placeholder.png';
      retweetIcon = './assets/icons/placeholder.png';
      likeIcon = './assets/icons/placeholder.png';
      shareIcon = './assets/icons/placeholder.png';


      //profile photo
      var imgsrc = streams.home[index].profilePhotoURL
      $profilePhoto = $('<img class="profile-photo">');
      $profilePhoto.attr('src', imgsrc);

      //icons
      $commentIcon = $('<img class="comment">');
      $commentIcon.attr('src', commentIcon);
      $retweetIcon = $('<img class="retweet">');
      $retweetIcon.attr('src', retweetIcon);
      $likeIcon = $('<img class="like">');
      $likeIcon.attr('src', likeIcon);
      $shareIcon = $('<img class="share">');
      $shareIcon.attr('src', shareIcon);



      var $message = $('<div class="message"></div>');
      var $username = $('<div class="username"></div>');
      var $timestamp = $('<div class="timestamp"></div>');
      //var timeAgo = jQuery.timeago(tweet.create_at)

      //text updates & inputs
      $message.text(tweet.message);
      $username.text('@' + tweet.user);
      $timestamp.text(jQuery.timeago(tweet.created_at))
      //$timestamp.text(timeAgo);

      //$profilePhoto.text(tweet.profilePhotoURL)
      //$tweet.text('@' + tweet.user + ': ' + tweet.message);


      //main tweet DIV
      $tweet.appendTo($feed); //was app
      //sub DIVs
      $profilePhoto.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $commentIcon.appendTo($tweet);
      $retweetIcon.appendTo($tweet);
      $likeIcon.appendTo($tweet);
      $shareIcon.appendTo($tweet);

      index -= 1;
    }



  })

  var index = streams.home.length - 1;
  while (index >= 0) {
    var tweet = streams.home[index]; //no jQuery.. data from backend
    var $tweet = $('<div class="tweet"></div>'); //use $ to create new div

    var elapsed = Date.now() - tweet.created_at;
    elapsed = Math.floor(elapsed / 1000 / 60);
    commentIcon = './assets/icons/placeholder.png';
    retweetIcon = './assets/icons/placeholder.png';
    likeIcon = './assets/icons/placeholder.png';
    shareIcon = './assets/icons/placeholder.png';


    //profile photo
    var imgsrc = streams.home[index].profilePhotoURL
    $profilePhoto = $('<img class="profile-photo">');
    $profilePhoto.attr('src', imgsrc);

    //icons
    $commentIcon = $('<img class="comment">');
    $commentIcon.attr('src', commentIcon);
    $retweetIcon = $('<img class="retweet">');
    $retweetIcon.attr('src', retweetIcon);
    $likeIcon = $('<img class="like">');
    $likeIcon.attr('src', likeIcon);
    $shareIcon = $('<img class="share">');
    $shareIcon.attr('src', shareIcon);



    var $message = $('<div class="message"></div>');
    var $username = $('<div class="username"></div>');
    var $timestamp = $('<div class="timestamp"></div>');
    //var timeAgo = jQuery.timeago(tweet.create_at)

    //text updates & inputs
    $message.text(tweet.message);
    $username.text('@' + tweet.user);
    $timestamp.text(jQuery.timeago(tweet.created_at))
    //$timestamp.text(timeAgo);

    //$profilePhoto.text(tweet.profilePhotoURL)
    //$tweet.text('@' + tweet.user + ': ' + tweet.message);


    //main tweet DIV
    $tweet.appendTo($feed); //was app
    //sub DIVs
    $profilePhoto.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $commentIcon.appendTo($tweet);
    $retweetIcon.appendTo($tweet);
    $likeIcon.appendTo($tweet);
    $shareIcon.appendTo($tweet);

    index -= 1;
  }













});





