 $(document).ready(function(){
				jQuery("time.timeago").timeago();
        var $app = $('#app');
        $app.html('');







//title on page
        var $title = $('<h1>Twiddler</h1>');
        $title.appendTo($app);
				$title.on("click", function () {
			console.log(event);
			alert('The title of this page is ' + event.target.innerText)
			})

// creating a button

	var $button = $('<button class="feed__button>Update Feed</button')
			$button.appendTo($app);
			$button.on('click', function () {
			event.preventDefault;

		})




        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = $('<div class="tweet"></div>');
          $tweet.text('@' + tweet.user + ': ' + tweet.message);
          $tweet.appendTo($app);
          index -= 1;
        }

      });