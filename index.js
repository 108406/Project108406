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
var groupID = [];	
var userID = [];	
var groupIsAnswer = [];	
var userIsAnswer = [];
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
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//每次傳送訊息，都判斷休比所在的空間，並判斷該空間在名單內的哪裡。
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★	
		var groupC = 0;	
		var userC = 0;
		var isGroup = false;
		var isUser = false;
		if (event.source.groupId != undefined) {
			isGroup = true;
			var pushIn = false;
			if (groupID.length != 0) {
				for (var i = 0; i <= groupID.length - 1 ; i++) {
					if (event.source.groupId == groupID[i]) {
						if (groupIsAnswer[i] == undefined) {						
							groupIsAnswer[i] = true;
						}
						groupC = i;
					}else {
						pushIn = true;
					}
				}
				if (pushIn) {
					groupID.push(event.source.groupId);
					groupC = groupID.length-1;
					groupIsAnswer[groupC] = true;
					pushIn = false;
				}
			} else {
				groupID.push(event.source.groupId);
				groupC = groupID.length-1;
				groupIsAnswer[groupC] = true;
				pushIn = false;
			}
		} else {
			isUser = true;
			var pushIn = false;
			if (userID.length != 0) {
				for (var i = 0; i <= userID.length - 1 ; i++) {
					if (event.source.userId == userID[i]) {
						if (userIsAnswer[i] == undefined) {						
							userIsAnswer[i] = true;
						}
						userC = i;
					}else {
						pushIn = true;
					}
				}
				if (pushIn) {
					userID.push(event.source.userId);
					userC = userID.length-1;
					userIsAnswer[userC] = true;
					pushIn = false;
				}
			} else { 
				userID.push(event.source.userId);
				userC = userID.length-1;
				userIsAnswer[userC] = true;
				pushIn = false;
			}
		}
	
	
		if (event.message.type == 'text') {
			var msg = event.message.text;
			var replyMsg = '';
			//===========================================
			//指令判斷
			//===========================================
			if (msg.toLowerCase() == '//mute' && isGroup) {
				if (!groupIsAnswer[groupC]) {
					replyMsg = '休比回應功能已經關閉。';
				}else {
					replyMsg = '休比回應功能關閉。';
					groupIsAnswer[groupC] = false;					
				}
			}else if (msg.toLowerCase() == '//mute' && isUser) {
				if (!userIsAnswer[userC]) {
					replyMsg = '休比回應功能已經關閉。';
				}else {
					replyMsg = '休比回應功能關閉。';
					userIsAnswer[userC] = false;									
				}
			}
			
			if (msg.toLowerCase() == '//open' && isGroup) {
				if (groupIsAnswer[groupC]) {
					replyMsg = '休比回應功能已經啟動。';
				}else {
					replyMsg = '休比回應功能啟動。';
					groupIsAnswer[groupC] = true;
				}
			}else if (msg.toLowerCase() == '//open' && isUser) {
				if (userIsAnswer[userC]) {
					replyMsg = '休比回應功能已經啟動。';
				}else {
					replyMsg = '休比回應功能啟動。';
					userIsAnswer[userC] = true;				
				}
			}
			
			if (msg.toLowerCase() == '//teaching') {
				
			}
			
			//-------------
			//指令偵錯與校正
			//-------------

			if ((msg.toLowerCase() == 'mute') ||(msg.toLowerCase() == '/mute')) {
				replyMsg = 
					'關閉休比回應功能請輸入「//mute」\n\n' +
					'查看更多指令請輸入「//help」';
			}
			
			if ((msg.toLowerCase() == 'open') ||(msg.toLowerCase() == '/open')) {
				replyMsg = 
					'重新開啟休比回應功能請輸入「//open」\n\n' +
					'查看更多指令請輸入「//help」';
			}
			
			if ((msg.toLowerCase() == 'teaching') ||(msg.toLowerCase() == '/teaching')) {
				replyMsg = 
					'查看協助對話教學請輸入「//teaching」\n\n' +
					'查看更多指令請輸入「//help」';
			}
			
			if ((msg.toLowerCase() == 'help') ||(msg.toLowerCase() == '/help')) {
				replyMsg = 
					'查看更多指令請輸入「//help」';
			}
			
			//-------------
			//所有指令列
			//-------------
			if (msg.toLowerCase() == '//help') {
				replyMsg = 
					'休比的使用說明：\n' + 
					'一、為了讓休比更方便判斷指令\n' + 
					'請在開頭加入雙斜線「//」\n' +
					'二、指令不需區分大小寫。\n\n' +
					'休比的指令列表：\n' + 
					'help：查看休比目前擁有的指令\n' +
					'mute：關閉休比的回應功能。\n' + 
					'open：開啟休比的回應功能。\n' +
					'teaching：查看協助對話教學。';
			}
			
			//===========================================
			//功能查詢
			//===========================================
			if ((isGroup && groupIsAnswer[groupC]) || (isUser && userIsAnswer[userC])) {
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
			if ((isGroup && groupIsAnswer[groupC]) || (isUser && userIsAnswer[userC])) {		
				if (replyMsg == '') {
					var answerNotFound = false;
					if (answerDB.length != 0) {
						for (var i = 0; i <= answerDB.length-1 ; i++) {
							if (answerDB[i][0] == msg) {
								var ans = Math.floor(Math.random(0,answerDB[i].length)*10);
								replyMsg = answerDB[i][ans];
							}else {
								answerNotFound = true;
							}
						}
					}
					if (answerDB.length == 0 || answerNotFound) {
						if (((msg.indexOf('//q') == 0) && (msg.indexOf('//a') != -1 ))  && ((msg.indexOf('//a') - msg.indexOf('//q')) > 0)) {
							var Q = msg.slice((msg.indexOf('//q') + 3), msg.indexOf('//a'));
							var A = msg.slice((msg.indexOf('//a') + 3), msg.length);
							replyMsg = 
								'//q後面的片段為：' + A ;
						}
						/*replyMsg = 
							'//q的indexOf值為' + msg.indexOf('//q') + '\n' + 
							'//a的indexOf值為' + msg.indexOf('//a') + '\n' +
							'msg的長度為' + (msg.length); */
						/*replyMsg = 
							'無法辨別「' + msg + '」的意義\n' + 
							'如果你願意幫助休比回答問題\n' + 
							'請輸入指令「//teaching」' + 
							'查看教導休比回答的方法。';*/
					}
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
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//被加入群組時，將群組ID加入名單陣列
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★	
		var	group = event.source.groupId;
		var replyMsg = '';
		var pushIn = false;
		if (groupID.length != 0) {
			for (var i = 0; i <= groupID.length - 1 ; i++) {
				if (group == groupID[i]) {
					replyMsg = '休比又回來了，請多多指教。';
				}else {
					pushIn = true;
				}
			}
			if (pushIn) {
				groupID.push(group);
				replyMsg = '謝謝你把我加進這個群組，請大家多多指教。';
				pushIn = false;
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
	
	
	bot.on('follow', function(event) {	
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//被加為好友時，將使用者ID加入名單陣列
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★	
		var	user = event.source.userId;
		var replyMsg = '';
		var pushIn = false;
		if (userID.length != 0) {
			for (var i = 0; i <= userID.length - 1 ; i++) {
				if (user == userID[i]) {
					replyMsg = '謝謝你加我為好友！無聊的時候可以跟我聊聊。';
				}else {
					pushIn = true;
				}
			}
			if (pushIn) {
				userID.push(user);
				replyMsg = '謝謝你讓休比有懺悔的機會，我們又是朋友了。';				
				pushIn = false;
			}
		}else {
			userID.push(user);
			replyMsg = '謝謝你讓休比有懺悔的機會，我們又是朋友了。';
		}
		event.reply(replyMsg).then(function(data) {
			console.log(replyMsg);
		}).catch(function(error) {
			console.log('error');
		});
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

