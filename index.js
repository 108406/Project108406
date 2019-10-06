var linebot = require('linebot');
var express = require('express');
var https = require('https');
var member = require('./routes/utility/member');
var view = require('./routes/utility/view');
var myFunction = require('./routes/utility/myFunction');

var allWorkData = [];

var bot = linebot({
	channelId: '1627582693',
	channelSecret: '7e8291f8ca70e509c82447b342850c26',
	channelAccessToken: 'yGyJ8rmKut2x0ie7yLZD3Raeln0IUfSsegVEsESsA5a4/xdGL5Dye3PaFG7U/s5PW+EYmOZEE/zTKqyD9VGnsVInn7qY/Tgpybe9Rs7hgGIxYCiIA9S9y6HfUkBJ9/OFQV8vtPrYAZRYNwlkUGcH6wdB04t89/1O/w1cDnyilFU='
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});

setInterval(function () {
	https.get("https://thelinebotpractice.herokuapp.com/");
}, 300000);

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
	})
}

UpdateAllWorkData();

let updataData = setInterval(UpdateAllWorkData, 600000);

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
				project_enddate[3] + ':' + project_enddate[4] + ':' + project_enddate[5] + '結束';
			if (allWorkData[allDataIndex].linebotpush && allWorkData[allDataIndex].project_hint) {
				userId = allWorkData[allDataIndex].user_id;
				bot.push(userId, [pushProjectText]);
			}
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
					deadline[3] + ':' + deadline[4] + ':' + deadline[5] + '結束';
				if (allWorkData[allDataIndex].linebotpush && allWorkData[allDataIndex].work_hint) {
					userId = allWorkData[allDataIndex].user_id;
					bot.push(userId, [pushWorkText]);
				}
			}
		}

	}
}, 1000);

function _bot() {
	bot.on('message', function (event) {
		var msg = event.message.text;
		var replyMsg = '愛你唷 <3';
		CheckMember(event);
		console.log(msg)
		console.log(event.source.userId);
		event.reply(replyMsg).then(function (data) {
			console.log(replyMsg);
		}).catch(function (error) {
			console.log('error');
		});
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
_bot();