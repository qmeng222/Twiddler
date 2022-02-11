$(document).ready(function () {
    jQuery("time.timeago").timeago();
    var $feed = $('#feed');

    function sortDates(a, b) {
        return new Date(a.created_at) - new Date(b.created_at);
    };

    var tweetStructure = function (user, message, date, profileimage) {
        return `<div class="tweet" id="tweet">
        <div class="tweetboxnavbar" id="tweetboxnavbar">
          <div class="tweetboxnavbarcol1" id="tweetboxnavbarcol1"><img class="profile-photo" src="${profileimage}" alt="Profile Picture" width="20" height="20"></div>
          <div class="username" id="username" style="cursor: pointer">@${user}</div>
          <div class="tweetboxnavbarcol3 timestamp" id="tweetboxnavbarcol3">${jQuery.timeago(new Date(date))}</div>
        </div>
        <div class="tweetboxnavbar2" id="tweetboxnavbar2">
          <div class="messagebox message" id="messagebox">${message}</div>
        </div>
        <div class="tweetboxnavbar3" id="tweetboxnavbar3">
          <i class="fa-solid fa-comment fa-sm fa-inverse comment button icon" id="Comment" style="cursor: pointer"></i>
          <i class="fa-solid fa-retweet fa-sm fa-inverse retweet button icon" id="Retweet" style="cursor: pointer"></i>
          <i class="fa-solid fa-thumbs-up fa-sm fa-inverse like button icon" id="Like" style="cursor: pointer"></i>
          <i class="fa-solid fa-share fa-sm fa-inverse share button icon" id="Share" style="cursor: pointer"></i>
        </div>
      </div>`;
    }

    var renderFeed = function (passedUsername) {
        var sortedFeed = streams.home.sort(sortDates);
        if (arguments.length === 0) {
            $feed.html("");
            for (var i = sortedFeed.length - 1; i >= 0; i--) {
                var currentTweet = sortedFeed[i];
                var user = currentTweet.user;
                var message = currentTweet.message;
                var date = currentTweet.created_at;
                var profilePic = currentTweet.profilePhotoURL;
                var $tweet = $(tweetStructure(user, message, date, profilePic));
                $tweet.appendTo($feed);
            }
        } else if (arguments.length >= 1) {
            console.log(arguments);
            $feed.html("");
            var sortedFeed = streams.home.sort(sortDates);
            var userFeed = sortedFeed.filter(function (element) { return element.user === passedUsername });
            for (var i = userFeed.length - 1; i >= 0; i--) {
                var currentTweet = userFeed[i];
                var user = currentTweet.user;
                var message = currentTweet.message;
                var date = currentTweet.created_at;
                var profilePic = currentTweet.profilePhotoURL;
                var $tweet = $(tweetStructure(user, message, date, profilePic));
                $tweet.appendTo($feed);
            }
        }
        $('#update-feed').click(function () {
            renderFeed();
        });

        $('.username').click(function (event) {
            var currentUser = event.target.innerText.slice(1);
            renderFeed(currentUser);
            $("#update-feed").html("Back");
        });

        $("#update-feed").click(function (event) {
            var text = event.target.innerText;
            if (text === 'Back') {
                $("#update-feed").html("Update Feed");
            }
        });
    };
    renderFeed();
    window.isItBeautifulYet = true
});
