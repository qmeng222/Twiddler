const $friendsList = $('#friends');
const $listOfTweeds = $('.list-of-tweeds');
const $currentFeed = $('.current-feed');
const $btn__home = $('.home');
let $btn__update = $('#update-feed');
const $btn__add = $('.add-tweed');
const $btn__logout = $('.logout');
var $app = $('#app');
let currentLocation = 'home';
const friends = Object.keys(streams.users);

// init:
$(document).ready(function(){
  $("time.timeago").timeago();
  var $app = $('#app');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = tweetGenerator(tweet);
    $tweet.appendTo($listOfTweeds);
    index -= 1;
  }
  $currentFeed.text('home');
  updateFriendsList();

});

const timePassed = function(dateObject) {
  let timePassed;

  let currentTime = new Date()
  let currentSeconds = Math.floor(currentTime.getTime() / 1000)
  let eventSeconds = Math.floor(dateObject.getTime() / 1000)
  timePassed = currentSeconds - eventSeconds;
  console.log(timePassed);

  if (timePassed < 5) return 'just now'
  if (timePassed < 60) return 'less than a minute ago'
  if (timePassed < 600) return 'within last 10 minutes'
  if (timePassed < 3600) return 'less than an hour ago'
  return 'could not calculate when message was posted...';
}


const tweetGenerator = function(tweet) {
  console.log(tweet.created_at.toISOString())
  return $(
      `<div class="tweet border">
        <img src="${tweet.profilePhotoURL}" class="profile-photo" />
        <h4 class="username">@${tweet.user}</h4>
        <p class="message">${tweet.message}</p>
        <p class="timestamp">${jQuery.timeago(tweet.created_at)}</p>
        <div class="icons">
          <i class="icon retweet fas fa-retweet"></i>
          <i class="icon like fas fa-heart"></i>
          <i class="icon comment fas fa-comment"></i>
          <i class="icon share fas fa-share"></i>
        </div>
      </div>`
    )
}
const updateFriendsList = function() {
  const friends = Object.keys(streams.users);
  friends.forEach(friend => {
    const $currentFriend = $(`<li class="friend border">@${friend}</li>`)
    $currentFriend.appendTo($friendsList)
  })
}

const update = function(tweets) {
  $listOfTweeds.html('');
  var index = tweets.length - 1;
  $currentFeed.text(currentLocation)
  while(index >= 0){
    var tweet = tweets[index];
    var $tweet = tweetGenerator(tweet);

    $tweet.appendTo($listOfTweeds);
    index -= 1;
  }
}

// event handlers:
$($btn__home).on('click', function(e) {
  e.preventDefault;
  currentLocation = 'home'
  update(streams.home)
})

$($btn__update).on('click', function(e) {
  e.preventDefault();
  if ($btn__update.text() === 'Back') {
    currentLocation = 'home'
    $btn__update.text('Update')
  }
  $listOfTweeds.html('');
  update(streams.home);
})

$($friendsList).on('click', function(e) {
  e.preventDefault();
  const clicked = e.target.textContent.slice(1);
  if (friends.indexOf(clicked) !== -1) {
    $btn__update.html('');
    $btn__update.text('Back');
    currentLocation = e.target.textContent;
    update(streams.users[clicked]);
  }
})

$($listOfTweeds).on('click', function(e) {
  e.preventDefault();
  const clicked = e.target.textContent.slice(1);
  if (friends.indexOf(clicked) !== -1) {
    $btn__update.text('Back')
    currentLocation = e.target.textContent;
    update(streams.users[clicked])
  }
})


window.isItBeautifulYet = true



