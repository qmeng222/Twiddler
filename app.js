
$(document).ready(function () {

  // Convert current timezone to UTC timezone
  // **** codes copied from timeago.js configuration examples ****
  var zeropad = function (num) {
    return ((num < 10) ? '0' : '') + num;
  };
  var iso8601 = function (date) {
    return date.getUTCFullYear()
      + "-" + zeropad(date.getUTCMonth() + 1)
      + "-" + zeropad(date.getUTCDate())
      + "T" + zeropad(date.getUTCHours())
      + ":" + zeropad(date.getUTCMinutes())
      + ":" + zeropad(date.getUTCSeconds()) + "Z";
  };

  // Tweets generator
  var $app = $('#feed');
  $app.html('');

  var newTweet = function (event) {

    // Eliminate Duplicates
    var seen = {};
    $('.message').each(function () {
      var text = $(this).text();
      seen[text] = true;
    });


    var index = 0;
    while (index <= streams.home.length - 1) {
      var tweet = streams.home[index];

      // Structure and Data:
      var $tweet = $('<div/>', { 'class': 'tweet' }).append([
        $('<div/>', { 'class': 'photo' }).append([

          $('<img/>', {
            'class': 'profile-photo',
            'src': './assets/img/' + tweet.user + '.png'
          })
        ]),
        $('<div/>', { 'class': 'username' }).append('@' + tweet.user),
        $('<div/>', { 'class': 'message' }).append('<div>' + tweet.message + '</div>'),
        $('<div/>', {
          'class': 'timeago',
        }).append([
          $('<time/>', {
            'class': 'timestamp',
            'datetime': iso8601(tweet.created_at)
          })
        ]),
        // FontAwesome icons
        $('<div/>', { 'class': 'icon' }).append([
          $('<i/>', {
            'class': 'fa fa-solid fa-comment-dots comment',
          }),
          $('<i/>', {
            'class': 'fa fa-solid fa-retweet retweet',
          }),
          $('<i/>', {
            'class': 'fa fa-solid fa-heart like',
          }),
          $('<i/>', {
            'class': 'fa fa-solid fa-share share'
          }),
        ])
      ]);

      if (seen[tweet.message]) {
        index++;
      } else {
        $app.prepend($tweet);
        seen[tweet.message] = true
        index++;
      }


      // Friend List
      $('#friends-list').append('<li>' + tweet.user + '</li>');
      var friend = {};
      $('#friends-list > li').each(function () {
        var name = $(this).text();
        if (friend[name]) {
          $(this).remove();
        } else {
          friend[name] = true;
        }
      });
    };


    $('#friends-list > li').on('click', function (event) {

      var usernameClicked = '@' + event.target.innerHTML;
      console.log(usernameClicked)
      $('.username').each(function (item) {
        if (this.innerHTML !== usernameClicked) {
          $(this).parent().remove()
        }
      })
      handleUsernameClick();
    });



    // Timestamp
    $("time.timestamp").timeago();

    // Changes Colors when mouse over a icon
    $('.icon > .fa').mouseenter(function () {
      $(this).css('color', '#fdb084')
    })
      .mouseleave(function () {
        $(this).css('color', '#f64c67')
      })

    // UserFeed
    $('.username').on('click', function (event) {
      var usernameClicked = event.target.innerHTML;
      $('.username').each(function (item) {
        if (this.innerHTML !== usernameClicked) {
          $(this).parent().remove()
        }
      })
      handleUsernameClick();
    });


  }
  newTweet();


    // Add new Post
    $('#submit').on('click', function () {

      var $tweet = $('<div/>', { 'class': 'tweet' }).append([
        $('<div/>', { 'class': 'photo' }).append([

          $('<img/>', {
            'class': 'profile-photo',
            'src':'assets/icons/placeholder.png'
          })
        ]),
        $('<div/>', { 'class': 'username' }).append('@' + $('#username').val()),
        $('<div/>', { 'class': 'message' }).append('<div>' + $('#message').val() + '</div>'),
        $('<div/>', {
          'class': 'timeago',
        }).append([
          $('<time/>', {
            'class': 'timestamp',
            'datetime': iso8601(new Date())
          })
        ]),
        // FontAwesome icons
        $('<div/>', { 'class': 'icon' }).append([
          $('<i/>', {
            'class': 'fa fa-solid fa-comment-dots comment',
          }),
          $('<i/>', {
            'class': 'fa fa-solid fa-retweet retweet',
          }),
          $('<i/>', {
            'class': 'fa fa-solid fa-heart like',
          }),
          $('<i/>', {
            'class': 'fa fa-solid fa-share share'
          }),
        ])
      ]);
      $app.prepend($tweet);
      $('#username').val('');
      $('#message').val('');
      $("time.timestamp").timeago();
    });


  // Update Feed button click event
  $('#update-feed').on('click', function () {
    newTweet();
    $('#update-feed').html('Update Feed');
  });

  //Toggle function
  var handleUsernameClick = function () {
    var inputTxt = $('#update-feed').html()
    if (inputTxt === 'Update Feed') {
      $('#update-feed').html('Back');
    }
  }

  // Changes Colors when mouse over a button
  $('button').mouseenter(function () {
    $(this).css('background-color', '#fdb084')
  })
    .mouseleave(function () {
      $(this).css('background-color', '#f64c67')
    })


});

window.isItBeautifulYet = true