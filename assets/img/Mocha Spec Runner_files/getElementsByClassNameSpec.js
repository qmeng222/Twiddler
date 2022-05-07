var htmlStrings = [
  '<div class="targetClassName"></div>',
  '<div class="otherClassName targetClassName"></div>',
  '<div><div class="targetClassName"></div></div>',
  '<div><div class="targetClassName"><div class="targetClassName"></div></div></div>',
  '<div><div></div><div><div class="targetClassName"></div></div></div>',
  '<div><div class="targetClassName"></div><div class="targetClassName"></div></div>',
  '<div><div class="someOtherDiv"><div class="targetClassNameButNotQuite innerDiv">'
  + '<span class="targetClassName">Some text for this span.</span>'
  + '</div></div></div>',
  '<div class="container"><div class="targetClassName randomClass"></div></div>',
  '<div class="paragraph text targetClassName"><p class="intro targetClassName">'
  + 'Text for the paragraph tag.'
  + '</p></div>'
];

describe('getElementsByClassName', function() {

  describe('should match the results of calling the built-in function', function() {
    htmlStrings.forEach(function(htmlString, index) {
      it(htmlString, function() {
        var $rootElement = $(htmlString);
        $('body').append($rootElement);

        if (index % 2 === 0) {
          $('body').addClass('targetClassName');
        }

        var result = getElementsByClassName('targetClassName');
        var expectedNodeList = document.getElementsByClassName('targetClassName');
        var expectedArray = Array.prototype.slice.apply(expectedNodeList);
        var equality = _.isEqual(result, expectedArray); // why can't we use `===` here?

        expect(equality).to.equal(true);

        $('body').removeClass();
        $rootElement.remove();
      });
    });
  });

});
