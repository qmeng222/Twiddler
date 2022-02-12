var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
app.use(cors({
  origin: '*'
  //origin:'https://6329-2601-6c3-4001-8140-9ddf-3192-cc66-8729.ngrok.io'
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var serv = require('./Service/index');



var main = async function() {
  serv = await serv.init()


  app.get('/api/getFollowing', async (req, res) => {
    try {
      var userName = (req.query.userName)
      var tweets = await serv.get.followedTweets(userName, serv.data.users);
      res.json(tweets);
    }
    catch (error) {
      console.log(error)
      res.json([])
    }
  })


  app.get('/api/getNewTweets', async function(req, res) {
    try {
      var userName = req.query.userName;
      var lastTime = req.query.lastTime;
      var tweets = await serv.get.newTweets(userName, lastTime, serv.data.users);
      res.json(tweets)
    }
    catch (error) {
      console.log(error)
      res.json([])
    }
  })

}
main();



module.exports = app;
const PORT = process.env.PORT || 4040

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


