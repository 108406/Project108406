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
var uviInfo = [];
var answerDB = [];
var isAnswer = true;	
var groupID = [];	
var userID = [];	
var controller = 0;	
_getJSON();

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
			//===========================================
			//指令判斷
			//===========================================
			if (msg == '//mute') {
				replyMsg = '休比回應功能已關閉。';
				isAnswer = false;
			}
			if (msg == '//open') {
				replyMsg = '休比回應功能啟動。';
				isAnswer = true;
			}
			
			//-------------
			//所有指令列
			//-------------
			if (msg == '//help') {
				replyMsg = 
					'休比的指令列表：\n' + 
					'//mute：關閉休比的回應功能。\n' + 
					'//open：開啟休比的回應功能。';
			}
			//----------
			if (isAnswer == undefined) {
				isAnswer = true;
			}
			//===========================================
			//功能查詢
			//===========================================
			if (isAnswer) {
				if (msg.indexOf('PM2.5') != -1) {
					pm.forEach(function(e, i) {
						if (msg.indexOf(e[0]) != -1) {
							replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
						}
					});        
				}
				if ((msg.indexOf('UVI') != -1) || (msg.indexOf('紫外線') != -1)) {
					uviInfo.forEach(function(e, i) {
						if ((msg.indexOf(e[0]) != -1) && (msg.indexOf(e[1]) != -1) ) {
							replyMsg = e[0] + e[1] + "的UVI為" + e[2];
						}else if ((msg.indexOf(e[0]) != -1) && (msg.indexOf(e[1]) == -1) ) {
							replyMsg = "請輸入區域名稱";
						}else if ((msg.indexOf(e[0]) == -1) && (msg.indexOf(e[1]) != -1 )) {
							replyMsg = e[1] + "的UVI為" + e[2];;
						}
					});        
				}
			}
			//===========================================
			//對話資料庫
			//===========================================
			if (isAnswer) {
				if (replyMsg == '') {
			/*		for (var i = 0;i <= answerDB.length-1;i++) {
						if (answerDB[i][0] == msg) {
							var ans = Math.floor(Math.random(0,answerDB[i].length)*10);
							replyMsg = answerDB[i][ans];
						}else {*/
							replyMsg = '無法辨識「' + msg + '」的意義\n' + 
								event.source.groupId;
						/*}
					}					
					*/
				}
			}
			

			event.reply(replyMsg).then(function(data) {
				console.log(replyMsg);
			}).catch(function(error) {
				console.log('error');
			});
		}
	});
	
	
	bot.on('join', function(event) {	
		var	group = event.source.groupId;
		var replyMsg = '';
		if (groupID.length != 0) {
			for (var i = 0; i <= groupID.length - 1 ; i++) {
				if (group == groupID[i]) {
					controller = i;
					replyMsg = '休比又回來了，請多多指教。';
				}else {
					groupID.push(group);
					replyMsg = '謝謝你把我加進這個群組，請大家多多指教。';
				}
			}
		}else {
			groupID.push(group);
			replyMsg = '謝謝你把我加進這個群組，請大家多多指教。';
		}
		event.reply(replyMsg).then(function(data) {
			console.log(replyMsg);
		}).catch(function(error) {
			console.log('error');
		});
	});
	
	
	bot.on('group', function(event) {	
		
	});
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
  getJSON('http://opendata2.epa.gov.tw/UV/UV.json', function(error, response) {
    response.forEach(function(e, i) {
      uviInfo[i] = [];
      uviInfo[i][0] = e.County;
      uviInfo[i][1] = e.SiteName;
      uviInfo[i][2] = e.UVI;
    });
  });
  timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
}

