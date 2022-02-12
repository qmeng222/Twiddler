
var modInit = function(Fs, Path, DBPath) {
  var checkDBForFile = async function (fileName) {
    var filePath = Path.join(DBPath, fileName)
    try {
      console.log(filePath)
      await Fs.access(filePath)
      return true
    } catch {
      return false
    }
  };
  return checkDBForFile
}


module.exports = {
  modInit
}