
const apiUrl = 'https://a19d-2601-6c3-4001-8140-9ddf-3192-cc66-8729.ngrok.io';

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


