var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');

var bot = linebot({
  channelId: '1558887838',
  channelSecret: '1a4c4b7f22416496c44b76d566c45576',
  channelAccessToken: 'L3JExeBE/B0vkQMnZFbhxtLijIQHcecDl2LRQV1N6EgeVO4P5vq1WRcklQ5aDK4ZE+gO00BOmPq3d/C5qmg2eEZc9T09ELM3j6DZPI1pYVy2zDMrh2zd0TCCFSYcyolYWavgPmKd31Qj+NFWk1Fz7QdB04t89/1O/w1cDnyilFU='
});

var timer;
var pm = [];
var stationInfo = [];
_getJSON();
_getJSON2();

_bot();
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

function _bot() {
  bot.on('message', function(event) {
    if (event.message.type == 'text') {
      var msg = event.message.text;
      var replyMsg = '';
      _pm();
	  _station();
	  if (replyMsg = '') {
		  replyMsg = '無法辨識' + msg + '的意義';
	  }

      event.reply(replyMsg).then(function(data) {
        console.log(replyMsg);
      }).catch(function(error) {
        console.log('error');
      });
    }
  });

}

function _pm() {
	if (msg.indexOf('PM2.5') != -1) {
        pm.forEach(function(e, i) {
          if (msg.indexOf(e[0]) != -1) {
            replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
          }
        });        
    }
}

function _station() {
	if (msg.indexOf('車站') != -1 && ("詳細"||"資料")) {
        pm.forEach(function(e, i) {
          if (msg.indexOf(e[3]) != -1) {
            replyMsg = e[3] + '的住址為 ' + e[1];
            replyMsg = e[3] + '的電話為 ' + e[2];
          }
        });        
    }
}

function _getJSON() {
  clearTimeout(timer);
  getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
    response.forEach(function(e, i) {
      pm[i] = [];
      pm[i][0] = e.SiteName;
      pm[i][1] = e['PM2.5'] * 1;
      pm[i][2] = e.PM10 * 1;
    });
  });
  
  timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
}


function _getJSON2() {
  clearTimeout(timer);  
  getJSON('https://www.railway.gov.tw/Upload/UserFiles/%E8%BB%8A%E7%AB%99%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%992.json', function(error, response) {
    response.forEach(function(e, i) {
      stationInfo[i] = [];
      stationInfo[i][0] = e.網站中文站名;
      stationInfo[i][1] = e.住址;
      stationInfo[i][2] = e.電話;
      stationInfo[i][3] = e.name;
    });
  });
  timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
}
