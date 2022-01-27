<ul class="wishList">My Wish List</ul>`<br>
$("ul.wishList").append("<li>New blender</li>");

<li id="liWithID">List item with an ID.</li>
$("#liWithID").replaceWith("<p>Socks</p>");

<h1 id="headline">News Headline</h1>
$("h1#headline").css("font-size", "2em");

<input name="myInput" />
$("[name='myInput']").value("Test"); // sets input value to "Test"

<input name="myElement" />`<br>
<button name="myElement">Button</button>
$("input[name='myElement']").remove(); // removes the input field not the button

<ul>
<li>One</li>
<li>Two</li>
<li>Three</li>
</ul>
$("li:first").css("color", "green");
$("li:last").css("color", "yellow");


<ul>
<li data-country="India">Mumbai</li>
<li data-country="China">Beijing</li>
<li data-country="United States">New York</li>
</ul>
$("li[data-country='India']").css("color", "green");

<p>Hello</p>
<p>World</p>
$("p:contains('World')").css("color", "yellow");

$("#cat,#dog,#rat").css("background-color","red");

$('selector').html();
$('#example').html();

$('selector').html(content);
$('p').html('Hello World!');

$(selector).css(propertyName);
$('#element').css('background');

$(selector).css(propertyName,value);
$('#element').css('background','red');

$('#element').css({
  'background': 'gray',
  'color': 'white'
});
$('#element').css('background-color', 'gray');

//$("#clickMe").click(handler)
<button id="alert">Click Here</button>
$("#alert").click(function () {
  alert("Hi! I'm an alert");
});

<a id="myLink" href="www.google.com">Link to Google</a>
$("#myLink").click(function (event) {
  event.preventDefault();
});

jqueryElement.click(usefulInfo, handler)
$("element").click({firstWord: "Hello", secondWord: "World"}, function(event){
  alert(event.data.firstWord);
  alert(event.data.secondWord);
});

$("#alert").click(function () {
  alert("Hi! I'm an alert");
});
$("#alert").click();

$( document ).on("click", ".myCustomBtnClassInATable", function () {
  var myTableCell = $(this).parent();
  var myTableRow = myTableCell.parent();
  var myTableBody = myTableRow.parent();
  var myTable = myTableBody.parent();
  //you can also chain these all together to get what you want in one line
  var myTableBody = $(this).parent().parent().parent();
});

$( document ).on("click", ".myCustomBtnClassInATable", function (e) {
  //find out more information about the event variable in the console
  console.log(e);
});

$(#example).mousedown(function(){
  alert("Example was clicked");
});

$(selector).hover(inFunction, outFunction);
$("p").hover(function(){
  $(this).css("background-color", "yellow");
}, function(){
  $(this).css("background-color", "pink");
});

$(".selector").animate(properties, duration, callbackFunction());
$(".awesome-animation").animate({
	opacity: 1,
	bottom: += 15
}, 1000, function() {
	$(".different-element").hide();
});

$(".myclass").hide()
$("#myobject").hide(800)
$("p").hide( "slow", function() {
  $(".titles").hide("fast");
  alert("No more text!");
});

$(".myclass").show();
$("#myobject").show("slow");
$("#title").show( "slow", function() {
  $("p").show("fast");
});

$(".myclass").toggle()

$(".myclass").slideDown(); //will expand the element with the identifier myclass for 400 ms.
$(".myclass").slideDown(1000); //will expand the element with the identifier myclass for 1000 ms.
$(".myclass").slideDown("slow"); //will expand the element with the identifier myclass for 600 ms.
$(".myclass").slideDown("fast"); //will expand the element with the identifier myclass for 200 ms.

$("button").click(function(){
  $("#div1").load("demo_test.txt");
});

$('#someElement').removeClass('classA');
$('#someElement').addClass('classB');
$('#someElement').removeClass('classA').addClass('classB');

jQuery.get( url [, data ] [, success ] [, dataType ] )
$.get('http://example.com/resource.json', {category:'client', type:'premium'});
$.get('http://example.com/resource.json', {category:'client', type:'premium'}, function(response) {
     alert("success");
     $("#mypar").html(response.amount);
});
$.get('http://example.com/resource.json', {category:'client', type:'premium'})
     .done(function(response) {
           alert("success");
           $("#mypar").html(response.amount);
     })
     .fail(function(error) {
           alert("error");
           $("#mypar").html(error.statusText);
     });

$.ajax({
  url: url,
  data: data,
  success: success,
  dataType: dataType
 });

jQuery.post( url [, data ] [, success ] [, dataType ] )
$.post('http://example.com/form.php', {category:'client', type:'premium'});
$.post('http://example.com/form.php', {category:'client', type:'premium'}, function(response){
      alert("success");
      $("#mypar").html(response.amount);
});
$.post('http://example.com/form.php', {category:'client', type:'premium'}).done(function(response){
      alert("success");
      $("#mypar").html(response.amount);
});

$.ajax({
  type: "POST",
  url: url,
  data: data,
  success: success,
  dataType: dataType
});