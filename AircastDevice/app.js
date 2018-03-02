var async = require('async')
var needle = require('needle')
var fs = require('fs')
var express = require('express')
var path = require('path')
var aircast = require('./aircastServer.js')

var Twit = require('twit');

console.log(' ASDASD ASDASD ');


// const testFolder = path.join(__dirname, '/Aircast');
// // const fs = require('fs');

// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// })


var app = express()

app.set('port', process.env.PORT || 3000);
app.use('/css', express.static(path.join(__dirname+'/public/css')));
app.use('/scripts', express.static(path.join(__dirname+'/public/scripts')));
app.use('/templates', express.static(path.join(__dirname+'/public/templates')));
app.use('/assets', express.static(path.join(__dirname+'/public/assets')));
app.use('/Aircast', express.static(path.join(__dirname+'/Aircast')));

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/public')});
})

app.get('/demo', function (req, res) {
  res.sendFile('indexDemo.html', {root: path.join(__dirname, '/public')});
})

app.get('/demoPortrait', function (req, res) {
  res.sendFile('indexDemoPortrait.html', {root: path.join(__dirname, '/public')});
})

app.get('/myID', function (req, res) {
  // console.log(aircast);
  var data = {
              RpiID: aircast.config.RpiID,
              RpiServer: aircast.config.RpiServer
            }

  if(aircast.config.isLegit){
    res.send(data);
  }
  else{
    res.send({
      error: 'config failed'
    });
  }

})



//twitter credentials
var T = new Twit({
  consumer_key:         'kvvXBOK0qr0El009CfVyU0KKB',
  consumer_secret:      'EZobxorl1JYSWYyJ1pdF9c3Ez89DohDbJaBg1I0n3iRV4CwobX',
  access_token:         '775694551545556993-CGbs51FySiiodicBaLEqnvJOGbmg0cI',
  access_token_secret:  'daL7XSMoexQkfU3zaz514Dy94uoNwBm91jIGxgzh80hD3'
})


app.get("/api/twitter",function(req,res){

  

          var tweetList = [];
          var hashtagList = [];
          var counter = 0;

          function getTopHashtag(){

              T.get('trends/place', {id: '23424934'}, function(err,data,response){

                  if (!err) {
                    
                      var trends = data[0]['trends'];
                      for (var i=0; i < 5; i++) {
                          hashtagList.push(trends[i].name);
                      }
                      gatherTweets();
                  }else {
                    res.send(null);
                  }
                    
                 });
              
          }
          
          
          function getTweets(topHashtag) {
              
              T.get('search/tweets', { q: topHashtag+" exclude:retweets", lang: 'en', locale: 'fil', result_type: 'mixed', count: 10 }, function(err, data, response) {

                 if (!err) { 
                    data.Hashtag = topHashtag;
                    tweetList.push(data);
                    console.log("added data to the list");  
                    gatherTweets();
                  }else {
                    res.send(null);
                  }       

              });
          }

          function gatherTweets(){

              if (counter < 5) {
                  getTweets(hashtagList[counter]);
                  console.log("getting tweets for position: " + counter);
                  counter++;
              }else{

                  if (tweetList.length != 5) {
                    res.json(tweetList);
                  }else {
                    console.log("Trending Topics: ", hashtagList);
                    res.json(tweetList);  
                  }
                  
              }
              
          }

          getTopHashtag();
});


app.listen(app.get('port'), function () {
  console.log('Example app listening on port: '+app.get('port'))
})


function getRpiConfig(){
  if(aircast.getConfig()){
    console.log('success');
    // updateRpi();
    setInterval(aircast.getRpiFiles, 10000);
    setInterval(aircast.getSourceFileUpdates, 30000);
    setInterval(aircast.nodeAlive, 30000);
    setInterval(aircast.removeFile, 5000);
  }
  else{
    console.log('fail');
    setTimeout(getRpiConfig, 100);
  }
}

function updateRpi(){
  setInterval(aircast.getRpiFiles, 10000);
}


getRpiConfig()

