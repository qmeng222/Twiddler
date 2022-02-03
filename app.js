$(document).ready(function(){
//Select existing elements
  var $app = $('#app');
  $app.html('');

//create new HTML elements
  var $title = $('<h1 id="title">Twiddler</h1>');
  var $banner = $('<img class=banner src=https://blog.flamingtext.com/blog/2022/02/03/flamingtext_com_1643863193_863162179.png>');
  var $updatefeed = $('<button id="update-feed"></button>');
  var $mracusfeed = $('<button id="mracus-feed"></button>');
  var $sharksforcheapfeed = $('<button id="sharksforcheap-feed"></button>');
  var $douglascalhounfeed = $('<button id="douglascalhoun-feed"></button>');
  var $shawndrostfeed = $('<button id="shawndrost-feed"></button>');
  var $feed= $('<div id="feed"></div>');

//create event handler functions
  var handleMracusClick = function(event) {
    $("div.sharksforcheap").remove();
    $("div.douglascalhoun").remove();
    $("div.shawndrost").remove();
    $updatefeed.text('Back');
  };
  var handleSharksforcheapClick = function(event) {
    $("div.mracus").remove();
    $("div.douglascalhoun").remove();
    $("div.shawndrost").remove();
    $updatefeed.text('Back');
  };
  var handleDouglascalhounClick = function(event) {
    $("div.mracus").remove();
    $("div.sharksforcheap").remove();
    $("div.shawndrost").remove();
    $updatefeed.text('Back');
  };
  var handleShawndrostClick = function(event) {
    $("div.mracus").remove();
    $("div.sharksforcheap").remove();
    $("div.douglascalhoun").remove();
    $updatefeed.text('Back');
  };

  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }
  var updatefeed = function(event) {
    $("#feed").empty();
    var fortweet = streams.home[index];
    renderFeed();
  };
  var renderFeed = function() {
    var index = 0;
    while(streams.home[index] !== undefined){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet ' + tweet.user + '"></div>');
      $feed.prepend($tweet);
      $('<img class=profile-photo src=assets/img/' + tweet.user + '.png>').appendTo($tweet);

      if (tweet.user === 'douglascalhoun') {
        var $douglasbutton = $('<div class=username id=douglascalhoun>@' + tweet.user + '</div>');
        $douglasbutton.appendTo($tweet);
        $("#douglascalhoun").on("click", handleDouglascalhounClick);
      };
      if (tweet.user === 'mracus') {
        var $mracus = $('<div class=username id=mracus>@' + tweet.user + '</div>');
        $mracus.appendTo($tweet);
        $("#mracus").on("click", handleMracusClick);
      };
      if (tweet.user === 'sharksforcheap') {
        var $sharksforcheap = $('<div class=username id=sharksforcheap>@' + tweet.user + '</div>');
        $sharksforcheap.appendTo($tweet);
        $("#sharksforcheap").on("click", handleSharksforcheapClick);
      };
      if (tweet.user === 'shawndrost') {
        var $shawndrost = $('<div class=username id=shawndrost>@' + tweet.user + '</div>');
        $shawndrost.appendTo($tweet);
        $("#shawndrost").on("click", handleShawndrostClick);
      };
      $('<div class=message>' + tweet.message + '</div>').appendTo($tweet);
      $('<div class="timestamp timeago">' + jQuery.timeago(tweet.created_at) + '</div>').appendTo($tweet);
      $('<i class="far icon comment fa-comment"></i>').appendTo($tweet);
      $('<i class="fas icon retweet fa-retweet"></i>').appendTo($tweet);
      $('<i class="far icon like fa-thumbs-up"></i>').appendTo($tweet);
      $('<i class="far icon share fa-share-square"></i>').appendTo($tweet);
      index++;
      $updatefeed.text('Update Feed');
    };
  };

//set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick); //workspace, dont need buttons necessarily, update feed keep as button
  $updatefeed.on("click", updatefeed);

  $mracusfeed.on("click", handleMracusClick);
  $sharksforcheapfeed.on("click", handleSharksforcheapClick);
  $douglascalhounfeed.on("click", handleDouglascalhounClick);
  $shawndrostfeed.on("click", handleShawndrostClick);

//append new HTML elements to the DOM
  $title.appendTo($app);
  $banner.appendTo($app);
  $updatefeed.text('Update Feed');
  $updatefeed.appendTo($app);
  $mracusfeed.text('@Mracus');
  $sharksforcheapfeed.text('@Sharksforcheap');
  $douglascalhounfeed.text('@Douglascalhoun');
  $shawndrostfeed.text('@Shawndrost');
  $feed.appendTo($app);

  var index = 0;
  renderFeed();
  window.isItBeautifulYet = true;
});
