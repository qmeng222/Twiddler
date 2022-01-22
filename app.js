$(document).ready(function(){
  var $app = $('#app');
  jQuery("time.timeago").timeago();
  window.visitor = "Visitor";

  var $glass = $('<main class="glass"></main>').appendTo($app);

  //Dashboard Selectors
  var $dashboard = $('<section class="dashboard"></section>').appendTo($glass);
  // var $buttonMenu = $('<div class="menu"></div>').appendTo($dashboard);
  var $updateFeedBtn = $('<button id="update-feed"></button>').text('Update Feed').appendTo($dashboard);
  // var $friendListBtn = $('<button id="btn-friend-list"></button>').text('Friend List').appendTo($buttonMenu);
  var $friendList = $('<ul id="friends-list"></ul>').text('Friend\'s List').appendTo($dashboard);

  //Form
  var $draggableDiv = $('<div id="draggable"></div>').appendTo($dashboard);
  var $addTweet = $('<form id="new-tweet-form"></form>').appendTo($draggableDiv);
  $('<label for="username"></label>').text('Username').appendTo($addTweet);
  var $usernameInput = $('<input id="username" name="username" label="username" type="text" placeholder="hackreactor" /><br>').appendTo($addTweet);
  $('<label for="message"></label>').text('Tweet').appendTo($addTweet);
  var $tweetInput = $('<input id="message" type="text" name="message" label="message" placeholder="What\'s on your mind?" />').appendTo($addTweet);
  var $formButton = $('<button class="form-submit"></button>').text('Post').appendTo($addTweet);

  // Feed Selectors
  var $feed = $('<section id="feed"></section>').appendTo($glass);
  var $title = $('<h1 id="title"></h1>').text('Twiddler 2.0').appendTo($feed);
  var $cards = $('<div id="cards"></div>').appendTo($feed)

  //Helper Function to populate friend's list
  var renderFriendList = function(newUser){
    $('#friends-list').empty().text('Friend\'s List');
    users.forEach(function(friend) {
      var $friend = $('<li class="friend username"></li>');
      $friend.text('@' + friend);
      $friend.appendTo($friendList);
    });

    if (newUser){
      $('<li class="friend username"></li>').text('@' + newUser).appendTo($friendList);
    }
  }

  //Helper Function to generate feed
  var renderFeed = function(user){
    var tweet;

    if(user){
      user = user.slice(1);
      $cards.empty();
      tweet = streams.users[user];
      $updateFeedBtn.toggleClass('highlighted');
      $('.highlighted').text('Back');
    } else {
      tweet = streams.home;
    }

    var index = tweet.length - 1;
    while(index >= 0){
        var $tweet = $('<div class="tweet"></div>');
        var $profilePhoto = $('<div class="circular--portrait"></div>').html('<img class="profile-photo" src="' + tweet[index].profilePhotoURL + '" />').appendTo($tweet);
        var $cardInfo = $('<div class="card-info"></div>').appendTo($tweet);
        var $username = $('<span class="username"></span>').text('@' + tweet[index].user).appendTo($cardInfo);
        var $timestamp = $('<time class="timestamp timeago"></time>').text(jQuery.timeago(tweet[index].created_at)).appendTo($cardInfo);
        var $message = $('<div class="message"></div>').text(tweet[index].message).appendTo($cardInfo);
        var $icons = $('<div class="icons"></div>').html('<i class="far fa-heart like"></i><i class="far fa-comment comment"></i><i class="fas fa-retweet retweet"></i><i class="far fa-share-square share"></i>').appendTo($cardInfo);
        $tweet.appendTo($cards);
      index --;
    }

    renderFriendList();

    $(".username").click(function (event) {
      event.preventDefault();
      var userClicked = event.target.innerText;

      renderFeed(userClicked);
    });
  }

  //Event Handler Function
  var buttonHandler = function(event) {
    event.preventDefault();
    $cards.empty();
    $updateFeedBtn.text('Update Feed');
    renderFeed();
  }

  //Update Feed event handler
  $updateFeedBtn.click(buttonHandler);

  //Form event handler
  $formButton.click(function(event){
    event.preventDefault();
    var newUser = $usernameInput.val();
    var message =  $tweetInput.val();

    window.visitor = newUser;
    streams.users[newUser] = [];
    // users.push(newUser);

    $usernameInput.val('');
    $tweetInput.val('');

    writeTweet(message);
    renderFeed();
    renderFriendList(newUser);
  })

  // Draggable tweet form
  $( function() {
    $( "#draggable" ).draggable();
  } );

  renderFeed();
});

window.isItBeautifulYet = true;