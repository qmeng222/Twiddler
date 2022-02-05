/* eslint-disable */
$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1 class="title">Twiddler</h1>');
  var $logo = $('<img class ="logo" src = "assets/img/mapleleaf.png">')
  var $heading = $('<div>').attr({id: 'header'});
  var $feedUpdater = $('<button>', {type: "button", id: "update-feed", text: "Update Feed"});
  var $newsFeed = $('<div>').attr({id: 'feed', title: 'news-feed'})

  // Create event handler functions
  var handleTitleClick = function(event){
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  }

  var handleUsernameClick = function(event){
   //change update feed button text to back toggle
   var clickedValue = $(event.target).text();
   if(clickedValue !== undefined) {
    $('#update-feed').text('Back');
   }
    var username = clickedValue.substring(2, clickedValue.length).trim();
    renderFeed(username);
  }

  var handleFeedUpdater = function(event) {
    if($('#update-feed').text() === 'Back') {
        $('#update-feed').text('Update Feed');
    }
   renderFeed()
  }

  var handleIcon= function(event) {
    $(".icon").css("background-color", "gold");
  }

  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", handleTitleClick);
  $feedUpdater.on('click', handleFeedUpdater);
  $("<i>").hover(handleIcon);


  // Append new HTML elements to the DOM
  $logo.appendTo($heading);
  $title.appendTo($heading);
  $heading.appendTo($app);
  $feedUpdater.appendTo($app);
  $newsFeed.appendTo($app);

renderFeed();


  function renderFeed(user){
    $('#feed').empty();
    if(user !== undefined) {
      var filtered = streams.home.filter(function(tweet) {
        return tweet.user === user;
      })
      var filteredIndex = filtered.length - 1;
      while(filteredIndex >= 0){
        var tweet = filtered[filteredIndex];
        var $tweet = $('<div class="tweet" ></div>');
        renderTweet(tweet, $tweet);
        $tweet.appendTo($newsFeed);
        filteredIndex -= 1;
      }
    } else {
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet" ></div>');
        renderTweet(tweet, $tweet);
        $tweet.appendTo($newsFeed);
        index -= 1;
      }

    }


   $('.tweet .username').on("click", handleUsernameClick);
   }

   function renderTweet(tweet, tweetDiv) {
    var $tweetProfilePicture = $(`<img class="profile-photo" src=" ${tweet.profilePhotoURL}">`);
    var $tweetUser = $(`<div class="username"> @${tweet.user} </div>`);
    var $tweetMessage = $(`<p class="message"> ${tweet.message} </p>`);
    var $tweetTimeStamp = $(`<div class="timestamp" > ${jQuery.timeago(tweet.created_at)}  </div>`);
    var $tweetComment = $(`<i class="icon comment far fa-comment"></i>`);
    var $tweetRetweet = $(`<i class="icon retweet fas fa-retweet" "></i>`);
    var $tweetLike = $(`<i class="icon like far fa-heart" "></i>`);
    var $tweetShare = $(`<i class="icon share fas fa-share-square" "></i>`);
    var $tweetFlexParentIcons= $(`<div class=flexIcons> </div>`)
    $tweetComment.appendTo($tweetFlexParentIcons);
    $tweetRetweet.appendTo($tweetFlexParentIcons);
    $tweetLike.appendTo($tweetFlexParentIcons);
    $tweetShare.appendTo($tweetFlexParentIcons);



    $tweetProfilePicture.appendTo(tweetDiv);
    $tweetUser.appendTo(tweetDiv);
    $tweetMessage.appendTo(tweetDiv);
    $tweetTimeStamp.appendTo(tweetDiv);
    $tweetFlexParentIcons.appendTo(tweetDiv);

   }

window.isItBeautifulYet = true;

});
