// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  //Helper: Identify type of data we're parsing
  var identifyType = function(str) {
    if (str[0] === '[' && str[str.length - 1] === ']') {
      return 'array';
    } else if (str[0] === '{' && str[str.length - 1] === '}') {
      return 'object';
    } else if (+(str) + '' === str) {
      return 'number';
    } else {
      return 'string';
    }
  };

  //Helper: Trim ends of strings
  var trimStringEnds = function(str) {
    str = str.trim();
    return str.substring(1, str.length - 1);
  };

  //Helper: Parse substring character-by-character
  var splitChars = function (splitChar, str) {
    var result = [];
    var doubleStringStart = false;
    var singleStringStart = false;
    var inArray = false;
    var inObj = false;
    var arrayBracketCount = 0;
    var objectBracketCount = 0;
    var currentString = '';
    var lastChar = '';
    for (var i = 0; i < str.length; i++) {
      var char = str[i];
      if (char === '"') {
        doubleStringStart = true;
      } else if (char === "'") {
        singleStringStart = true;
      } else if (char === '[') {
        inArray = true;
        arrayBracketCount++;
      } else if (char === ']') {
        arrayBracketCount--;
        if (arrayBracketCount === 0) {
          inArray = false;
        }
      } else if (char === '{') {
        inObj = true;
        objectBracketCount++;
      } else if (char === '}') {
        objectBracketCount--;
        if (objectBracketCount === 0) {
          inObj = false;
        }
      }

      if (char === splitChar && !doubleStringStart && !singleStringStart && !inArray && !inObj) {
        if (currentString !== '') {
          result.push(currentString.trim());
        }
        currentString = '';
        lastChar = '';
      } else {
        currentString += char;
        lastChar = char;
      }
    }
    if (currentString !== '') {
      result.push(currentString.trim());
    }
    return result;
  };

  //Main functino
  //Go through input string, recursively call itself for array and objects
  var parseString = function (str) {
    str = str.trim();
    var type = identifyType(str);
    if (type === 'array') {
      var arrayKeyVal = splitChars(',', str);
      return arrayKeyVal;
      //return .map(parseString);
    } else if (type === 'object') {
      var returnObj = {};
      var obj = splitChars(',', str);
      obj.forEach(function (val) {
        var keyValPair = splitChars(':', val);
        if (keyValPair.length === 2) {
          obj[parseString(keyValPair[0])] = parseString(keyValPair[1]);
        }
      });
      return obj;
    } else if (type === 'string') {
      return trimStringEnds(str);
    } else if (type === 'number') {
      return str;
    } else if (str === undefined) {
      return undefined;
    } else if (str === null) {
      return null;
    }
  };
  parseString(json);
};
