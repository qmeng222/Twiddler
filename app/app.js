


var getApiUrl = function(URL, params) {
  const apiUrl = 'https://ea4a-2601-6c3-4001-8140-9ddf-3192-cc66-8729.ngrok.io';
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
        console.log(data[ind]['profilePhotoURL'])
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


var createEmptyTweets = function($, $tweets, numToMake) {
  var index = numToMake ? numToMake : 40;
  var i = 0;
  var addedHeight = 0;
  while(index > i){
    var $tweet = $('<div class="tweet"></div>');
    var $tweetHeader = $('<div class="tweetHeader"></div>')
    var imgPath =  'assets/img/visitor.png';
    $('<img class ="tweetImg emptyImg"></img>').attr("src", imgPath).appendTo($tweetHeader);
    $('<div class="txtHead emptyHead"></div>').appendTo($tweetHeader);
    $tweetHeader.appendTo($tweet)
    $('<div class="txtMessage emptyMessage"></div>').appendTo($tweet);
    $('<div class="txtTime emptyTime"></div>').appendTo($tweet);
    addedHeight += $('.tweet').height();
    $tweet.appendTo($tweets);
    i++;
  }
  var initMain = $('.main').height()
  $tweets.height(initMain + addedHeight);
  $('.main').height(initMain + addedHeight);
}


var userInit = async function($, streams) {
  var tweets = await getUserTweets($);
  streams.home = tweets;
  loadTweets(tweets, $);
}








var checkForNewTweets = async function($, streams, user) {
  var firstTweet = streams.home[0];
  var mili = firstTweet.created_at;
  var userName = user ? user : 'doobs'
  var ajaxUrl = getApiUrl('/api/getNewTweets', [['userName', userName], ['lastTime', mili]]);
  var tweets = await ajaxGet(ajaxUrl);
  if (tweets.length) {
    $('.update').css('visibility', 'visible')
    streams.addedToUpdate += tweets.length ? tweets.length : 0;
    streams.home = tweets.concat(streams.home)
  }
}



var updateWithNewTweets = function($, streams, $tweets) {
  var numToGrab = streams.addedToUpdate;
  var addedTweets = streams.home.slice(0, numToGrab).reverse();
  addedTweets.forEach(function(tweet) {
    var $tweet = $('<div class="tweet loaded"></div>');
    var $tweetHeader = $('<div class="tweetHeader"></div>')
    var imgPath = tweet.profilePhotoUR ? tweet.profilePhotoUR : './assets/img/visitor.png';
    $('<img class ="tweetImg"></img>').attr("src", imgPath).appendTo($tweetHeader)
    $('<div class="txtHead"></div>').text('@' + tweet.user).appendTo($tweetHeader);
    $tweetHeader.appendTo($tweet)
    $('<div class="txtMessage"></div>').text(tweet.message).appendTo($tweet);
    var time = $.timeago(new Date(tweet.created_at))
    $('<div class="txtTime"></div>').text(time).appendTo($tweet);
    $tweet.prependTo($tweets);
  })
  $('.update').css('visibility', 'hidden')
}





$(document).ready(function(){

  console.log($.timeago(Date.now()))
  window.streams = {};
  streams.addedToUpdate = 0;
  var $tweets = $('.tweets');
  $tweets.delegate( ".tweet", "click", function() {
    console.log('tweet clicked')
    console.log(this)
    $( this ).toggleClass( "chosen" );
  });

  $('.update').on('click', function() {
    updateWithNewTweets($, streams, $tweets);
  });

  if(streams.home === undefined) {
    createEmptyTweets($, $tweets);
    userInit($, streams);
  } else {
    loadTweets(streams.home, $)
  }

  setInterval(function() {
    checkForNewTweets($, streams);
  }, 12500);
});


