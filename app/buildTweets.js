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