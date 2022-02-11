$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');

  var $feedArea = $('#feed-area');
  var $feed = $('#feed');
  var $updateBtn = $('#update-feed');

  // Create new HTML elements

  renderFeed();

  // Create event handler functions

  function renderFeed (user) {
    var state = "home";
    if(user) {
      state = "users"
    }


    $feed.html('');
    if(state==="home") {
      var index = streams[state].length - 1;
    } else {
      var index = streams[state][user].length -1;
    }
    while(index >= 0){
      if(state === "home") {
        var tweet = streams[state][index];
      } else {
        var tweet = streams[state][user][index];
      }
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"></div>');
      var $tweetTextContainer =$('<div class="tweet-text-container"></div>');
      var $username = $('<div class="username"></div>');
      var $message = $('<div class="message"></div>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $iconContainer = $('<div class="icon-container">');
      var $iconComment = $('<i class="icon comment fa-solid fa-comment"></i>');
      var $iconRetweet = $('<i class="icon retweet fa-solid fa-retweet"></i>');
      var $iconLike = $('<i class="icon like fa-solid fa-heart"></i>');
      var $iconShare = $('<i class="icon share fa-solid fa-share"></i>');



      $username.text('@' + tweet.user +': ')
      $message.text(tweet.message);

      var theTime = $.timeago(tweet.created_at);
      $timestamp.text(theTime);

      // add event listener for username
      $('.username').on('click', handleUsernameClick);

      // add event handler for username
      var handleUsernameClick = function(e) {
        var textContent = e.target.textContent;
        var username = textContent.slice(1, textContent.indexOf(':'));
        //alert('User: ' + tweet.user + '| Index: ' + index + '| Username: ' + username);
        //console.log(e);
        //alert($('button').textContent);
        if($('#update-feed').length) {
          $('#update-feed').text('Back');
          $('#feed-area h2').text('User Feed');
        }

        renderFeed(username);



      };

      //appends

      $profilePhoto.appendTo($tweet);

      $username.appendTo($tweetTextContainer);
      $message.appendTo($tweetTextContainer);
      $timestamp.appendTo($tweetTextContainer);
      $tweetTextContainer.appendTo($tweet);

      $iconComment.appendTo($iconContainer);
      $iconRetweet.appendTo($iconContainer);
      $iconLike.appendTo($iconContainer);
      $iconShare.appendTo($iconContainer);

      $iconContainer.appendTo($tweetTextContainer);
      console.log($tweet);

      $tweet.appendTo($feed);







      setHover();

      index -= 1;
    }

  }

  var renderMouseEnter = function(){
    $(this).css("color","green");
    $(this).css("cursor","pointer");
  };

  var renderMouseLeave = function(){
    $(this).css("color","inherit");
    $(this).css("cursor","initial");
  };



  // Set event listeners (providing appropriate handlers as input)

  $updateBtn.on("click", function() {
    renderFeed();
    if($('#update-feed').length) {
      $('#update-feed').text('Update Feed');
    }
    $('#feed-area h2').text('Home Feed');
  });
  setHover();

  function setHover() {
    $('.icon, .username').mouseenter(renderMouseEnter);
    $('.icon, .username').mouseleave(renderMouseLeave);
  }


});

window.isItBeautifulYet = true;

