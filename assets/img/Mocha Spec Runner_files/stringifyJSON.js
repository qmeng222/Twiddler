// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // Create array to return
  var objArray = [];
  var type;

  //Helper functions
  // This function will be used to remove extra comma from the arrays and object
  var removeExtraComma = function(str) {
    var tempArr = str.split('');
    tempArr.pop();
    return tempArr.join('');
  };

  if (obj === null) {
    return 'null';
  }

  // Types: num, boolean, String, Object
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return String(obj);
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
  }

  if (Array.isArray(obj)) {
    var arrString = '';
    for (elem in obj) {
      arrString += stringifyJSON(obj[elem]);
      arrString += ',';
    }
    return '[' + removeExtraComma(arrString) + ']';
  } else if (typeof obj === 'object') {
    var objString = '';
    var keys = Object.keys(obj);
    for (key in obj) {
      var val = obj[key];
      if (val === undefined || typeof val === 'function') {
        objString += '';
      } else {
        objString += '"' + key + '":' + stringifyJSON(val) + ',';
      }
    }
    return '{' + removeExtraComma(objString) + '}';
  }
};
