var linebot = require('linebot');
var express = require('express');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var member = require('./routes/utility/member');
var view = require('./routes/utility/view');
var myFunction = require('./routes/utility/myFunction');

var allWorkData = [];

var bot = linebot({
	channelId: '1627582693',
	channelSecret: '7e8291f8ca70e509c82447b342850c26',
	channelAccessToken: 'yGyJ8rmKut2x0ie7yLZD3Raeln0IUfSsegVEsESsA5a4/xdGL5Dye3PaFG7U/s5PW+EYmOZEE/zTKqyD9VGnsVInn7qY/Tgpybe9Rs7hgGIxYCiIA9S9y6HfUkBJ9/OFQV8vtPrYAZRYNwlkUGcH6wdB04t89/1O/w1cDnyilFU='
});

var myClientSecret = {
	"installed": {
		"client_id": "826945543828-bkch7mebbit467p84hkc2h1t88vmk0ul.apps.googleusercontent.com",
		"project_id": "phonic-agility-178912",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://accounts.google.com/o/oauth2/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_secret": "9BZXk3XPV_hWCeFZP7whFBoS",
		"redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
	}
};

var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(myClientSecret.installed.client_id, myClientSecret.installed.client_secret, myClientSecret.installed.redirect_uris[0]);

oauth2Client.credentials = {
	"access_token": "ya29.GltrBUPv62sRXPU_WI2iGkqNhpXnmSq511j-G-JNTiWNj8uBbHrxLVySEkrTqDh-WOwG3eacrcSiFlXB-mVelkEISTyiAW5aeRIc7AuO5JEKlJMKJyM2NMzprknZ",
	"refresh_token": "1/FYb8760SodoyLtuX5yrnbbaulbW4l5JcxO4SyrPuOfg",
	"token_type": "Bearer",
	"expiry_date": 1519378285674
};

var mySheetId = '1uVOVQFbClX6BTZDEEzrKMT5Rq7wQX7CkApYMlMcvXpo';
//●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●以上為基本資料●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●


//●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●以下為ＡＩ程式●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●

// var aiDB = [];
// _Start();
_bot();

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});


// function _Start() {
// 	getAIDatas();
// }

// function getPoSAmountAndPosition(message, sort) {
// 	var amountAndPosition = [];
// 	for (var i = 0; i <= message.length - 1; i++) {
// 		for (var a = 1; a <= aiDB[sort].length - 1; a++) {
// 			if (message.substr(i, 1) == aiDB[sort][a]) {
// 				amountAndPosition.push(i);
// 			}
// 		}
// 	}
// 	return amountAndPosition;
// }

// 每十分鐘更新一次資料
function UpdateAllWorkData() {
	view.myWorkAllData().then(data => {
		allWorkData = [];
		stringAllWorkData = [];
		for (let a = 0; a < data.length; a++) {
			let project_enddate = myFunction.SeparateDate(data[a].project_enddate + '')
			let deadline = data[a].deadline != null ? myFunction.SeparateDate(data[a].deadline + '') : null
			let workData = {
				user_id: data[a].user_id,
				member_name: data[a].member_name,
				linebotpush: data[a].linebotpush,
				project_name: data[a].project_name,
				project_hint: data[a].project_hint,
				project_enddate: project_enddate,
				work_title: data[a].work_title,
				deadline: deadline,
				work_hint: data[a].work_hint
			}

			if (!stringAllWorkData.includes(JSON.stringify(workData))) {
				stringAllWorkData.push(JSON.stringify(workData))
				allWorkData.push(workData)
			}

		}
		console.log(allWorkData)
	})
}

UpdateAllWorkData();

let updataData = setInterval(UpdateAllWorkData, 600000);


let time = [2019, 10, 5, 6, 45, 0];
let push = setInterval(function () {
	let nowDateArray = myFunction.SeparateDate(Date());
	nowDateArray[3] += 8;
	for (let allDataIndex = 0; allDataIndex < allWorkData.length; allDataIndex++) {
		let project_enddate = allWorkData[allDataIndex].project_enddate;
		let deadline = allWorkData[allDataIndex].deadline;
		let pushProjectText = '';
		let pushWorkText = '';

		// =================================專案提醒判斷================================
		// 在12小時以前提醒專案到期
		let projectPushTime_12h = myFunction.BeforeDate(project_enddate, [0, 0, 0, 12, 0, 0]);
		let projectPushMessage_12h = true;
		for (let a = 0; a < 6; a++) {
			if (nowDateArray[a] != projectPushTime_12h[a]) {
				projectPushMessage_12h = false;
			}
		}

		// 在一個禮拜以前提醒專案到期
		let projectPushTime_7d = myFunction.BeforeDate(project_enddate, [0, 0, 7, 0, 0, 0]);
		let projectPushMessage_7d = true;
		for (let a = 0; a < 6; a++) {
			if (nowDateArray[a] != projectPushTime_7d[a]) {
				projectPushMessage_7d = false;
			}
		}

		// 在一個月以前提醒專案到期
		let projectPushTime_1m = myFunction.BeforeDate(project_enddate, [0, 1, 0, 0, 0, 0]);
		let projectPushMessage_1m = true;
		for (let a = 0; a < 6; a++) {
			if (nowDateArray[a] != projectPushTime_1m[a]) {
				projectPushMessage_1m = false;
			}
		}

		if (projectPushMessage_12h || projectPushMessage_7d || projectPushMessage_1m) {
			pushProjectText = 'Hi! ' + allWorkData[allDataIndex].member_name + '\n' +
				'您的專案【' + allWorkData[allDataIndex].project_name + '】將在\n' +
				project_enddate[0] + '/' + project_enddate[1] + '/' + project_enddate[2] + ' ' +
				project_enddate[3] + ':' + project_enddate[4] + ':' + project_enddate[5] + '結束\n';
			userId = allWorkData[allDataIndex].user_id;
			bot.push(userId, [pushProjectText]);
		}

		// =================================工作提醒判斷================================
		if (deadline != null) {
			// 在1小時以前提醒工作到期
			let workPushTime_12h = myFunction.BeforeDate(deadline, [0, 0, 0, 1, 0, 0]);
			let workPushMessage_12h = true;
			for (let a = 0; a < 6; a++) {
				if (nowDateArray[a] != workPushTime_12h[a]) {
					workPushMessage_12h = false;
				}
			}

			// 在一天以前提醒工作到期
			let workPushTime_7d = myFunction.BeforeDate(deadline, [0, 0, 1, 0, 0, 0]);
			let workPushMessage_7d = true;
			for (let a = 0; a < 6; a++) {
				if (nowDateArray[a] != workPushTime_7d[a]) {
					workPushMessage_7d = false;
				}
			}

			// 在三天以前提醒專案到期
			let workPushTime_1m = myFunction.BeforeDate(deadline, [0, 0, 3, 0, 0, 0]);
			let workPushMessage_1m = true;
			for (let a = 0; a < 6; a++) {
				if (nowDateArray[a] != workPushTime_1m[a]) {
					workPushMessage_1m = false;
				}
			}

			if (workPushMessage_12h || workPushMessage_7d || workPushMessage_1m) {
				pushWorkText = 'Hi! ' + allWorkData[allDataIndex].member_name + '\n' +
					'您在專案【' + allWorkData[allDataIndex].project_name + '】的工作\n' +
					'「' + allWorkData[allDataIndex].work_title + '」將在\n' +
					deadline[0] + '/' + deadline[1] + '/' + deadline[2] + ' ' +
					deadline[3] + ':' + deadline[4] + ':' + deadline[5] + '結束\n';
				userId = allWorkData[allDataIndex].user_id;
				bot.push(userId, [pushWorkText]);
			}
		}

	}
	// var userId = ['U30986dc43eb2232855acbb5718be7c87', 'U48fc817916ce8d7737e6b13d657c333f'];
	// var sendMsg = nowDateArray[0] + '年' + nowDateArray[1] + '月' + nowDateArray[2] + '日 ' +
	// 	(nowDateArray[3] + 8) + '點' + nowDateArray[4] + '分' + nowDateArray[5] + '秒';
	// let isNow = true;
	// for (let a = 0; a < time.length; a++) {
	// 	if (nowDateArray[a] != time[a]) {
	// 		isNow = false;
	// 	}
	// }
	// if (isNow) {
	// 	for (let b = 0; b < userId.length; b++) {
	// 		bot.push(userId[b], [sendMsg]);
	// 		console.log('userId: ' + userId[b]);
	// 		console.log('send: ' + sendMsg);
	// 	}
	// }

}, 1000);

function _bot() {
	bot.on('message', function (event) {
		var msg = event.message.text;
		var command = msg.replace(/\s+/g, "");
		var replyMsg = '愛你唷 <3';
		CheckMember(event);
		/*
    if (event.message.type == 'text') {
      var containCount = 0;
      var PoS = [];
      //取得詞性數量與位置
      for (var c = 0; c <= aiDB.length - 1; c ++) {
        PoS[c] = getPoSAmountAndPosition(msg, c);
      }

      console.log(PoS);
    }
*/

		if (event.source.userId == 'U30986dc43eb2232855acbb5718be7c87') {
			if (event.source.groupId == undefined) {
				member.displayMember(event.source.userId).then(data => {
					console.log(data[0].member_name)
				})
				//傳送訊息
				// event.reply(replyMsg).then(function (data) {
				// 	console.log(replyMsg);
				// }).catch(function (error) {
				// 	console.log('error');
				// });
			}
			//重新讀取資料
			if (msg == '//getAIData') {
				getAIDatas();
			}
		}

	});

	bot.on('follow', function (event) {
		CheckMember(event);
	});
}

function CheckMember(event) {
	event.source.profile().then(function (profile) {
		member.displayMember(event.source.userId).then(data => {
			if (data == false) {
				let memberData = {
					user_id: event.source.userId,
					photo: null,
					member_name: profile.displayName,
					email: null,
					member_password: '',
					linebotpush: true
				}
				member.addMember(memberData).then(data2 => {
					if (data2) {
						let replyMsg = '你好，感謝你加我為朋友'
						event.reply(replyMsg).then(function (data) {
							console.log(replyMsg);
						}).catch(function (error) {
							console.log('error');
						});
					} else {
						console.log('寫入資料庫時發生問題');
						return;
					}
				})
			}
		})
	});


}

function getAIDatas() {
	var sheets = google.sheets('v4');
	sheets.spreadsheets.values.get({
		auth: oauth2Client,
		spreadsheetId: mySheetId,
		range: encodeURI('AITest'),
	}, function (err, response) {
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
				aiDB[i] = rows[i];
			}
		}
	});
}

//●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●以下為原始程式●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
/*
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

			if (event.source.userId == 'U6e7d4242219e379cb8dfa26b62cda593') {
				event.reply(replyMsg).then(function(data) {
					console.log (replyMsg);
				}).catch(function(error) {
					console.log('error');
				});
			}
		}
	});

	bot.on('join', function(event) {
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//被加入群組時，將群組ID加入名單陣列
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★
		var groupC = 0;
		var isGroup = true;
		var replyMsg = '';
		var pushIn = true;

		if (groupID.length != 0) {
			for (var i = 0; i <= groupID.length - 1 ; i++) {
				if (event.source.groupId == groupID[i]) {
					replyMsg = '休比又回來了，請多多指教。';
					if (groupIsAnswer[i] == undefined) {
							groupIsAnswer[i] = true;
					}
					pushIn = false;
					groupC = i;
				}
			}
			if (pushIn) {
				replyMsg = '謝謝你把我加進這個群組，請大家多多指教。';
				groupID.push(event.source.groupId);
				groupC = groupID.length-1;
				groupIsAnswer[groupC] = true;
				pushIn = false;
			}
		} else {
			replyMsg = '謝謝你把我加進這個群組，請大家多多指教。';
			groupID.push(event.source.groupId);
			groupC = groupID.length-1;
			groupIsAnswer[groupC] = true;
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
		var userC = 0;
		var isUser = true;
		var pushIn = true;
		var replyMsg = '';

		if (userID.length != 0) {
			for (var i = 0; i <= userID.length - 1 ; i++) {
				if (event.source.userId == userID[i]) {
					replyMsg = '謝謝你讓休比有懺悔的機會，我們又是朋友了。';
					if (userIsAnswer[i] == undefined) {
						userIsAnswer[i] = true;
					}
					pushIn = false;
					userC = i;
				}
			}
			if (pushIn) {
				replyMsg = '謝謝你加我為好友！無聊的時候可以跟我聊聊。';
				userID.push(event.source.userId);
				userC = userID.length-1;
				userIsAnswer[userC] = true;
				pushIn = false;
			}
		} else {
			replyMsg = '謝謝你加我為好友！無聊的時候可以跟我聊聊。';
			userID.push(event.source.userId);
			userC = userID.length-1;
			userIsAnswer[userC] = true;
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
*/