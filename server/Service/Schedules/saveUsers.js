var init = function(users, saveFunc, saveIntervals) {
  saveIntervals = saveIntervals ? saveIntervals : 1800;//seconds
  saveIntervals *= 1000; //miliseconds
  var MaxSaves = 500;
  var numOfSaves = 0;
  var createTimeout = async function() {
    setTimeout(async function() {
      if (MaxSaves > numOfSaves) {
        numOfSaves++;
        saveFunc('users.json', users)
        scheduleSave();
      }
    }, saveIntervals);
  };

  var scheduleSave = async function() {
    createTimeout();
  }
  return scheduleSave;
}

module.exports = {
  init
}