//do my jquery scripting here

$(document).ready(function(){ //.ready tells the browser to invoke callback after the HTML is loaded.
  jQuery("time.timeago").timeago();
  var $app = $('#app'); // # - references the "id" attribute with the value 'app'.
  //Select the div with the ID #app
  $app.html('');

  //Store feeds from initial render for filtering later on
  var currentTweetLength = streams.home.length;
  var currentTweet = streams.home;
  console.log(currentTweet);
  var currentTime = new Date(); //need to delete after figuring out the timestamps of each tweet

  //Create an h1 element with the text "Twiddit"
  renderHTML('<div id="title"><h1>Twiddit</h1></div>', $app);

  //Create update-feed button
  renderHTML('<button id="update-feed" class="update">Update Feed</button>', $app);

  //Create heading for home feed
  renderHTML('<div id="feed-title"><h3>HOME FEED</h3></div>', $app);

  //Create the live/home feed section where all tweets are displayed
  renderHTML('<div id="feed"></div>', $app);

  //Create the element with id of 'friends list'
  renderHTML('<div id="friends"><ul id="friends-list"><h5>FRIENDS</h5></ul></div>', $app);

  //Display the latest tweets upon HTML loading
  getStoredFeeds(currentTweet);

  //Loop thru all users and set to 'li' element...
  var userIndex = window.users.length-1;
  while(userIndex >= 0){
    var friend = window.users[userIndex];
    renderHTML('<li class="username">@' + friend + '</li>', '#friends');
    userIndex -= 1;
  }

  // Set a click event listener on 'Update Feed' button
  $(this).delegate('#update-feed', 'click', function() { //delegate redirects its selector back to the button
    if (this.innerText === "Update Feed") {
      getLatestTweets(currentTweetLength);
      currentTweetLength = streams.home.length;
      currentTweet = streams.home;
    }
  });

  //Set a click event listener on 'Back' button
  $(this).delegate("button", 'click', function() {
    if (this.innerText === "Back") {
      $("button").replaceWith('<button id="update-feed">Update Feed</button>');
      $("h3").replaceWith('<h3>HOME FEED</h3>');
      $("div").remove(".tweet");
      getStoredFeeds(currentTweet);
    }
  });

  //click event on username to show user feed
  $(this).delegate(".username", "click", function() {
    var specificUser = $(this)[0]['innerText'];
    var slicedUser = specificUser.slice(1, specificUser.length);
    $("button").replaceWith('<button id="update-feed">Back</button>');
    $("h3").replaceWith('<h3>' + specificUser + " FEED" + '</h3>');
    $("div").remove(".tweet");
    specifiedFeeds(specificUser);
  });

  //Utility function: renders html elements
  function renderHTML(elementDescription, domLocation) {
    var $temp = $(elementDescription);
    $temp.appendTo(domLocation);
  };
  //Utility function: delegate event handler
  function delegateOnClick(delegateTo, callback) {
    $(this).delegate("button", 'click', callback);
  };

  //Utility function: filter feeds by username
  function specifiedFeeds(person) {
    var filteredNames = currentTweet.filter(function(name) {
      return '@' + name.user === person;
    });
    getStoredFeeds(filteredNames);
  };

  //Utility function: loop to set generated user feeds set to each div
  function getStoredFeeds(currentFeed) {
    var index = currentFeed.length - 1;
    while(index >= 0){
      setTweets(index, 1, currentFeed);
      index--;
    }
  };

  //Utility function: loop through updated tweets to be rendered
  function getLatestTweets(previousIndex) {
    var index = previousIndex;
    var latestFeed = streams.home;
    console.log(latestFeed);
    while(index < streams.home.length){
      setTweets(index, 0, latestFeed);
      index++;
    }
  };

  //Utility function: set tweets and render call function
  function setTweets(i, append, feeds) {
    var tweet = feeds[i];
    var $tweet = $('<div class="tweet current"></div>'); //set a new tag
    if(!!append) {
      $tweet.appendTo('#feed');
    } else {
      $tweet.prependTo('#feed');
    }
    setMessageInTweet(i, feeds);
  };

  // //Utility function: Loop through and set and render
  function setMessageInTweet(ind, setFeed) {
    var tweetMessage = setFeed[ind].message;//tweetObj.message;;
    var $messageTweet = $('<span class="message"></span>');
    $messageTweet.text(tweetMessage);
    $messageTweet.appendTo('.current');

    var tweetUsername = setFeed[ind].user;
    var $tweetUsername = $('<span class="username"></span>');
    $tweetUsername.text('@' + tweetUsername);
    $tweetUsername.appendTo('.current');

    var tweetPic = setFeed[ind].user;
    var sourcePic = "assets/img/" + tweetPic + ".png";
    var $tweetPic = $('<img class="profile-photo" src=' + sourcePic + '><br>');
    $tweetPic.appendTo('.current');

    //var tweetTime = setFeed[ind].user;
    // var tweetStamp = event.timeStamp;
    //$.timeago.settings.allowFuture = true;

    var updatedTime = $.timeago(setFeed[ind].created_at)//$.timeago(new Date());//<<----------------------- Update this line~!
    var $tweetTime = $('<br><span class="timestamp"></span>');
    $tweetTime.text(updatedTime);
    $tweetTime.appendTo('.current'); //temporary class to append new element to before removing class

    var $tweetComment = $('<i class="comment far fa-comment-alt"></i>');
    $tweetComment.appendTo('.current');
    var $tweetRetweet = $('<i class="retweet fas fa-retweet"></i>');
    $tweetRetweet.appendTo('.current');
    var $tweetLike = $('<i class="like far fa-heart"></i>');
    $tweetLike.appendTo('.current');
    var $tweetShare = $('<i class="share fas fa-people-arrows"></i>');
    $tweetShare.appendTo('.current');

    $( ".current" ).removeClass( "current" ); //remove temp class
  };

  //Code is complete.
  window.isItBeautifulYet = true;
});

