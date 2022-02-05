// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Environment

$("time.timeago").timeago()
$feed = document.getElementById('feed');
$button = document.getElementById('update-feed');
tweetStream = streams.home

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Utility

function clearChildren(node) {
   while (node.lastElementChild) node.removeChild(node.lastElementChild)
}

function slurpTweets() {
   return Array.from(new Set(tweetStream)).reverse()
}

function updateView() {
   clearChildren($feed)
   slurpTweets()
      .map(TweetElement)
      .forEach(tweet => $feed.appendChild(tweet))
   $button.innerText = 'Update'
}

function updateUserView(user) {
   clearChildren($feed)
   slurpTweets()
      .filter(tweet => tweet.user === user)
      .map(TweetElement)
      .forEach(tweet => $feed.appendChild(tweet))
   $button.innerText = 'Back'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Core

function TweetElement({ user, message, created_at, profilePhotoURL }) {
   return Object.assign(document.createElement('article'), {
      className: 'tweet',
      innerHTML: `
         <section>
            <img class="profile-photo" src="${profilePhotoURL}" />
            <div class="username" onClick="updateUserView('${user}')">@${user}</div>
            <div class="message">: ${message}</div>
         </section>
         <time class="timestamp">${$.timeago(created_at)}</time>
         <nav>
            <i class="comment far fa-address-card" />
            <i class="retweet far fa-address-card" />
            <i class="like far fa-address-card" />
            <i class="share far fa-address-card" />
         </nav>
      `,
   })
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Execute

$button.addEventListener('click', updateView);
updateView()
window.isItBeautifulYet = true