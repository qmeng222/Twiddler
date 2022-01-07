/********** READ ME. IMPORTANT! *********
1. UI design: https://miro.com/app/board/uXjVOaerIUM=/?invite_link_id=348026499896
2. structure:
window {}
  -users ['shawndrost', 'sharksforcheap', 'mracus', 'douglascalhoun']

  -streams {}
    -home [0: {user: 'douglascalhoun', message: 'ddd', created_at: Sat Jan 01 2022 15:34:58},
           1: {user: 'shawndrost', message: 'sss', created_at: Sat Jan 01 2022 15:34:58},
            ......
          ]

    -users {douglascalhoun: [0: {user: 'douglascalhoun', message: 'ddd1', created_at: Sat Jan 01 2022 15:34:58},
                             1: {user: 'douglascalhoun', message: 'ddd2', created_at: Sat Jan 01 2022 15:34:58},
                             ......
                            ],

            mracus:         [0: {user: 'mracus', message: 'mmm1', created_at: xxx},
                             1: {user: 'mracus', message: 'mmm2', created_at: xxx},
                             ......
                            ],
            ......
           }
*/

$(document).ready(function() {
  var $app = $('#app');
  $app.html(''); // jQuery html() method set the content (innerHTML) of all $app elements to an empty str

  // 1. title
  var $title = $('<h1 id="title">Twiddler</h1>');
  $title.appendTo($app);
  // $title.on("click", function(event) {
  //   alert('The title of this page is: ' + event.target.innerText);
  // });

  // 2. flex-container
  var $flexContainer = $('<div id="flex-container"></div>');
  $flexContainer.appendTo($app);

  // 2. 1 panel
  var $panel = $('<div id="panel"></div>');
  $panel.appendTo($flexContainer);

  // 2.1.1 #update-feed btn
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  $updateFeed.appendTo($panel);

  $updateFeed.on('click', function() {
    if ($updateFeed.text() === 'Back') {
      $updateFeed.text('Update Feed');
    }
    renderFeed();
  });

  // 2. 1. 2 new-tweet-form
  var newTweetForm = function() {
    var $newTweetForm = $('<form id="new-tweet-form" method="post" type="submit"></form>');
    var $newTweetHeadr = $('<h2 id="new-tweet-header" style="font-family: Arial, Helvetica, sans-serif; font-style: italic; font-weight: lighter">New Tweet</h2>'); // syntax: style="property1: value1; property2: value2"
    var $labelUsername = $('<label id="new-tweet-username" for="username">Username:</label><br>');
    var $inputUsername = $('<input id="username" type="text" name="username" placeholder="username" required><br><br>'); // name attribute of "usename" is not required, only asked by the HR automated test software
    var $labelTweet = $('<label id="new-tweet-msg" for="msn">Tweet Message:</label><br>');
    var $inputTweet = $('<input id="msn" type="text" name="message" placeholder="what\'s happening?" required></input><br><br>'); // <textarea></textarea> is also applicable here
    var $tweetBtn = $('<button id="tweet-btn" type="submit">Post Tweet</button>');

    $newTweetForm.appendTo($panel);
    $newTweetHeadr.appendTo($newTweetForm);
    $labelUsername.appendTo($newTweetForm);
    $inputUsername.appendTo($newTweetForm);
    $labelTweet.appendTo($newTweetForm);
    $inputTweet.appendTo($newTweetForm);
    $tweetBtn.appendTo($newTweetForm);

    $newTweetForm.submit(function(event) { // Form submit() method, syntax: formObject.submit()
      // console.log(event);
      event.preventDefault();
      window.visitor = $inputUsername.val(); // window.visitor: undefined --> the text inputed
      // val() method "returns" or "sets" the value attribute of the selected elements
      writeTweet($inputTweet.val()); // writeTweet is defined by dataGenerator.js

      renderFeed();
      populateFriendsList();
      $inputUsername.val(''); // reset inputUsername & inputTweet to blank
      $inputTweet.val('');
    });
  }
  newTweetForm();

  // 2. 1. 3 friends list
  var $friendsListHeader = $('<h2 id="friends-list-header">Friends List</h2>');
  $friendsListHeader.appendTo($panel);

  var $friendsList = $('<ul id="friends-list"></ul>');
  $friendsList.appendTo($panel);

  var populateFriendsList = function() {
    $friendsList.empty(); // avoid duplicate "Friends List" after refreshing with new tweet
    for (var username in window.streams.users) {
      $friend = $('<li class="friend username"></li>'); // multiple classes: .friend for identifying, .username for hover effects
      $friend.text('@' + username).appendTo($friendsList);

      $friend.on('click', function() {
        $updateFeed.text('Back');
        var clickedUsername = jQuery(this).text().slice(1); // slice(1): @mracus --> mracus
        renderIndivFeed(clickedUsername);
      });
    }
  };
  populateFriendsList(); // call function above

  // 2. 2 feed
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($flexContainer);

  // tweet
  var renderFeed = function() {
    $feed.empty();
    var index = streams.home.length - 1;
    while(index >= 0) {
      var tweet = streams.home[index]; /*********/

      var $tweet = $('<div class="tweet"></div>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);

      // all about user: avatar(profile photo) + username
      var $allAboutUser = $('<div class="all-about-user"></div>');
      $allAboutUser.appendTo($tweet);

      // profile-photo
      var urlBegin = "assets/img/";
      var urlEnd = ".png";
      var url = urlBegin + tweet.user + urlEnd;

      if (window.users.includes(tweet.user)) {
        // console.log(window.users);
        var $profilePhoto = $('<img class="profile-photo" src="'+url+'" width="60" height="60">');
      } else {
        var $profilePhoto = $('<img class="profile-photo" src="assets/img/visitor.png" width="60" height="60">');
      }
      $profilePhoto.appendTo($allAboutUser);

      var $userName = $('<div class="username"></div>');
      // return text content: $(selector).text()
      // set text content: $(selector).text(content)
      $userName.text('@' + tweet.user).appendTo($allAboutUser);

      $userName.click(function(event) {
        $updateFeed.text('Back');
        var clickedUsername = jQuery(this).text().slice(1); // slice(1): @mracus --> mracus
        renderIndivFeed(clickedUsername);
      });

      // all about tweet: message + tweet-footer (for icons & timestamp)
      var $allAboutTweet = $('<div class="all-about-tweet"></div>');
      $allAboutTweet.appendTo($tweet);

      var $message = $('<div class="message"></div>');
      $message.text(tweet.message).appendTo($allAboutTweet);

      var $tweetFooter = $('<div class="tweet-footer"></div>');
      $tweetFooter.appendTo($allAboutTweet);

      var $comment= $('<i class="comment far fa-comment-dots" aria-hidden="true"></i>');
      $comment.appendTo($tweetFooter);

      var $retweet= $('<i class="retweet fas fa-retweet" aria-hidden="true"></i>');
      $retweet.appendTo($tweetFooter);

      var $like= $('<i class="like far fa-heart" aria-hidden="true"></i>');
      $like.appendTo($tweetFooter);

      var $share= $('<i class="share far fa-share-square" aria-hidden="true"></i>');
      $share.appendTo($tweetFooter);

      var $timeStamp = $('<span class="timestamp"></span>');
      $timeStamp.appendTo($tweetFooter);
      $timeStamp.text(jQuery.timeago(tweet.created_at)).appendTo($tweetFooter);

      index -= 1;
    }
  }
  renderFeed();

  // render tweets of a single user
  var renderIndivFeed = function(specificUser) {
    $feed.empty();
    var indivTweets = streams.users[specificUser];
    var index = indivTweets.length - 1;
    while(index >= 0) {
      var tweet = indivTweets[index]; /*********/

      var $tweet = $('<div class="tweet"></div>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);

      // all about user: avatar(profile photo) + username
      var $allAboutUser = $('<div class="all-about-user"></div>');
      $allAboutUser.appendTo($tweet);

      var urlBegin = "assets/img/";
      var urlEnd = ".png";
      var url = urlBegin + tweet.user + urlEnd;

      if (tweet.user === 'visitor') {
        var $profilePhoto = $('<img class="profile-photo" src="'+url+'" width="60" height="60">');
      } else {
        var $profilePhoto = $('<img class="profile-photo" src="assets/img/visitor.png" width="60" height="60">');
      }
      $profilePhoto.appendTo($allAboutUser);

      var $userName = $('<div class="username"></div>');
      // return text content: $(selector).text()
      // set text content: $(selector).text(content)
      $userName.text('@' + tweet.user).appendTo($allAboutUser);

      // all about tweet: message + tweet-footer (for icons & timestamp)
      var $allAboutTweet = $('<div class="all-about-tweet"></div>');
      $allAboutTweet.appendTo($tweet);

      var $message = $('<div class="message"></div>');
      $message.text(tweet.message).appendTo($allAboutTweet);

      var $tweetFooter = $('<div class="tweet-footer"></div>');
      $tweetFooter.appendTo($allAboutTweet);

      var $comment= $('<i class="comment far fa-comment-dots" aria-hidden="true"></i>');
      $comment.appendTo($tweetFooter);

      var $retweet= $('<i class="retweet fas fa-retweet" aria-hidden="true"></i>');
      $retweet.appendTo($tweetFooter);

      var $like= $('<i class="like far fa-heart" aria-hidden="true"></i>');
      $like.appendTo($tweetFooter);

      var $share= $('<i class="share far fa-share-square" aria-hidden="true"></i>');
      $share.appendTo($tweetFooter);

      var $timeStamp = $('<span class="timestamp"></span>');
      $timeStamp.appendTo($tweetFooter);
      $timeStamp.text(jQuery.timeago(tweet.created_at)).appendTo($tweetFooter);

      index -= 1;
    }
  }

  window.isItBeautifulYet = true; // I'm satisfied with how my page looks

});