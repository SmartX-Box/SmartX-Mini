
var rpi = '192.168.88.118',
nuc = '192.168.88.126';

var flagRpi,flagNUC =0;

var express = require('express'),
 fs = require('fs'),

 kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client('master1:2181'),
    topics = [{topic: 'visibility2', partition:0},
{topic:'visibility2',partition:1},
{topic:'visibility2',partition:2}];
    consumer = new Consumer(
        client, topics,
        {autoCommit: true}
    );
var app = express();
app.use('/',express.static(__dirname+"/"));

var sData=[];


var newMsg = [];
var msgRpi, msgNUC = [];

consumer.on('message', function (message) {
  var msgArr = message.value.split(',');
console.log('new Message:'+msgArr);
        if (msgArr[1] == rpi){
flagRpi  = 1;
                newMsg[0] = parseFloat(msgArr[2]);
                msgRpi = ['rpi',msgArr[5],msgArr[6],msgArr[7]];
console.log(msgRpi);
sData.push(msgRpi);

        }else if (msgArr[1] == nuc){
                flagNUC  = 1;
                newMsg[1] = parseFloat(msgArr[2]);
 msgNUC = ['NUC',msgArr[5],msgArr[6],msgArr[7]];
console.log(msgNUC);
sData.push(msgNUC);




   }else{
                console.log("which pi?");
        }

//

if(flagRpi+flagNUC == 2){
        sData.push(newMsg);
        flagRpi, flagNUC = 0;
}


  });

consumer.on('error', function(err){
  console.log(err);
  });






app.get('/', function(req, res){
    fs.readFile('view.html', function(error, data){
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(data);
    });
  });

  app.get('/getJSON', function(req, res){
//    delConsumer();
    console.log("message consumed!: "+sData);
    res.send(sData);
//    newConsumer();
sData=[];
  });

  app.listen(3000);





