
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

  //************************** HTML ******************************/
  // Header for styling
  $('#app').append(
    '<div class="top"><div class="title"><div class="logo"><i class="fa fa-solid fa-spinner"></i></div><h1>Twiddler</h1><div class="clear"></div></div></div>')

  // Middle Main Content for styling
  $('#app').append('<div class="middle"><div class="middle-content"></div></div>');
  $('.middle-content').append('<div class="left"><div class="left-content"></div></div>');
  $('.middle-content').append('<div class="right"><div class="right-content"></div></div>');
  $('.right-content').append('<div id="feed"></div>');

  // Update feed button
  $('.left-content').append('<button id="update-feed" type="button">Update Feed</button>');

  // New post
  $('.left-content').append('<div class="form"><h2>New Post</h2><div id="new-tweet-form"></div><div class="friends"><h2>Friends List</h2></div></div>');
  $('#new-tweet-form').append([
    $('<div/>', {
      'class': 'form-username'
    }).append([
      $('<label/>', {
        'for': 'name'
      }).append('Username'),
      $('<input/>', {
        'id': 'username',
        'type': 'text',
        'name': 'username'
      })
    ]), $('<div/>', {
      'class': 'form-tweet-message'
    }).append([
      $('<label/>', {
        'for': 'message'
      }).append('Tweet Message'),
      $('<input/>', {
        'id': 'message',
        'type': 'text',
        'name': 'message'
      })
    ]),
    $('<button/>', {
      'id': 'submit',
      'type': 'button'
    }).append('Post Tweet')
  ]);

  // Friends List
  $('.friends').append('<ul id="friends-list"></ul>')

  // Bottom section for styling
  $('#app').append('<div class="bottom"><h4>Designed by JP</h4></div>')
  //**************************************************************/

  var $app = $('#feed');
  $app.html('');
  $app.append('<div id="feed"></div>')

  // Tweets generator
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

      // Friends List
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
          'src': 'assets/icons/placeholder.png'
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
    // Clear input text
    $('#username').val('');
    $('#message').val('');
    $("time.timestamp").timeago();
  });

  // Update Feed button click event
  $('#update-feed').on('click', function () {
    newTweet();
    $('#update-feed').html('Update Feed');
  });

  // Button toggle function
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