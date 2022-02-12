
var modInit = function(Fs, Path, DBPath) {
  const readFromDB = async (fileName, original) => {
    var filePath = Path.join(DBPath, fileName)
    try {
      let storedData = await Fs.readFile(filePath);
      storedData = JSON.parse(storedData);
      return storedData;
    }
    catch (error) {
      console.log( 'Error at: ' + this.name);
      console.log(error);
      return original;
    }
  };
  return readFromDB
}


  module.exports = {
    modInit
  }
