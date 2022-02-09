$(document).ready(function(){
  $("time.timeago").timeago();
  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1 class="title">Twiddler</h1>');
  var $homeFeed = $("<div id='feed'></div>");
  var $button = $("<button id='update-feed' type='button'>Update Feed</button>");
  var $userFeed = $("<div class='userFeed'></div>")
  var $tweetDiv = $('<div class="tweetDiv"></div>');
  var $tweetPic = $('<img class="profile-photo" src="assets/img/fsociety.png">');
  var $visitorName = $('<span class="username fsociety">@fsociety</span>');
  var $tweetForm = $('<form id="new-tweet-form" class="tweetForm" enctype="multipart/form-data" name="tweetForm"><br><label for="new-tweet-form">Tweet To:</label><br><input id="new-tweet-form" class="toUser" name="username" placeholder="username"><br><label for="message-input">What\'s on your mind?</label><br><input id="message-input" class="textArea" name="message" placeholder="We\'d love to hear what\'s on your mind! Write your tweet here."><br></form>');
  var $tweetButton = $('<button class="tweetSubmit" type="button">Post Tweet!</button>');
  var $friendsList = $('<ul id="friends-list"></ul>');
  var $friendsListDiv = $('<div class="friends-list-div"></div>');
  var $friendsListTitle = $('<h2 class="friends-list-title">Friends</h2>');

  // Create event handler functions
  function renderFeed() {
    $('#feed').hide();
    $('#feed').fadeIn(0); // 750
    clearFeed();
    renderTweets();
    $('.username').hover(function(e) {
      $(this).css('border-right', '3px ridge blue');
      $(this).css('border-bottom', '4px ridge blue');
      $(this).css('color', 'red');
    }, function(e) {
      $(this).css('border-right', '0px ridge blue');
      $(this).css('border-bottom', '0px ridge blue');
      $(this).css('color', 'blueviolet');
    });
    $('.comment').on('click', function(e) {
      $(this).siblings('.commentForm').slideDown(250)
      $(this).siblings('.commentSubmit').show();
    });
    $('.comment').on('dblclick', function(e) {
      $(this).siblings('.commentForm').slideUp(250)
      $(this).siblings('.commentSubmit').hide();
    });
    $('.commentSubmit').on('click', function(e) {
      var com = $(this).siblings('.commentForm').children('input').val();
      // var user = $(this).siblings('.username').text().slice(1);
      var par = $(this).parent();
      console.log('com:   ', com);
      // console.log('user:   ', user);
      console.log('parent:   ', par);
      var $commentDiv = $('<div class="commentDiv"></div>');
      var $photo = $('<img class="profile-photo" src="assets/img/fsociety.png">');
      var $user = $('<span class="username">@fsociety</span>');
      var $comment = $('<p class="message">' + com + '</p>');
      var $time = $('<div class="timestamp">' + $.timeago(new Date()) + '</div>');
      var $iconLike = $("<i class='icon like far fa-thumbs-up fa-2x'></i>");
      $iconLike.on('click', function(e) {
        $(this).css('transform', 'scale(1.25)');
        $(this).css('color', 'red');
      });
      $iconLike.on('dblclick', function(e) {
        $(this).css('transform', 'scale(1.00)');
        $(this).css('color', 'white');
      });
      $photo.appendTo($commentDiv);
      $user.appendTo($commentDiv);
      $comment.appendTo($commentDiv);
      $time.appendTo($commentDiv);
      $iconLike.appendTo($commentDiv);
      $commentDiv.appendTo(par);
      $(this).hide();
      $(this).siblings('.commentForm').slideUp(250);
    });
    $('.profile-photo').on('click', function(e) {
      var who = $(this).siblings('.username').text().slice(1);
      var user = $(this).siblings('.' + who).text().slice(1);
      window.open('file:///Users/mitchwintrow/Documents/mrrobotisreal/seip2202-twiddler/assets/img/' + user +'.png');
    });
    $('.share').on('click', function(e) {
      var textarea = document.createElement('textarea');
      textarea.textContent = 'file:///Users/mitchwintrow/Documents/mrrobotisreal/seip2202-twiddler/index.html';
      document.body.appendChild(textarea);
      var selection = document.getSelection();
      var range = document.createRange();
    //  range.selectNodeContents(textarea);
      range.selectNode(textarea);
      selection.removeAllRanges();
      selection.addRange(range);
      console.log('copy success', document.execCommand('copy'));
      alert('URL has successfully been copied! Thanks for sharing!');
      selection.removeAllRanges();
      document.body.removeChild(textarea);
    });
    $('.retweet').on('click', function(e) {
      retweet($(this).siblings('.message').text(), $(this).siblings('.username').text().slice(1));
    });
    $('.commentSubmit').hide();
  }

  function renderTweets(user) {
    var homeStream;
    if (user === undefined) {
      homeStream = streams.home;
    }
    else {
      homeStream = streams.users[user];
    }
    for (var i = homeStream.length - 1; i >= 0; i--) {
      var tweet = homeStream[i];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $("<img class='profile-photo " + tweet.user + "' src='assets/img/" + tweet.user + ".png'>");
      if (tweet.postedBy) {
        var $userName = $("<span class='username " + tweet.user + "'>@" + tweet.user + "</span>");
        var $poster = $('<span class="username poster">@' + tweet.postedBy + '</span>');
        var $xtraPhoto = $('<img class="profile-photo xtra" src="assets/img/' + tweet.postedBy + '.png">');
      } else {
        var $userName = $("<span class='username " + tweet.user + "'>@" + tweet.user + "</span>");
      }
      if (tweet.postedBy) {
        var $message = $("<p class='message'><u><b><em>@" + tweet.postedBy + " says:</em></b></u> " + tweet.message + "</p>");
      } else {
        var $message = $("<p class='message'>" + tweet.message + "</p>");
      }
      var $timeStamp = $("<div class='timestamp'>" + $.timeago(tweet.created_at) + "</div>");
      var $iconC = $("<i class='icon comment fas fa-comment-dots fa-2x'></i>");
      var $iconR = $("<i class='icon retweet fas fa-retweet fa-2x'></i>");
      var $iconL = $("<i class='icon like far fa-thumbs-up fa-2x'></i>");
      var $iconS = $("<i class='icon share fab fa-slideshare fa-2x'></i>");
      var $commentForm = $("<form class='commentForm' enctype='multipart/form-data' name='commentForm'><b>Comment:</b><br><input id='postComment' class='textArea' name='comment'><br></form>");
      var $commentButton = $('<button class="commentSubmit" type="submit">Leave Comment</button>');
      $profilePhoto.appendTo($tweet);
      if (tweet.user === 'douglascalhoun') {
        $('.douglascalhoun').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('douglascalhoun');
        });
      } else if (tweet.user === 'johnwick') {
        $('.johnwick').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('johnwick');
        });
      } else if (tweet.user === 'sharksforcheap') {
        $('.sharksforcheap').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('sharksforcheap');
        });
      } else if (tweet.user === 'shawndrost') {
        $('.shawndrost').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('shawndrost');
        });
      } else if (tweet.user === 'dirtyrick') {
        $('.dirtyrick').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('dirtyrick');
        });
      } else if (tweet.user === 'mortysmith') {
        $('.mortysmith').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('mortysmith');
        });
      } else if (tweet.user === 'queenelizabeth') {
        $('.queenelizabeth').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('queenelizabet');
        });
      }
      $userName.appendTo($tweet);
      if (tweet.postedBy) {
        $xtraPhoto.appendTo($tweet);
        $poster.appendTo($tweet);
      }
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $('.comment').mouseenter(function(e) {
        $(this).css('background-color', 'blue');
      });
      $('.comment').mouseleave(function(e) {
        $(this).css('background-color', 'dodgerblue');
      });
      $('.retweet').mouseenter(function(e) {
        $(this).css('background-color', 'blue');
      });
      $('.retweet').mouseleave(function(e) {
        $(this).css('background-color', 'dodgerblue');
      });
      // $('.retweet').on('click', function(e) {
      //   retweet($(this).siblings('.message').text(), $(this).siblings('.username').text().slice(1));
      // });
      $('.like').mouseenter(function(e) {
        $(this).css('background-color', 'blue');
      });
      $('.like').mouseleave(function(e) {
        $(this).css('background-color', 'dodgerblue');
      });
      $('.like').on('click', function(e) {
        $(this).css('transform', 'scale(1.25)');
        $(this).css('color', 'red');
      });
      $('.like').on('dblclick', function(e) {
        $(this).css('transform', 'scale(1.00)');
        $(this).css('color', 'white');
      });
      $('.share').mouseenter(function(e) {
        $(this).css('background-color', 'blue');
      });
      $('.share').mouseleave(function(e) {
        $(this).css('background-color', 'dodgerblue');
      });
      $iconC.appendTo($tweet);
      $iconR.appendTo($tweet);
      $iconL.appendTo($tweet);
      $iconS.appendTo($tweet);
      // $commentDiv.appendTo($tweet);
      $commentForm.appendTo($tweet);
      $('.commentSubmit').hide();
      $commentButton.appendTo($tweet);
      $tweet.appendTo($homeFeed);
    }
  }

  function clearFeed() {
    if ($homeFeed.length > 0) {
      for (var i = 0; i < $homeFeed.length; i++) {
        $('#feed .tweet').remove();
      }
    }
  }

  function renderUserFeed(user) {
    clearFeed();
    $("#update-feed").text("Back");
    renderTweets(user);
    $('.username').hover(function(e) {
      $(this).css('border-right', '3px ridge blue');
      $(this).css('border-bottom', '4px ridge blue');
      $(this).css('color', 'red');
    }, function(e) {
      $(this).css('border-right', '0px ridge blue');
      $(this).css('border-bottom', '0px ridge blue');
      $(this).css('color', 'blueviolet');
    });
    $('.comment').on('click', function(e) {
      $(this).siblings('.commentForm').slideDown(250)
      $(this).siblings('.commentSubmit').show();
    });
    $('.comment').on('dblclick', function(e) {
      $(this).siblings('.commentForm').slideUp(250)
      $(this).siblings('.commentSubmit').hide();
    });
    $('.commentSubmit').on('click', function(e) {
      var com = $(this).siblings('.commentForm').children('input').val();
      var par = $(this).parent();
      console.log('com:   ', com);
      console.log('parent:   ', par);
      var $commentDiv = $('<div class="commentDiv"></div>');
      var $photo = $('<img class="profile-photo" src="assets/img/fsociety.png">');
      var $user = $('<span class="username">@fsociety</span>');
      var $comment = $('<p class="message">' + com + '</p>');
      var $time = $('<div class="timestamp">' + $.timeago(new Date()) + '</div>');
      var $iconLike = $("<i class='icon like far fa-thumbs-up fa-2x'></i>");
      $iconLike.on('click', function(e) {
        $(this).css('transform', 'scale(1.25)');
        $(this).css('color', 'red');
      });
      $iconLike.on('dblclick', function(e) {
        $(this).css('transform', 'scale(1.00)');
        $(this).css('color', 'white');
      });
      $photo.appendTo($commentDiv);
      $user.appendTo($commentDiv);
      $comment.appendTo($commentDiv);
      $time.appendTo($commentDiv);
      $iconLike.appendTo($commentDiv);
      $commentDiv.appendTo(par);
      $(this).hide();
      $(this).siblings('.commentForm').slideUp(250);
    });
    $('.commentSubmit').hide();
    $('.profile-photo').on('click', function(e) {
      var who = $(this).siblings('.username').text().slice(1);
      var user = $(this).siblings('.' + who).text().slice(1);
      window.open('file:///Users/mitchwintrow/Documents/mrrobotisreal/seip2202-twiddler/assets/img/' + user +'.png');
    });
    $('.share').on('click', function(e) {
      var textarea = document.createElement('textarea');
      textarea.textContent = 'file:///Users/mitchwintrow/Documents/mrrobotisreal/seip2202-twiddler/index.html';
      document.body.appendChild(textarea);
      var selection = document.getSelection();
      var range = document.createRange();
    //  range.selectNodeContents(textarea);
      range.selectNode(textarea);
      selection.removeAllRanges();
      selection.addRange(range);
      console.log('copy success', document.execCommand('copy'));
      alert('URL has successfully been copied, thanks for sharing!');
      selection.removeAllRanges();
      document.body.removeChild(textarea);
    });
    $('.retweet').on('click', function(e) {
      retweet($(this).siblings('.message').text(), $(this).siblings('.username').text().slice(1));
    });
  }

  function renderFSociety() {
    var theUser = $('.toUser').val();
    var theMessage = $('#message-input').val();
    var tweet = {};
    tweet.user = theUser;
    tweet.message = theMessage;
    tweet.created_at = new Date();
    tweet.profilePhotoURL = './assets/img/' + theUser + '.png';
    tweet.postedBy = 'fsociety';
    streams.home.push(tweet);
    streams.users[theUser].push(tweet);
    renderFeed();
  }

  function renderFriendsList() {
    var $friend;
    for (var user in streams.users) {
      $friend = $('<li class="friend">@' + user + '</li>');
      $friend.hover(function(e) {
        $(e.target).css('border-bottom', '8px blue ridge');
      }, function(e) {
        $(e.target).css('border-bottom', '2px blue ridge');
      });
      if (user === 'shawndrost') {
        $friend.click(function(e) {
          renderUserFeed('shawndrost');
        });
      } else if (user === 'sharksforcheap') {
        $friend.click(function(e) {
          renderUserFeed('sharksforcheap');
        });
      } else if (user === 'johnwick') {
        $friend.click(function(e) {
          renderUserFeed('johnwick');
        });
      } else if (user === 'douglascalhoun'){
        $friend.click(function(e) {
          renderUserFeed('douglascalhoun');
        });
      }
      else if (user === 'dirtyrick'){
        $friend.click(function(e) {
          renderUserFeed('dirtyrick');
        });
      } else if (user === 'mortysmith'){
        $friend.click(function(e) {
          renderUserFeed('mortysmith');
        });
      } else if (user === 'queenelizabeth'){
        $friend.click(function(e) {
          renderUserFeed('queenelizabeth');
        });
      }
      $friend.appendTo($friendsList);
    }
  }

  function retweet(message, user) {
    var tweet = {};
    tweet.user = 'fsociety';
    tweet.message = message;
    tweet.created_at = new Date();
    tweet.profilePhotoURL = './assets/img/fsociety.png';
    tweet.postedBy = user;
    streams.home.push(tweet);
    // streams.users[tweet.user].push(tweet);
    renderFeed();
  }

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', function(e) {
    console.log(e);
    alert('The title of this page is: ' + event.target.innerText);
  });
  $button.on("click", function(e) {
    console.log('The feed has been refreshed');
    if ($("#update-feed").val().indexOf('Update Feed') === -1) {
      $("#update-feed").text('Update Feed');
    }
    renderFeed();
  });
  $button.hover(function(e) {
    $(e.target).css('background-color', 'blue');
  }, function(e) {
    $(e.target).css('background-color', 'dodgerblue');
  });
  $tweetButton.on('click', function(e) {
    renderFSociety();
  });
  $tweetButton.hover(function(e) {
    $(e.target).css('background-color', 'blue');
  }, function(e) {
    $(e.target).css('background-color', 'dodgerblue');
  });

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $friendsListDiv.appendTo($app);
  $friendsListTitle.appendTo($friendsListDiv);
  $friendsList.appendTo($friendsListDiv);
  $tweetDiv.appendTo($app);
  $tweetPic.appendTo($tweetDiv);
  $visitorName.appendTo($tweetDiv);
  $tweetForm.appendTo($tweetDiv);
  $tweetButton.appendTo($tweetForm);
  $button.appendTo($app);
  $homeFeed.appendTo($app);


  renderFriendsList();
  renderFeed();
  window.isItBeautifulYet = true;

  // $('.retweet').on('click', function(e) {
  //   retweet($(this).siblings('.message').text(), $(this).siblings('.username').text().slice(1));
  // });

});