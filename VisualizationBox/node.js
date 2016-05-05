/*
192.168.88.118 rpi18
192.168.88.121 rpi21
192.168.88.122 rpi22
192.168.88.123 rpi23
192.168.88.126 rpi26
*/

var rpi18 = '192.168.88.118',
rpi21 = '192.168.88.121',
rpi22 = '192.168.88.122',
rpi23 = '192.168.88.123',
rpi26 = '192.168.88.126';

var flag18,flag21,flag22,flag23,flag26 =0;
var outFlag18, outFlag21 = 0;
var inFlag18, inFlag21 = 0;
var outFlag=0,
inFlag = 1;

var express = require('express'),
 fs = require('fs'),

 kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client('master1:2181'),
    topics = [{topic: 'visibility2', partition:0},
{topic:'visibility2',partition:1},
{topic:'visibility2',partition:2},
{topic:'visibility2',partition:3}];
    consumer = new Consumer(
        client, topics,
        {autoCommit: true}
    );
var app = express();
app.use('/',express.static(__dirname+"/"));

var sData=[];
var Client = require('node-rest-client').Client;

var client = new Client();

// direct way 
/*
client.get("http://192.168.88.137:5555/v1.0/balancing/scalein", function (data, response) {
        // parsed response body as js object 
        console.log(data);
                if(parseFloat(msgArr[2])>0.9)
                        outFlag18 = 1;
                else if(parseFloat(msgArr[2] < 0.5)
                        inFlag18 = 1;
        // raw response 
        console.log(response);
});
*/


var newMsg = [];
var msg18, msg21, msg22, msg23, msg26 = [];

consumer.on('message', function (message) {
  var msgArr = message.value.split(',');
console.log('new Message:'+msgArr);
        if (msgArr[1] == rpi18){
console.log('rpi18');
flag18  = 1;
                newMsg[0] = parseFloat(msgArr[2]);
                msg18 = ['rpi18',msgArr[5],msgArr[6],msgArr[7]];
console.log(msg18);
sData.push(msg18);
            if(parseFloat(msgArr[2])>0.8){
                        outFlag18 = 1;
                        inFlag18 = 0;
             }else if(parseFloat(msgArr[2]) > 0.5){
                        outFlag18 = 0;
                        inFlag18 = 0;
             }else{
                        outFlag18 = 0;
                        inFlag18 = 1;
             }

        }else if (msgArr[1] == rpi21){
                flag21  = 1;
                newMsg[1] = parseFloat(msgArr[2]);
 msg21 = ['rpi21',msgArr[5],msgArr[6],msgArr[7]];
console.log(msg21);
sData.push(msg21);

      if(parseFloat(msgArr[2])>0.8){
                        outFlag21 = 1;
                        inFlag21 = 0;
             }else if(parseFloat(msgArr[2]) > 0.5){
                        outFlag21 = 0;
                        inFlag21 = 0;
             }else{
                        outFlag21 = 0;
                        inFlag21 = 1;
             }


        }else if (msgArr[1] == rpi22){
                flag22  = 1;
                newMsg[2] = parseFloat(msgArr[2]);
 msg22 = ['rpi22',msgArr[5],msgArr[6],msgArr[7]];
console.log(msg22);
sData.push(msg22);

        }else if (msgArr[1] == rpi23){
                flag23  = 1;
                newMsg[3] = parseFloat(msgArr[2]);
 msg23 = ['rpi23',msgArr[5],msgArr[6],msgArr[7]];
console.log(msg23);
sData.push(msg23);

        }else if (msgArr[1] == rpi26){
                flag26  = 1;
                newMsg[4] = parseFloat(msgArr[2]);
 msg26 = ['rpi26',msgArr[5],msgArr[6],msgArr[7]];
console.log(msg26);
sData.push(msg26);

   }else{
                console.log("which pi?");
        }

//

if(flag18+flag21+flag22+flag23+flag26 == 5){
        sData.push(newMsg);
        flag18, flag21, flag22, flag23, flag26 = 0;
}

if(outFlag18 + outFlag21 == 2 && inFlag == 1){
for(i=0;i<3;i++){
client.get("http://192.168.88.137:5555/v1.0/balancing/scaleout", function (data, response) {
        // parsed response body as js object 
        console.log(data);
        // raw response 
        console.log(response);
});
}
inFlag = 0;
outFlag = 1;

}


if(inFlag18 + inFlag21 == 2 && outFlag == 1){
for(i=0;i<3;i++){
client.get("http://192.168.88.137:5555/v1.0/balancing/scalein", function (data, response) {
        // parsed response body as js object 
        console.log(data);
        // raw response 
        console.log(response);
});
}

inFlag = 1;
outFlag = 0;
}

console.log("[inFlag:"+inFlag+", outFlag:"+outFlag+"]"+"new Message come!:"+newMsg);

  });

consumer.on('error', function(err){
  console.log(err);
  });


//  var app = express();


//app.use('/',express.static(__dirname+"/"));


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





