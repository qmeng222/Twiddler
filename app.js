// $(document).ready(function(){
// // Select already existing elements
//   var $app = $('#app');
//   var feedDiv = $('#feed');
//   var $tweets = $('.tweet');

// // Create new HTML elements
//   var $title = $('<h1>Twiddler</h1>');
//   var $feedDiv = $('<div id="feed"></div>');
//   var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
//   var $tweetImg = $('<img id="profile-photo">');
//   var $username = $('<span id="username"></span>');


// // Create event handler functions
//   var renderFeed = function() {
//     $feedDiv.text('');
//     var index = streams.home.length - 1;
//     while (index >= 0) {
//       var tweet = streams.home[index];
//       var $tweet = $('<div class="tweet"></div>');
//       $tweet.text('@' + tweet.user + ': ' + tweet.message);
//       $tweet.appendTo('#feed');
//       index--;
//     }
//   };
//   renderFeed();

// // Set event listeners (providing appropriate handlers as input)
//   $updateFeedButton.on('click', renderFeed);


// // Append new HTML elements to the DOM
//   $title.appendTo($app);
//   $feedDiv.appendTo($app);
//   $updateFeedButton.insertAfter($title);
//   $tweets.append($tweetImg);

// });

///////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

    // create and append app div
    var $app = $('#app');
    var $title = $('<h1>Twiddler</h1>');
    $title.appendTo($app);

    // create and append feed div
    var feedDiv = $('#feed');
    var $feedDiv = $('<div id="feed"></div>');
    $feedDiv.appendTo($app);

    // create and append update feed button
    var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
    $updateFeedButton.insertAfter($title);

    //timeago setup
    jQuery('.timeago').timeago();
    $('.timestamp').on('click', function() {
      $('.timeago').timeago('update', new Date());
    });
    jQuery.timeago.settings.allowFuture = true;

    // renders the updated feed with tweets in appropriate format
    var renderFeed = function() {


      $feedDiv.text('');
      var index = streams.home.length - 1;
      while (index >= 0) {

        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        $tweet.appendTo('#feed');

        var $tweetImg = $('<img class="profile-photo">');
        var profilePhotos = {
          'douglascalhoun': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/douglascalhoun.png',
          'mracus': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/mracus.png',
          'sharksforcheap': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/sharksforcheap.png',
          'shawndrost': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/shawndrost.png',
          'visitor': '/Users/laurenanderson/Documents/Hack Reactor - Precourse/seip2202-twiddler/assets/img/visitor.png'
        };
        var imgSrc = profilePhotos[tweet.user];
        $tweetImg.attr('src', imgSrc);
        $tweet.append($tweetImg);

        var $user = $('<span class="username"></span>');
        $tweet.append($user);
        $user.text('@' + tweet.user);

        var $message = $('<p class="message"></p>');
        $tweet.append($message);
        $message.text(tweet.message);

        var $timestamp = $('<time class="timestamp timeago"></time>');
        $tweet.append($timestamp);
        $timestamp.text(jQuery.timeago(new Date()));

        var $commentIcon = $('<i id="comment-icon" class="icon comment fas fa-comment"></i>');
        $tweet.append($commentIcon);

        var $retweetIcon = $('<i id="retweet-icon" class="icon retweet fas fa-retweet"></i>');
        $tweet.append($retweetIcon);

        var $likeIcon = $('<i id="like-icon" class="icon like fas fa-heart"></i>');
        $tweet.append($likeIcon);

        var $shareIcon = $('<i id="share-icon" class="icon share fas fa-share"></i>');
        $tweet.append($shareIcon);

        index--;
      }
    };

    // execute renderFeed to load tweets on the landing page
    renderFeed();

    // add click event to update feed button
    $updateFeedButton.on('click', renderFeed);

    // add hover event to change icon color
    var $icons = $('.icon');
    $icons.hover(function() {
      $(this).css('color', 'lightgray');
    }, function() {
      $(this).css('color', 'black');
    });



















  });
