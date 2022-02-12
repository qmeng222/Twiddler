
var modInit = function(Fs, Path, DBPath) {
  const writeToDB = async (fileName, data) => {
    var filePath = Path.join(DBPath, fileName)
    try {
      const storedData = JSON.stringify(data);
      var writePromise = await Fs.writeFile(filePath, storedData);
      return writePromise;
    }
    catch (error) {
      console.log('writeToDB func: ');
      console.log(error);
    }
  };
  return writeToDB
}


  module.exports = {
    modInit
  }
