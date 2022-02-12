
$(document).ready(function(){
  var clicked = false;
  var clickedName = "";
  var $app = $('#app');



  jQuery("time.timeago").timeago();
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function() {
    console.log(event);
    alert("The title of this page is: " + event.target.innerText);
  });

  var $button = $('<button id="update-feed">Update Feed</button>');
  $button.appendTo($app);
  /* var $button1 = $('<button id="back">Back</button>');
  $button1.appendTo($app);
  $('#back').hide(); */
  var $feed = $('<div id ="feed"></div>');
  $feed.appendTo($app);






  var $tweet = $('<div class="tweet"></div>');

  $("#update-feed").on("click", function() {
    var currLen = streams.home.length;
    var copy = streams.home.slice();
    if(clicked === false){
      for (index; index < currLen; index++) {
        var tweet = streams.home[index];
        $tweet = $('<div class="tweet" id="'+index+'"></div>');
        $tweet.prependTo($feed);
        $("#" + index).append('<img class="profile-photo" src="' + tweet.profilePhotoURL + '"/>');
        $("#" + index).append('<div class="username">@' + tweet.user + '</div>');
        $("#" + index).append('<div class="message">' + tweet.message + '</div>');
        $("#" + index).append('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');

        $("#" + index).append('<i class="icon like fa-solid fa-thumbs-up"></i>');
        $("#" + index).append('<i class="icon comment fa-solid fa-comment"></i>');
        $("#" + index).append('<i class="icon retweet fa-solid fa-retweet"></i>');
        $("#" + index).append('<i class="icon share fa-solid fa-share"></i>');
        if(clicked === true && ("@" + tweet.user !== clickedName)) {
            $("#" + index).remove();
        }
      }
    } else {
      clicked = false;
      $(".tweet").remove();
      for(var i = 0; i < copy.length; i ++){
        var tweet = streams.home[i];
        $tweet = $('<div class="tweet" id="'+i+'"></div>');
        $tweet.prependTo($feed);
        $("#" + i).append('<img class="profile-photo" src="' + tweet.profilePhotoURL + '"/>');
        $("#" + i).append('<div class="username">@' + tweet.user + '</div>');
        $("#" + i).append('<div class="message">' + tweet.message + '</div>');
        $("#" + i).append('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');

        $("#" + i).append('<i class="icon like fa-solid fa-thumbs-up"></i>');
        $("#" + i).append('<i class="icon comment fa-solid fa-comment"></i>');
        $("#" + i).append('<i class="icon retweet fa-solid fa-retweet"></i>');
        $("#" + i).append('<i class="icon share fa-solid fa-share"></i>');
      }
      //$(".tweet").show();
      $("#update-feed").html('Update Feed');
    }
    $('.username').on("click", function() {

      clicked = true;
      clickedName = $(this).text();
      for(var i = 0; i < streams.home.length; i++){
        var tweet = streams.home[i];
        if ("@" + tweet.user !== $(this).text()) {
          $("#" + i).remove();
        }
      }
      var currLen = streams.home.length;
      $("#update-feed").html('Back');
      /* $("#update-feed").hide();
      $('#back').show(); */
      $("#back").on("click", function() {
        clicked = false;
/*         $("#update-feed").show();
        $('#back').hide(); */
        $(".tweet").show();
      });
    });
    $('.icon').on('mouseover', function(event){
      event.target.style.color = "purple";
      setTimeout(function() {
        event.target.style.color = "";
      }, 50);
    });
  });


  var index = 0;
  while(index < streams.home.length){
    var tweet = streams.home[index];
    $tweet = $('<div class="tweet" id="'+index+'"></div>');
    $tweet.prependTo($feed);
    $("#" + index).append('<img class="profile-photo" src="' + tweet.profilePhotoURL + '"/>');
    $("#" + index).append('<div class="username">@' + tweet.user + '</div>');
    $("#" + index).append('<div class="message">' + tweet.message + '</div>');
    $("#" + index).append('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');

    $("#" + index).append('<i class="icon like fa-solid fa-thumbs-up"></i>');
    $("#" + index).append('<i class="icon comment fa-solid fa-comment"></i>');
    $("#" + index).append('<i class="icon retweet fa-solid fa-retweet"></i>');
    $("#" + index).append('<i class="icon sharefa-solid fa-share"></i>');
    index++;
  }
  var currLen = streams.home.length;
  $('.icon').on('mouseover', function(event){
    event.target.style.color = "purple";
    setTimeout(function() {
      event.target.style.color = "";
    }, 500);
  });


  $('.username').on("click", function() {

    clicked = true;
    clickedName = $(this).text();
    for(var i = 0; i < streams.home.length; i++){
      var tweet = streams.home[i];
      if ("@" + tweet.user !== $(this).text()) {
        $("#" + i).remove();
      }
    }
    var currLen = streams.home.length;
    $("#update-feed").html('Back');
   /*  $("#update-feed").hide();
    $('#back').show(); */
    $("#back").on("click", function() {
      clicked = false;
      console.log('hi');
/*       $("#update-feed").show();
      $('#back').hide(); */
      $(".tweet").show();
    });
  });




  window.isItBeautifulYet = true;
});