
const apiUrl = 'https://fa6f-2601-6c3-4001-8140-9ddf-3192-cc66-8729.ngrok.io';

var getApiUrl = function(URL, params) {
  var newUrl = URL[(URL.length - 1)] === '/' ? (URL + '?') : ( URL + '/?' );
  let addAndSymbolIter = 0;
  params.forEach(function(param) {
    var key = param[0];
    var val = param[1];
    const paramKeyStr = addAndSymbolIter === 0 ? key : '&' + key;
    const paramStr = paramKeyStr + '=' + val.toString();
    newUrl += paramStr;
    addAndSymbolIter ++;
  });
  newUrl = apiUrl + newUrl
  return newUrl
}


var ajaxGet = async function(ajaxUrl) {
  var ajaxReq = $.ajax(ajaxUrl, {
    timeout: 3000
  })
  return await ajaxReq.success(function (data, status, jqXhr) {
    return data;
  })
  return await ajaxReq.error(function (jqXhr, textStatus, errorMessage) {
    var error = [{user:'fetch Error', message:'This is a terrible error handler', created_at:0}]
    console.log(errorMessage)
    console.log(textStatus)
    console.log(jqXhr)
    console.log('ajax error')
    return error
  })
}



var getUserTweets = async function($, user) {
  var userName = user ? user : 'doobs'
  var ajaxUrl = getApiUrl('/api/getFollowing', [['userName', userName]]);
  return await ajaxGet(ajaxUrl);
}




var loadTweets = function(data, $) {
  var classes = [ 'emptyImg', 'emptyMessage', 'emptyTime']
  var keys = ['profilePhotoUR', 'message', 'created_at']
  var addedHeight = 0;
  $('div.tweet').each(function(ind) {
    console.log(this)
    var $tweet = $(this);
    $tweet.addClass(' loaded');
    var $childern = $($tweet.children());
    $childern.each(function(c) {
      var $child = $(this);
      var key = keys[c];
      var val;
      if(key === 'created_at') {
        val = $.timeago(new Date(data[ind][key]))
        $child.text(val);
        $child.toggleClass(classes[c]);
      } else if(key === 'profilePhotoUR') {
        var imgVal = data[ind]['profilePhotoURL']  ? data[ind]['profilePhotoURL'] : './assets/img/visitor.png';
        var userName = data[ind]['user']
        var $headerChild = $($child.children());
        var $hChild0 = $($headerChild[0]);
        var $hChild1 = $($headerChild[1]);
        $hChild0.attr('src', imgVal);
        $hChild1.text('@' + userName);
        $hChild0.toggleClass('emptyImg');
        $hChild1.toggleClass('emptyHead');
      } else {
        val = data[ind][key];
        $child.text(val);
        $child.toggleClass(classes[c]);
      }

    })
  })
}


var createEmptyTweets = function($, $feed, numToMake) {
  var index = numToMake ? numToMake : 40;
  var i = 0;
  var addedHeight = 0;
  while(index > i){
    var $tweet = createTweet($)
    $tweet.appendTo($feed);
    addedHeight += 90;
    i++;
  }
  var initMain = $('.main').height()
  $feed.height(initMain + addedHeight);
  $('.main').height(initMain + addedHeight);
}

var getTweetFooter = function($iconFooter) {
  var imgPath = './assets/icons/';
  var comments = 'comment-dots.svg';
  var retweet = '/comments.svg'
  var share = 'pen-to-square.svg';
  var like = 'heart.svg';

  $('<img class="icon comment" src='+ imgPath + comments + '></img>').appendTo($iconFooter);
  $('<img class="icon retweet" src='+ imgPath  + retweet + '></img>').appendTo($iconFooter);
  $('<img class="icon like" src='+ imgPath + like + '></img>').appendTo($iconFooter);
  $('<img class="icon share" src='+ imgPath + share +  '></img>').appendTo($iconFooter);
  return $iconFooter;
}




var createTweet = function($, tweet) {
  if (tweet) {
    var $tweet = $('<div class="tweet loaded"></div>');
    var $tweetHeader = $('<div class="tweetHeader"></div>');
    var $iconFooter = $('<div id="tweetFooter"></div>');
    var imgPath = tweet.profilePhotoUR ? tweet.profilePhotoUR : './assets/img/visitor.png';
    $('<img class ="profile-photo"></img>').attr("src", imgPath).appendTo($tweetHeader)
    $('<div class="username"></div>').text('@' + tweet.user).appendTo($tweetHeader);
    $tweetHeader.appendTo($tweet)
    $('<div class="message"></div>').text(tweet.message).appendTo($tweet);
    var time = $.timeago(new Date(tweet.created_at))
    $('<div class="timestamp"></div>').text(time).appendTo($tweet);
    $iconFooter = getTweetFooter($iconFooter);
    $iconFooter.appendTo($tweet);
    return $tweet;
  } else {
    var $tweet = $('<div class="tweet"></div>');
    var $tweetHeader = $('<div class="tweetHeader"></div>');
    var $iconFooter = $('<div id="tweetFooter"></div>');
    var imgPath =  'assets/img/visitor.png';
    $('<img class ="profile-photo emptyImg"></img>').attr("src", imgPath).appendTo($tweetHeader);
    $('<div class="username emptyHead"></div>').appendTo($tweetHeader);
    $tweetHeader.appendTo($tweet)
    $('<div class="message emptyMessage"></div>').appendTo($tweet);
    $('<div class="timestamp emptyTime"></div>').appendTo($tweet);
    $iconFooter = getTweetFooter($iconFooter);
    $iconFooter.appendTo($tweet);
    return $tweet;
  }

}




var checkForNewTweets = async function($, streams, user) {
  var firstTweet = streams.home[0];
  var mili = firstTweet.created_at;
  var userName = user ? user : 'doobs'
  var ajaxUrl = getApiUrl('/api/getNewTweets', [['userName', userName], ['lastTime', mili]]);
  var tweets = await ajaxGet(ajaxUrl);
  if (tweets.length) {
    $('#update-feed').css('visibility', 'visible')
    streams.addedToUpdate += tweets.length ? tweets.length : 0;
    streams.home = tweets.concat(streams.home)
  }
}





var updateWithNewTweets = function($, streams, $feed) {
  var numToGrab = streams.addedToUpdate;
  var addedTweets = streams.home.slice(0, numToGrab).reverse();
  addedTweets.forEach(function(tweet) {
    var $tweet = createTweet($, tweet);
    $tweet.prependTo($('#feed'));
  })
  $('#update-feed').css('visibility', 'hidden')
}




var userInit = async function($, streams) {
  var tweets = await getUserTweets($);
  streams.home = tweets;
  loadTweets(tweets, $);
}



$(document).ready(function(){
  window.streams = {};
  streams.addedToUpdate = 0;
  var $feed = $('#feed');
  $feed.delegate( ".tweet", "click", function() {
    console.log('tweet clicked')
    console.log(this)
    $( this ).toggleClass( "chosen" );
  });

  $('#update-feed').on('click', function() {
    updateWithNewTweets($, streams, $feed);
  });

  if(streams.home === undefined) {
    createEmptyTweets($, $feed);
    userInit($, streams);
  } else {
    loadTweets(streams.home, $)
  }

  setInterval(function() {
    checkForNewTweets($, streams);
  }, 5000);
});


