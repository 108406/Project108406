var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var bot = linebot({
  channelId: '1558887838',
  channelSecret: '1a4c4b7f22416496c44b76d566c45576',
  channelAccessToken: 'L3JExeBE/B0vkQMnZFbhxtLijIQHcecDl2LRQV1N6EgeVO4P5vq1WRcklQ5aDK4ZE+gO00BOmPq3d/C5qmg2eEZc9T09ELM3j6DZPI1pYVy2zDMrh2zd0TCCFSYcyolYWavgPmKd31Qj+NFWk1Fz7QdB04t89/1O/w1cDnyilFU='
});

var myClientSecret={"installed":{"client_id":"826945543828-bkch7mebbit467p84hkc2h1t88vmk0ul.apps.googleusercontent.com","project_id":"phonic-agility-178912","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"9BZXk3XPV_hWCeFZP7whFBoS","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}};

var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(myClientSecret.installed.client_id,myClientSecret.installed.client_secret, myClientSecret.installed.redirect_uris[0]);

oauth2Client.credentials ={"access_token":"ya29.GltrBUPv62sRXPU_WI2iGkqNhpXnmSq511j-G-JNTiWNj8uBbHrxLVySEkrTqDh-WOwG3eacrcSiFlXB-mVelkEISTyiAW5aeRIc7AuO5JEKlJMKJyM2NMzprknZ","refresh_token":"1/FYb8760SodoyLtuX5yrnbbaulbW4l5JcxO4SyrPuOfg","token_type":"Bearer","expiry_date":1519378285674};

var mySheetId='1uVOVQFbClX6BTZDEEzrKMT5Rq7wQX7CkApYMlMcvXpo';


var timer;
var timer3;
var pm = [];
var uviInfo = [];

var answerDB = [];
var groupID = [];	
var userID = [];	
var groupIsAnswer = [];	
var userIsAnswer = [];
getQuestions();
getIdData();

_getJSON();
_update();

_bot();
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

function getQuestions() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
     auth: oauth2Client,
     spreadsheetId: mySheetId,
     range:encodeURI('replyDB'),
  }, function(err, response) {
     if (err) {
        console.log('讀取問題檔的API產生問題：' + err);
        return;
     }
     var rows = response.values;
     if (rows.length == 0) {
        console.log('No data found.');
     } else {
		 var DBlength = rows.length;
		 for (i = 0; i < DBlength; i++) {
			 answerDB[i] = rows[i];
		 }
     }
  });
}

function getIdData() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
     auth: oauth2Client,
     spreadsheetId: mySheetId,
     range:encodeURI('usersetting'),
  }, function(err, response) {
     if (err) {
        console.log('讀取問題檔的API產生問題：' + err);
        return;
     }
     var rows = response.values;
     if (rows.length == 0) {
        console.log('No data found.');
     } else {		 
		 for (i=1; i <rows.length ; i++) {	
			userID[i-1]	= rows[i][0];
			if (rows[i][1].toLowerCase() == 'true') {
				userIsAnswer[i-1] = true;
			}else if (rows[i][1].toLowerCase() == 'false') {
				userIsAnswer[i-1] = false;
			}
		 }
     }
  });
  sheets.spreadsheets.values.get({
     auth: oauth2Client,
     spreadsheetId: mySheetId,
     range:encodeURI('groupsetting'),
  }, function(err, response) {
     if (err) {
        console.log('讀取問題檔的API產生問題：' + err);
        return;
     }
     var rows = response.values;
     if (rows.length == 0) {
        console.log('No data found.');
     } else {		 
		 for (i=1; i <rows.length ; i++) {	
			groupID[i-1] = rows[i][0];
			if (rows[i][1].toLowerCase() == 'true') {
				groupIsAnswer[i-1] = true;
			}else if (rows[i][1].toLowerCase() == 'false') {
				groupIsAnswer[i-1] = false;				
			}
		 }
     }
  });
  
}


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
			var pushIn = true;
			if (groupID.length != 0) {
				for (var i = 0; i <= groupID.length - 1 ; i++) {
					if (event.source.groupId == groupID[i]) {
						if (groupIsAnswer[i] == undefined) {						
							groupIsAnswer[i] = true;
						}
						pushIn = false;
						groupC = i;
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
			}
			GroupIdSettingOverwrite();
		} else {
			isUser = true;
			var pushIn = true;
			if (userID.length != 0) {
				for (var i = 0; i <= userID.length - 1 ; i++) {
					if (event.source.userId == userID[i]) {
						if (userIsAnswer[i] == undefined) {						
							userIsAnswer[i] = true;
						}
						pushIn = false;
						userC = i;
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
			}
			UserIdSettingOverwrite();
		}
	
	
		if (event.message.type == 'text') {
			var msg = event.message.text;
			var command = msg.replace(/\s+/g, "");
			var isUpdateDB = false;
			var replyMsg = '';
			//===========================================
			//指令判斷
			//===========================================
			if (command.toLowerCase() == '//mute' && isGroup) {
				if (!groupIsAnswer[groupC]) {
					replyMsg = '休比回應功能已經關閉。';
				}else {
					replyMsg = '休比回應功能關閉。';
					groupIsAnswer[groupC] = false;					
				}
			}else if (command.toLowerCase() == '//mute' && isUser) {
				if (!userIsAnswer[userC]) {
					replyMsg = '休比回應功能已經關閉。';
				}else {
					replyMsg = '休比回應功能關閉。';
					userIsAnswer[userC] = false;									
				}
			}
			
			if (command.toLowerCase() == '//open' && isGroup) {
				if (groupIsAnswer[groupC]) {
					replyMsg = '休比回應功能已經啟動。';
				}else {
					replyMsg = '休比回應功能啟動。';
					groupIsAnswer[groupC] = true;
				}
			}else if (command.toLowerCase() == '//open' && isUser) {
				if (userIsAnswer[userC]) {
					replyMsg = '休比回應功能已經啟動。';
				}else {
					replyMsg = '休比回應功能啟動。';
					userIsAnswer[userC] = true;				
				}
			}
			
			if ((command.toLowerCase().indexOf('//q') == 0) && (command.toLowerCase().indexOf('//a') != -1 )) {
				isUpdateDB = true;
				if ((command.indexOf('//a') - command.indexOf('//q')) > 0) {
					var Q = command.slice((command.indexOf('//q') + 3), command.indexOf('//a'));
					var A = command.slice((command.indexOf('//a') + 3), command.length);
					var garbageCommand = false;
					if ((Q == '') || (A == '')) {
						garbageCommand = true;
					}
					var QtAfPushIn = true;
					var QfAfPushIn = true;
					if (!garbageCommand) {
						for (var i = 0; i <= answerDB.length-1; i ++) {
							if (Q == answerDB[i][0]) {
								for (var a = 0 ; a <= answerDB[i].length-1;a++) {
									if (A == answerDB[i][a]) {
										replyMsg = '資料庫裡已經存有相同的問答。';
										QtAfPushIn = false;
									}
								}
								if (QtAfPushIn) {
									answerDB[i].push(A);
									replyMsg = 
										'對話問答成功寫入資料庫中\n' +
										'問：「' + answerDB[i][0] + '」\n' + 
										'答：「' + answerDB[i][answerDB[i].length-1] + '」';
									QtAfPushIn = false;
								}
								QfAfPushIn = false;
							}
						} 
						if (QfAfPushIn) {
							var newQA = [Q,A];
							answerDB.push(newQA);
							replyMsg = 
								'對話問答成功寫入資料庫中\n' +
								'問：「' + answerDB[answerDB.length-1][0] + '」\n' + 
								'答：「' + answerDB[answerDB.length-1][answerDB[answerDB.length-1].length-1] + '」';
							QfAfPushIn = false;
						}
						AnswerDBOverwrite();
					}else {
						replyMsg = '問答協助請勿輸入空值';
						garbageCommand = false;
					}
				}else {
					replyMsg = '「//q」與「//a」的順序不可對調。';
				}
			}
			
			if (command.toLowerCase() == '//check') {
				replyMsg = '此指令只有開發者能使用。';				
				console.log ('groupID：' + groupID);
				console.log ('userID：' + userID);
				console.log ('groupIsAnswer：' + groupIsAnswer);
				console.log ('userIsAnswer：' + userIsAnswer);
				console.log ('=========');
				console.log ('answerDB：');
				for (var i = 0; i <= answerDB.length-1 ; i++) {
					for (var s = 0; s <= answerDB[i].length-1 ; s++) {
						console.log (answerDB[i][s]);						
					}
					console.log('-----');
				}
					
			}
						
			if (command.toLowerCase() == '//teaching') {
				replyMsg = 
					'請使用指令「//q」設定問題\n' + 
					'並使用指令「//a」設定回覆\n\n' +
					'請將兩個指令輸入在同一則訊息中\n' +
					'並以：\n\n' + 
					'//q問題\n' +
					'//a回答\n\n' +
					'的格式來幫助休比回答更多訊息。\n\n' + 
					'※「//q」與「//a」的順序不可對調\n' +
					'※「//q」必須在訊息開頭就輸入\n' +
					'※指令後不需要空格。\n' +
					'※請不要在「//a」後輸入多餘的訊息，\n' + 
					'這將會造成日後休比的回覆有誤。\n' + 
					'為了給休比有更人性化的回覆，\n' + 
					'感謝您的配合與協助。\n' + 
					'也感謝您看完這段教學。';
			}
			
			//-------------
			//指令偵錯與校正
			//-------------

			if ((command.toLowerCase() == 'mute') ||(command.toLowerCase() == '/mute')) {
				replyMsg = 
					'關閉休比回應功能請輸入「//mute」\n\n' +
					'查看更多指令請輸入「//help」';
			}
			
			if ((command.toLowerCase() == 'open') ||(command.toLowerCase() == '/open')) {
				replyMsg = 
					'重新開啟休比回應功能請輸入「//open」\n\n' +
					'查看更多指令請輸入「//help」';
			}
			
			if ((command.toLowerCase() == 'teaching') ||(command.toLowerCase() == '/teaching')) {
				replyMsg = 
					'查看協助對話教學請輸入「//teaching」\n\n' +
					'查看更多指令請輸入「//help」';
			}
			
			if (((command.toLowerCase() == 'a') || (command.toLowerCase() == 'q') || (command.toLowerCase().indexOf('/a') != -1) || (command.toLowerCase().indexOf('/q') != -1)) && !isUpdateDB) {
				replyMsg = 
					'協助對話指令「//q」必須與「//a」連用\n' +
					'查看協助對話教學請輸入「//teaching」\n\n' +
					'查看更多指令請輸入「//help」';
			}
			
			if ((command.toLowerCase() == 'help') ||(command.toLowerCase() == '/help')) {
				replyMsg = 
					'查看更多指令請輸入「//help」';
			}
			
			if ((command.toLowerCase() == 'check') ||(command.toLowerCase() == '/check')) {
				replyMsg = 
					'欲使後臺顯示詳細訊息請輸入「//check」\n' + 
					'※此指令為開發者指令\n\n' + 
					'查看更多指令請輸入「//help」';
			}
			
			//-------------
			//所有指令列
			//-------------
			if ((command.toLowerCase() == '//help') || (command.toLowerCase() == '//')) {
				replyMsg = 
					'休比的使用說明：\n' + 
					'一、為了讓休比更方便判斷指令\n' + 
					'請在開頭加入雙斜線「//」\n' +
					'二、指令不需區分大小寫。\n\n' +
					'休比的指令列表：\n' + 
					'help：查看休比目前擁有的指令\n' +
					'mute：關閉休比的回應功能。\n' + 
					'open：開啟休比的回應功能。\n' +
					'q：為休比設定問題以輸入資料庫\n' + 
					'　　※須與a連用。\n' + 
					'a：為休比設定回答以輸入資料庫\n' + 
					'　　※須與q連用。\n' + 
					'check：後臺顯示詳細訊息。\n' + 
					'teaching：查看協助對話教學。\n';
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
					var answerNotFound = true;
					for (var i = 0; i <= answerDB.length-1 ; i++) {
						if (answerDB[i][0] == msg) {
							var ans = Math.floor((Math.random() * (answerDB[i].length - 1)) + 1);
							replyMsg = answerDB[i][ans];
							answerNotFound = false;
						}
					}
					if (answerNotFound) {
						replyMsg = 
							'無法辨別「' + msg + '」的意義\n' + 
							'如果你願意幫助休比回答問題\n' + 
							'請輸入指令「//teaching」' + 
							'查看教導休比回答的方法。';
							answerNotFound = false;
					}
				}
			}
			

			event.reply(replyMsg).then(function(data) {
				console.log (replyMsg);
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
		var pushIn = true;
		if (groupID.length != 0) {
			for (var i = 0; i <= groupID.length - 1 ; i++) {
				if (group == groupID[i]) {
					replyMsg = '休比又回來了，請多多指教。';
					pushIn = false;
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
		GroupIdSettingOverwrite();
		
		
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
		var pushIn = true;
		if (userID.length != 0) {
			for (var i = 0; i <= userID.length - 1 ; i++) {
				if (user == userID[i]) {
					replyMsg = '謝謝你讓休比有懺悔的機會，我們又是朋友了。';
					pushIn = false;
				}
			}
			if (pushIn) {
				userID.push(user);
				replyMsg = '謝謝你加我為好友！無聊的時候可以跟我聊聊。';				
				pushIn = false;
			}
		}else {
			userID.push(user);
			replyMsg = '謝謝你加我為好友！無聊的時候可以跟我聊聊。';
		}
		UserIdSettingOverwrite();
		
		event.reply(replyMsg).then(function(data) {
			console.log(replyMsg);
		}).catch(function(error) {
			console.log('error');
		});
	});
}

function AnswerDBOverwrite() {	
   var request = {
      auth: oauth2Client,
      spreadsheetId: mySheetId,
      range:encodeURI('replyDB'),
      valueInputOption: 'RAW',
      resource: {
        "values": 
          answerDB        
      }
   };
   var sheets = google.sheets('v4');
   sheets.spreadsheets.values.update(request, function(err, response) {
      if (err) {
         console.log('The API returned an error: ' + err);
         return;
      }
   });
}

function UserIdSettingOverwrite() {
	var settingLength = Math.max(userID.length,userIsAnswer.length);
	var settingUpdate = [];
	settingUpdate[0] = ['userId','userIsAnswer'];
	for (i=1; i<=settingLength; i++) {
		settingUpdate[i] = [userID[i-1],userIsAnswer[i-1]];
	}
	var request = {
		auth: oauth2Client,
		spreadsheetId: mySheetId,
		range:encodeURI('usersetting'),
		valueInputOption: 'RAW',
		resource: {
			"values": 
			settingUpdate        
		}
	};
	var sheets = google.sheets('v4');
	sheets.spreadsheets.values.update(request, function(err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
			return;
		}
	});
}

function GroupIdSettingOverwrite() {
	var settingLength = Math.max(groupID.length,groupIsAnswer.length);
	var settingUpdate = [];
	settingUpdate[0] = ['groupId','groupIsAnswer'];
	for (i=1; i<=settingLength; i++) {
		settingUpdate[i] = [groupID[i-1],groupIsAnswer[i-1]];
	}
	var request = {
		auth: oauth2Client,
		spreadsheetId: mySheetId,
		range:encodeURI('groupsetting'),
		valueInputOption: 'RAW',
		resource: {
			"values": 
			settingUpdate        
		}
	};
	var sheets = google.sheets('v4');
	sheets.spreadsheets.values.update(request, function(err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
			return;
		}
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

function _update() {
	clearTimeout(timer3);
		AnswerDBOverwrite();
		UserIdSettingOverwrite();
		GroupIdSettingOverwrite();
		getQuestions();
		getIdData();
		console.log('數據庫已更新');
    timer3 = setInterval(_update, 60000); //每60s更新	
}