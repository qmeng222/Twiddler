$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1 id="title">Twiddler</h1>');
  var $updatefeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  function update() {
    $('#update-feed').text('Update Feed');
    render();
  }

  function user(user) {
    $('#update-feed').text('Back');
    render(user.data);
  }

  $updatefeed.on("click", update);

  $title.appendTo($app);
  $updatefeed.appendTo($app);
  $feed.appendTo($app);

  var render = function(user) {
    $feed.empty();
    var data = [];
    if (user) {
      alert("clicked user");
      data = streams.users[user];
    } else {
      data = streams.home;
    }
    var index = data.length - 1;
    while(index >= 0){
      var tweet = data[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
  }
  render();
});