$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Create an h1 element with the text "Twiddler"
  var $title = $('<h1>Twiddler</h1>');
  // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);

  // Set a click event listener on the h1 element
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  // button
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  $button.on('click', function(event) {
    // Remove all previously existing Tweets from the Feed
    $("div.tweet").remove();

    renderFeed();
  });

  // $(document).ready(function() {
  //   $('#update-feed').click(function() {
  //     $(this).html('Back');
  //   })
  // })

  $button.appendTo($app);

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo('#app');



  var renderFeed = function () {
    for (var i = streams.home.length - 1; i >= 0; i--) {
      // Create a new Tweet UI component
      var tweet = streams.home[i];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.html(
        '<img src="' + tweet.profilePhotoURL + '" class="profile-photo">'
      + '<div class="username">' + '@' + tweet.user + '</div>'
      + '<div class="message">' + tweet.message + '</div>'
      + '<div class="timestamp" src="./lib/timeago.js">' + jQuery.timeago(tweet.created_at) + '</div>'
      + '<i class="icon comment fa-solid fa-comment"></i>'
      + '<i class="icon retweet fa-solid fa-retweet"></i>'
      + '<i class="icon like fa-solid fa-thumbs-up"></i>'
      + '<i class="icon share fa-solid fa-share"></i>');
    $tweet.appendTo($feed);

    $("i").hover(function () {
      $(this).css("color", "blue");
    }, function () {
      $(this).css("color", "");
    });
      handleUsernameClick();
    }
  }

  var handleUsernameClick = function () {
    $(".username").on("click", function() {
      $("div.tweet").remove();
      $("#update-feed").text("Back");
      console.log($("#update-feed").text());
      var thisName = $(this).text().substring(1, this.length);
      console.log(thisName);
      // var userNameArr = streams.users[thisName];
      for (var j = streams.users[thisName].length - 1; j >= 0; j--) {
        var specific = streams.users[thisName][j];
        var $tweet = $('<div class="tweet"></div>');
        $tweet.html(
          '<img src="' + specific.profilePhotoURL + '" class="profile-photo">'
          + '<div class="username">' + '@' + specific.user + '</div>'
          + '<div class="message">' + specific.message + '</div>'
          + '<div class="timestamp" src="./lib/timeago.js">' + jQuery.timeago(specific.created_at) + '</div>'
          + '<i class="icon comment fa-solid fa-comment"></i>'
          + '<i class="icon retweet fa-solid fa-retweet"></i>'
          + '<i class="icon like fa-solid fa-thumbs-up"></i>'
          + '<i class="icon share fa-solid fa-share"></i>');

        $tweet.appendTo($feed);
      }
      $("#update-feed").on("click", function (event) {
        if ($(this).text() === "Back") {
          $(this).text("Update Feed");
        }
      });

        $("i").hover(function () {
          $(this).css("color", "black");
        }, function () {
          $(this).css("color", "blue");
        });
      }
    );
  };

  renderFeed();

});