const $friendsList = $('#friends')
const $listOfTweeds = $('.list-of-tweeds');
const $currentFeed = $('.current-feed');
const $btn__home = $('.home')
const $btn__update = $('.update')
const $btn__add = $('.add-tweed')
const $btn__logout = $('.logout')
var $app = $('#app');
let currentLocation = 'home';
const friends = Object.keys(streams.users);

// init:
$(document).ready(function(){
  var $app = $('#app');
  // $app.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = tweetGenerator(tweet);
    $tweet.appendTo($listOfTweeds);
    index -= 1;
  }
  $currentFeed.text('home');

});


const tweetGenerator = function(tweet) {
  return $(
      `<li class="tweet border">
        <img src="${tweet.profilePhotoURL}" class="prof-pic" />
        <h4 class="username">@${tweet.user}</h4>
        <p class="message">${tweet.message}</p>
        <p class="timestamp">${tweet.created_at}</p>
        <ul class="icons">
          <li class="retweet icon"><ion-icon name="return-up-forward-outline"></ion-icon></li>
          <li class="like icon"><ion-icon name="heart"></ion-icon></li>
          <li class="comment icon"><ion-icon name="add-circle-outline"></ion-icon></li>
          <li class="share icon"><ion-icon name="share-outline"></ion-icon></li>
        </ul>
      </li>`
    )
}
const updateFriendsList = function() {
  const friends = Object.keys(streams.users);
  friends.forEach(friend => {
    const $currentFriend = $(`<li class="friend border">@${friend}</li>`)
    $currentFriend.appendTo($friendsList)
    console.log('anything')
  })
}

const update = function(tweets) {
  $listOfTweeds.html('');
  var index = tweets.length - 1;
  $currentFeed.text(currentLocation)
  while(index >= 0){
    console.log(index)
    console.log(tweets[index])
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
  const currentFeed = currentLocation.startsWith('@') ? currentLocation.slice(1) : currentLocation;
  if (currentFeed === 'home') {
    update(streams.home);
  }
  if (currentFeed !== 'home') {
    update(streams.users.currentFeed);
  }
})

$($friendsList).on('click', function(e) {
  e.preventDefault();
  const clicked = e.target.textContent.slice(1);
  if (friends.indexOf(clicked) !== -1) {
    currentLocation = e.target.textContent;
    update(streams.users[clicked])
  }
})



// initial
const init = function() {
  update(streams.home);
  updateFriendsList()
}

init();



