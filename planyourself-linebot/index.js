var linebot = require('linebot');
var line = require('@line/bot-sdk');
var express = require('express');
var fs = require('fs');
var member = require('./routes/utility/member');
var teammember = require('./routes/utility/teammember');
var view = require('./routes/utility/view');
var project = require('./routes/utility/project');
var Admin = require('./routes/utility/Admin');
var Messenge = require('./routes/utility/Messenge');
var myFunction = require('./routes/utility/myFunction');

var allWorkData = [];

var bot = linebot({
	channelId: '1653538178',
	channelSecret: '55bd1ecab193602fb14635d5a808923b',
	channelAccessToken: '2mEEc+12z5ghHzMoVuF77NuMlGZudmFnWE5yB5fYDQN2H1vOqfMSlYEgKqs835kDrccDVGvHxJSMSQIlN+aVtGdSCPc2NKH2ATQTfnoewYdmM2ed0YQQEF3FjO9vOLjZnJ/eHUWLQJhBLVIokDgz+gdB04t89/1O/w1cDnyilFU='
});

var client = new line.Client({
	channelId: '1653538178',
	channelSecret: '55bd1ecab193602fb14635d5a808923b',
	channelAccessToken: '2mEEc+12z5ghHzMoVuF77NuMlGZudmFnWE5yB5fYDQN2H1vOqfMSlYEgKqs835kDrccDVGvHxJSMSQIlN+aVtGdSCPc2NKH2ATQTfnoewYdmM2ed0YQQEF3FjO9vOLjZnJ/eHUWLQJhBLVIokDgz+gdB04t89/1O/w1cDnyilFU='
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});

const richmenu = {
	"size": {
		"width": 1200,
		"height": 810
	},
	"selected": false,
	"name": "Plan Yourself",
	"chatBarText": "快速選單",
	"areas": [{
		"bounds": {
			"x": 0,
			"y": 0,
			"width": 400,
			"height": 405
		},
		"action": {
			"type": "message",
			"text": "#我的工作"
		}
	}, {
		"bounds": {
			"x": 400,
			"y": 0,
			"width": 400,
			"height": 405
		},
		"action": {
			"type": "message",
			"text": "#我的計畫"
		}
	}, {
		"bounds": {
			"x": 0,
			"y": 405,
			"width": 400,
			"height": 405
		},
		"action": {
			"type": "message",
			"text": "#我的快到期計畫"
		}
	}, {
		"bounds": {
			"x": 400,
			"y": 405,
			"width": 400,
			"height": 405
		},
		"action": {
			"type": "message",
			"text": "#幫助"
		}
	}]
	// Other rich menu object properties
	// ...
}

// client.getRichMenuList().then((list) => {
// 	console.log(list);
// 	for (let index = 0; index < list.length; index++) {
// 		client.deleteRichMenu(list[index].richMenuId).then(data => {
// 			console.log('delete successful!')
// 		}).catch(err => {
// 			console.log(err)
// 		})
// 	}
// }).catch((err) => {
// 	console.log(err)
// })

// client.getRichMenuIdOfUser('U30986dc43eb2232855acbb5718be7c87').then(data => {
// 	console.log('getRichMenuIdOfUser: ')
// 	console.log(data)
// }).catch(err => {
// 	console.log('getRichMenuIdOfUser_ERR: ')
// 	console.log(err)
// }) 

// client.getRichMenuList().then(data => {
// 	console.log('getRichMenuList: ')
// 	console.log(data)
// }).catch(err => {
// 	console.log('getRichMenuList_ERR: ')
// 	console.log(err)
// })

// client.setRichMenuImage('richmenu-e88768363d8d7c367173514305570ed3', fs.createReadStream('./img/menu.png')).then(data => {
// 	console.log(data)
// }).catch(err => {
// 	console.log(err)
// })

// client.linkRichMenuToUser('all', 'richmenu-e88768363d8d7c367173514305570ed3').then(data => {
// 	console.log('successful!')
// }).catch(err => {
// 	console.log(err)
// })

// client.createRichMenu(richmenu).then((richMenuId) => {
// 	console.log(richMenuId)
// }).catch((err) => {
// 	console.log('err: ');
// 	console.log(err);
// })

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
	//撈資料組長公告訊息
	Admin.AdminMessengePushJdge().then(data => {
		AdminallWorkData = [];
		AdminstringAllWorkData = [];
		for (let a = 0; a < data.length; a++) {
			let isPushed = true;
			let now = Date.now();
			let startdate = new Date(new Date(data[a].adminpush_startdate).getTime() - 28800000).getTime();
			if (now - 70000 < startdate) {
				isPushed = false;
			}
			let adminpush_enddate = myFunction.SeparateDate(data[a].adminpush_enddate + '')
			let workData = {
				user_id: data[a].user_id,
				linebotpush: data[a].linebotpush,
				adminpush_content: data[a].adminpush_content,
				adminpush_startdate: startdate,
				adminpush_enddate: adminpush_enddate,
				isPushed: isPushed
			}
			if (!AdminstringAllWorkData.includes(JSON.stringify(workData))) {
				AdminstringAllWorkData.push(JSON.stringify(workData))
				AdminallWorkData.push(workData)
			}
		}
	})
}

UpdateAllWorkData();

let updataData = setInterval(UpdateAllWorkData, 60000);

let hint = setInterval(function () {
	let nowDateArray = myFunction.SeparateDate(Date());
	nowDateArray[3] += 8;
	for (let allDataIndex = 0; allDataIndex < allWorkData.length; allDataIndex++) {
		let project_enddate = allWorkData[allDataIndex].project_enddate;
		let deadline = allWorkData[allDataIndex].deadline;
		let pushProjectText = '';
		let pushWorkText = '';

		// =================================計畫提醒判斷================================
		// 在12小時以前提醒計畫到期
		let projectPushTime_12h = myFunction.BeforeDate(project_enddate, [0, 0, 0, 12, 0, 0]);
		let projectPushMessage_12h = true;
		for (let a = 0; a < 6; a++) {
			if (nowDateArray[a] != projectPushTime_12h[a]) {
				projectPushMessage_12h = false;
			}
		}

		// 在一個禮拜以前提醒計畫到期
		let projectPushTime_7d = myFunction.BeforeDate(project_enddate, [0, 0, 7, 0, 0, 0]);
		let projectPushMessage_7d = true;
		for (let a = 0; a < 6; a++) {
			if (nowDateArray[a] != projectPushTime_7d[a]) {
				projectPushMessage_7d = false;
			}
		}

		// 在一個月以前提醒計畫到期
		let projectPushTime_1m = myFunction.BeforeDate(project_enddate, [0, 1, 0, 0, 0, 0]);
		let projectPushMessage_1m = true;
		for (let a = 0; a < 6; a++) {
			if (nowDateArray[a] != projectPushTime_1m[a]) {
				projectPushMessage_1m = false;
			}
		}

		if (projectPushMessage_12h || projectPushMessage_7d || projectPushMessage_1m) {
			pushProjectText = 'Hi! ' + allWorkData[allDataIndex].member_name + '\n' +
				'您的計畫【' + allWorkData[allDataIndex].project_name + '】將在\n' +
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

			// 在三天以前提醒計畫到期
			let workPushTime_1m = myFunction.BeforeDate(deadline, [0, 0, 3, 0, 0, 0]);
			let workPushMessage_1m = true;
			for (let a = 0; a < 6; a++) {
				if (nowDateArray[a] != workPushTime_1m[a]) {
					workPushMessage_1m = false;
				}
			}

			if (workPushMessage_12h || workPushMessage_7d || workPushMessage_1m) {
				pushWorkText = 'Hi! ' + allWorkData[allDataIndex].member_name + '\n' +
					'您在計畫【' + allWorkData[allDataIndex].project_name + '】的工作\n' +
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

//--------------------------------
// 推播資料
//--------------------------------
let push = setInterval(function () {
	let nowDateArray = myFunction.SeparateDate(Date());
	nowDateArray[3] += 8;
	for (let allDataIndex = 0; allDataIndex < AdminallWorkData.length; allDataIndex++) {
		let adminpush_startdate = AdminallWorkData[allDataIndex].adminpush_startdate;
		let adminpush_enddate = AdminallWorkData[allDataIndex].adminpush_enddate;
		let pushWorkText = [];
		// =================================專案提醒判斷================================
		if (adminpush_startdate > 0) {
			// 在5個小時前
			if (!AdminallWorkData[allDataIndex].isPushed) {
				pushWorkText.push({
					"type": "flex",
					"altText": "組長提醒：",
					"contents": {
						"type": "bubble",
						"body": {
							"type": "box",
							"layout": "vertical",
							"spacing": "md",
							"contents": [{
								"type": "box",
								"layout": "vertical",
								"contents": [{
									"type": "text",
									"text": "組長提醒",
									"align": "center",
									"size": "lg",
									"weight": "bold"
								},
								{
									"type": "text",
									"text": AdminallWorkData[allDataIndex].adminpush_content,
									"wrap": true,
									"margin": "lg"
								}
								]
							},
							{
								"type": "separator"
							},
							{
								"type": "text",
								"text": '結束時間:' +
									adminpush_enddate[0] + '/' + adminpush_enddate[1] + '/' + adminpush_enddate[2] + ' ' +
									adminpush_enddate[3] + ':' + adminpush_enddate[4] + ':' + adminpush_enddate[5],
								"wrap": true,
								"size": "xs",
								"align": "center",
								"weight": "bold",
								"margin": "lg"
							}
							]
						}
					}
				})
				if (AdminallWorkData[allDataIndex].linebotpush) {
					userId = AdminallWorkData[allDataIndex].user_id;
					bot.push(userId, pushWorkText);
				}
				AdminallWorkData[allDataIndex].isPushed = true;
			}

		}
	}
}, 1000);

let talkingUser = [];
let readyToInviteGroup = [];
let bindGroupAndProjectId = [];
let lockUserInGroup = [];
let updateGroupId = [];

function _bot() {
	bot.on('message', function (event) {
		if (event.message.type == 'text') {
			var msg = event.message.text;
			var replyMsg = '您好。';

			if (event.source.groupId != undefined) {
				if (msg == '#加入專案' || msg == '#加入計劃' || msg == '#加入計畫') {
					if (!talkingUser.includes(event.source.userId)) {
						talkingUser.push(event.source.userId);
						readyToInviteGroup.push(event.source.groupId);

						for (let a = 0; a < lockUserInGroup.length; a++) {
							if (lockUserInGroup[a][0] == event.source.groupId) {
								lockUserInGroup.splice(a, 1);
							}
						}

						event.reply('請輸入計畫代碼\n（Ex: [Jfi310DF]）').then(function (data) {
							console.log(replyMsg);
						}).catch(function (error) {
							console.log('error');
						});
					}
				}

				if (msg == '#我要加入' && bindGroupAndProjectId.length > 0) {
					let groupId = event.source.groupId;
					let bindIndex = -1;
					for (let a = 0; a < lockUserInGroup.length; a++) {
						if (lockUserInGroup[a][0] == event.source.groupId &&
							lockUserInGroup[a][1] == event.source.userId) {
							return;
						}
					}
					for (let a = 0; a < bindGroupAndProjectId.length; a++) {
						if (bindGroupAndProjectId[a][0] == groupId) {
							bindIndex = a;
						}
					}
					event.source.profile().then(function (profile) {
						member.displayMember(event.source.userId).then(result => {
							if (result == false) {
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
										console.log('已將使用者' + profile.displayName + '加入資料庫');
										teammember.addTeamMember(event.source.userId, bindGroupAndProjectId[bindIndex][1], groupId, false).then(result => {
											if (result) {
												replyMsg = '已成功將' + profile.displayName + '加入計畫【' +
													bindGroupAndProjectId[bindIndex][2] + '】中。'
												event.reply(replyMsg).then(function (data) {
													console.log(replyMsg);
												}).catch(function (error) {
													console.log('error');
												});
												let userInGroup = [event.source.groupId, event.source.userId]
												lockUserInGroup.push(userInGroup);
											} else {
												replyMsg = '抱歉。將' + profile.displayName + '加入計畫【' +
													bindGroupAndProjectId[bindIndex][2] + '】時發生問題。\n' +
													'請再重新嘗試一次。\n\n若多次嘗試仍未成功，請聯繫我們。'
												event.reply(replyMsg).then(function (data) {
													console.log(replyMsg);
												}).catch(function (error) {
													console.log('error');
												});
											}
										})
									} else {
										console.log('寫入資料庫時發生問題');
										return;
									}
								})
							} else {
								teammember.VerificationTeamMember(event.source.userId, bindGroupAndProjectId[bindIndex][1]).then(data => {
									if (!data) {
										teammember.addTeamMember(event.source.userId, bindGroupAndProjectId[bindIndex][1], groupId, false).then(result => {
											if (result) {
												replyMsg = '已成功將' + profile.displayName + '加入計畫【' +
													bindGroupAndProjectId[bindIndex][2] + '】中。'
												event.reply(replyMsg).then(function (data) {
													console.log(replyMsg);
												}).catch(function (error) {
													console.log('error');
												});
												let userInGroup = [event.source.groupId, event.source.userId]
												lockUserInGroup.push(userInGroup);
											} else {
												replyMsg = '抱歉。將' + profile.displayName + '加入計畫【' +
													bindGroupAndProjectId[bindIndex][2] + '】時發生問題。\n' +
													'請再重新嘗試一次。\n\n若多次嘗試仍未成功，請聯繫我們。'
												event.reply(replyMsg).then(function (data) {
													console.log(replyMsg);
												}).catch(function (error) {
													console.log('error');
												});
											}
										})
									} else {
										teammember.FetchTeamMember(event.source.userId, bindGroupAndProjectId[bindIndex][1]).then(data => {
											if (data.group_id == null || data.group_id == '') {
												teammember.updateTeamMember(event.source.userId, bindGroupAndProjectId[bindIndex][1], groupId, data.isadmin).then(data => {
													replyMsg = '您好，' + profile.displayName + '。\n已將您與計畫【' +
														bindGroupAndProjectId[bindIndex][2] + '】連結。'
													event.reply(replyMsg).then(function (data) {
														console.log(replyMsg);
													}).catch(function (error) {
														console.log('error');
													});
													let userInGroup = [event.source.groupId, event.source.userId]
													lockUserInGroup.push(userInGroup);
												});
											} else {
												if (data.group_id == groupId) {
													replyMsg = '您好，' + profile.displayName + '。\n您已經在計畫【' +
														bindGroupAndProjectId[bindIndex][2] + '】中囉。'
													event.reply(replyMsg).then(function (data) {
														console.log(replyMsg);
													}).catch(function (error) {
														console.log('error');
													});
													let userInGroup = [event.source.groupId, event.source.userId]
													lockUserInGroup.push(userInGroup);
												} else {
													replyMsg = '您好，' + profile.displayName + '。\n很抱歉，您在計畫【' +
														bindGroupAndProjectId[bindIndex][2] + '】中已經與其他群組連結囉。\n' +
														'請問是否要取消與先前群組的連結，並重新連結此群組呢？';
													let updateGroupIdData = [event.source.userId, event.source.groupId,
													bindGroupAndProjectId[bindIndex][1], bindGroupAndProjectId[bindIndex][2]
													];
													updateGroupId.push(updateGroupIdData);
													// 在這裡開始要做個回應讓使用者選擇，並做判斷讓使用者的群組ID更新或不更新。
													event.reply(replyMsg).then(function (data) {
														console.log(replyMsg);
													}).catch(function (error) {
														console.log('error');
													});
													let replyFlex = {
														"type": "flex",
														"altText": "this is a flex message",
														"contents": {
															"type": "bubble",
															"body": {
																"type": "box",
																"layout": "vertical",
																"contents": [{
																	"type": "box",
																	"layout": "vertical",
																	"contents": [{
																		"type": "text",
																		"text": "是否重新連結",
																		"align": "center"
																	}]
																}, {
																	"type": "text",
																	"text": "　",
																	"align": "center"
																},
																{
																	"type": "box",
																	"layout": "horizontal",
																	"paddingStart": "40px",
																	"paddingEnd": "40px",
																	"contents": [{
																		"type": "button",
																		"action": {
																			"type": "message",
																			"label": "是",
																			"text": "#重新連結"
																		},
																		"style": "primary",
																		"height": "sm",
																		"color": "#52C759",
																		"position": "relative",
																		"flex": 2
																	},
																	{
																		"type": "button",
																		"action": {
																			"type": "message",
																			"label": "否",
																			"text": "#保留"
																		},
																		"style": "primary",
																		"height": "sm",
																		"color": "#C74741",
																		"position": "relative",
																		"flex": 2,
																		"margin": "md",
																	}
																	]
																}
																]
															}
														}
													};
													bot.push(event.source.groupId, [replyFlex])
													let userInGroup = [event.source.groupId, event.source.userId]
													lockUserInGroup.push(userInGroup);
												}
											}
										});
									}
								})
							}
						})
					})
				}

				if (msg == '#重新連結') {
					if (updateGroupId.length > 0) {
						let updateGroupIdIndex = -1;
						for (let a = 0; a < updateGroupId.length; a++) {
							if (updateGroupId[a][0] == event.source.userId &&
								updateGroupId[a][1] == event.source.groupId) {
								updateGroupIdIndex = a;
							}
						}
						if (updateGroupIdIndex != -1) {
							event.source.profile().then(function (profile) {
								teammember.FetchTeamMember(event.source.userId, updateGroupId[updateGroupIdIndex][2]).then(data => {
									teammember.updateTeamMember(event.source.userId, data.project_id, event.source.groupId, data.isadmin).then(data => {
										replyMsg = '您好，' + profile.displayName + '。\n已將您與計畫【' +
											updateGroupId[updateGroupIdIndex][3] + '】重新連結至此群組。'
										event.reply(replyMsg).then(function (data) {
											console.log(replyMsg);
										}).catch(function (error) {
											console.log('error');
										});
										let userInGroup = [event.source.groupId, event.source.userId]
										lockUserInGroup.push(userInGroup);
										updateGroupId.splice(updateGroupIdIndex, 1);
									});
								});
							});
						} else {
							console.log('資料有誤')
						}
					}
				}
				if (msg == '#保留') {
					if (updateGroupId.length > 0) {
						event.source.profile().then(function (profile) {
							for (let a = 0; a < updateGroupId.length; a++) {
								if (updateGroupId[a][0] == event.source.userId &&
									updateGroupId[a][1] == event.source.groupId) {
									updateGroupId.splice(a, 1);
								}
							}

							replyMsg = '您好，' + profile.displayName + '。\n我們將保留您原本的計畫連結。'
							event.reply(replyMsg).then(function (data) {
								console.log(replyMsg);
							}).catch(function (error) {
								console.log('error');
							});
						});
					}
				}
			} else {
				if (msg == '#加入專案' || msg == '#加入計劃' || msg == '#加入計畫') {
					replyMsg = '您好，此項功能只能在群組中使用哦。'
					event.reply(replyMsg).then(function (data) {
						console.log(replyMsg);
					}).catch(function (error) {
						console.log('error');
					});
				}
			}

			event.source.profile().then(
				function (profile) {
					//我的計畫
					if (event.message.text == "#我的計畫" || event.message.text == "#我的計劃" || event.message.text == "#我的專案") {
						Messenge.MessengeSelectSearch(profile.userId).then(data => {
							if (data == -1) {
								event.reply('您可能還沒加入任何計畫哦！')
							}
							else {
								let pushWorkText1 = [];
								let pushWorkText2 = [];
								for (let i = 0; i < data.length; i++) {
									if (i > 9) {
										date = myFunction.SeparateDate(data[i].project_startdate)
										endDate = myFunction.SeparateDate(data[i].project_enddate)
										pushWorkText1.push({
											"title": "【您的全部計畫】",
											"text": data[i].project_name + "\n" + "開始時間：" + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
												date[3] + ':' + date[4] + ':' + date[5] + "\n" + "結束時間：" + endDate[0] + '/' + endDate[1] + '/' + endDate[2] + ' ' +
												endDate[3] + ':' + endDate[4] + ':' + endDate[5],
											"actions": [{
												"type": "uri",
												"label": "查看網站",
												"uri": "https://planyourself-connection.herokuapp.com"
											}]
										});
									}
									else {
										date = myFunction.SeparateDate(data[i].project_startdate)
										endDate = myFunction.SeparateDate(data[i].project_enddate)
										pushWorkText2.push({
											"title": "【您的全部計畫】",
											"text": data[i].project_name + "\n" + "開始時間：" + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
												date[3] + ':' + date[4] + ':' + date[5] + "\n" + "結束時間：" + endDate[0] + '/' + endDate[1] + '/' + endDate[2] + ' ' +
												endDate[3] + ':' + endDate[4] + ':' + endDate[5],
											"actions": [{
												"type": "uri",
												"label": "查看網站",
												"uri": "https://planyourself-connection.herokuapp.com"
											}]
										});
									}
								}
								if (pushWorkText1 != '') {
									bot.push(event.source.userId, {
										"type": "template",
										"altText": "這是一個輪播樣板",
										"template": {
											"type": "carousel",
											"columns": pushWorkText1
										},
									});
								}
								if (pushWorkText2 != '') {
									bot.push(event.source.userId, {
										"type": "template",
										"altText": "這是一個輪播樣板",
										"template": {
											"type": "carousel",
											"columns": pushWorkText2
										},
									});
								}
							}
						})
					}
					//尚未開始計畫
					if (event.message.text == "#我的尚未開始計畫" || event.message.text == "#我的尚未開始計劃" || event.message.text == "#我的尚未開始計畫") {
						Messenge.MessengeSelectSearch(profile.userId).then(data => {
							if (data == -1) {
								event.reply('您可能還沒任何計畫哦！')
							} else {
								function dateJudge(date) {
									var projectStart = new Date(date.project_startdate);
									var dateEnd = new Date(Date.now() + (8 * 60 * 60 * 1000));
									var startTime = projectStart.getTime() - dateEnd.getTime();
									if (startTime > 0) {
										return true;
									} else {
										return false;
									}
								}
								let pushWorkText1 = [];
								let pushWorkText2 = [];
								for (let i = 0; i < data.length; i++) {
									getVaue = dateJudge(data[i]);
									if (pushWorkText1.length<10) {
										if (getVaue) {
											date = myFunction.SeparateDate(data[i].project_startdate)
											endDate = myFunction.SeparateDate(data[i].project_enddate)
											pushWorkText1.push({
												"title": "【尚未開始計畫】",
												"text": data[i].project_name + "\n" + "開始時間：" + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
													date[3] + ':' + date[4] + ':' + date[5] + "\n" + "結束時間：" + endDate[0] + '/' + endDate[1] + '/' + endDate[2] + ' ' +
													endDate[3] + ':' + endDate[4] + ':' + endDate[5],
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://planyourself-connection.herokuapp.com"
												}]
											});
										}
									}
									else {
										if (getVaue) {
											date = myFunction.SeparateDate(data[i].project_startdate)
											endDate = myFunction.SeparateDate(data[i].project_enddate)
											pushWorkText2.push({
												"title": "【尚未開始計畫】",
												"text": data[i].project_name + "\n" + "開始時間：" + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
													date[3] + ':' + date[4] + ':' + date[5] + "\n" + "結束時間：" + endDate[0] + '/' + endDate[1] + '/' + endDate[2] + ' ' +
													endDate[3] + ':' + endDate[4] + ':' + endDate[5],
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://planyourself-connection.herokuapp.com"
												}]
											});
										}
									}
								}
								if (pushWorkText1 == "") {
									event.reply('您可能還沒任何計畫哦！')
								}
								if (pushWorkText1 != '') {
									bot.push(event.source.userId, {
										"type": "template",
										"altText": "這是一個輪播樣板",
										"template": {
											"type": "carousel",
											"columns": pushWorkText1
										},
									});
								}
								if (pushWorkText2 != '') {
									bot.push(event.source.userId, {
										"type": "template",
										"altText": "這是一個輪播樣板",
										"template": {
											"type": "carousel",
											"columns": pushWorkText2
										},
									});
								}
							}
						})
					}
					//執行中計畫
					if (event.message.text == "#我的執行中計畫" || event.message.text == "#我的執行中計劃" || event.message.text == "#我的執行中專案") {
						Messenge.MessengeSelectSearch(profile.userId).then(data => {
							if (data == -1) {
								event.reply('您可能還沒任何計畫進行中哦！')
							} else {
								function dateJudge(date) {
									var projectStart = new Date(date.project_startdate);
									var projectEnd = new Date(date.project_enddate);
									var dateEnd = new Date(Date.now() + (8 * 60 * 60 * 1000));
									var startTime = projectStart.getTime() - dateEnd.getTime();
									var endTime = projectEnd.getTime() - dateEnd.getTime();
									if (startTime < 0 && endTime > 0) {
										return true;
									} else {
										return false;
									}
								}
								let pushWorkText1 = [];
								let pushWorkText2 = [];
								for (let i = 0; i < data.length; i++) {
									getVaue = dateJudge(data[i]);
									if (pushWorkText1<10) {
										if (getVaue) {
											date = myFunction.SeparateDate(data[i].project_startdate)
											endDate = myFunction.SeparateDate(data[i].project_enddate)
											pushWorkText1.push({
												"title": "【執行中計畫】",
												"text": data[i].project_name + "\n" + "開始時間：" + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
													date[3] + ':' + date[4] + ':' + date[5] + "\n" + "結束時間：" + endDate[0] + '/' + endDate[1] + '/' + endDate[2] + ' ' +
													endDate[3] + ':' + endDate[4] + ':' + endDate[5],
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://planyourself-connection.herokuapp.com"
												}]
											});
										}
									}
									else {
										if (getVaue) {
											date = myFunction.SeparateDate(data[i].project_startdate)
											endDate = myFunction.SeparateDate(data[i].project_enddate)
											pushWorkText2.push({
												"title": "【執行中計畫】",
												"text": data[i].project_name + "\n" + "開始時間：" + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
													date[3] + ':' + date[4] + ':' + date[5] + "\n" + "結束時間：" + endDate[0] + '/' + endDate[1] + '/' + endDate[2] + ' ' +
													endDate[3] + ':' + endDate[4] + ':' + endDate[5],
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://planyourself-connection.herokuapp.com"
												}]
											});
										}
									}
								}
								if (pushWorkText1 == "") {
									event.reply('您可能還沒任何計畫哦！')
								}
								if (pushWorkText1 != '') {
									bot.push(event.source.userId, {
										"type": "template",
										"altText": "這是一個輪播樣板",
										"template": {
											"type": "carousel",
											"columns": pushWorkText1
										},
									});
								}
								if (pushWorkText2 != '') {
									setTimeout(() => {
										bot.push(event.source.userId, {
											"type": "template",
											"altText": "這是一個輪播樣板",
											"template": {
												"type": "carousel",
												"columns": pushWorkText2
											},
										});
									}, 2000)
								}
							}
						})
					}
					//已完成計畫
					if (event.message.text == "#我的已完成計畫" || event.message.text == "#我的已完成計劃" || event.message.text == "#我的已完成專案") {
						Messenge.MessengeSelectSearch(profile.userId).then(data => {
							if (data == -1) {
								event.reply('您可能還沒加入任何計畫哦！')
							} else {
								function dateJudge(date) {
									var projectStart = new Date(date.project_startdate);
									var projectEnd = new Date(date.project_enddate);
									var dateEnd = new Date(Date.now() + (8 * 60 * 60 * 1000));
									var startTime = projectStart.getTime() - dateEnd.getTime();
									var endTime = projectEnd.getTime() - dateEnd.getTime();
									if (startTime < 0 && endTime < 0) {
										return true;
									} else {
										return false;
									}
								}
								let pushWorkText1 = [];
								let pushWorkText2 = [];
								for (let i = 0; i < data.length; i++) {
									getVaue = dateJudge(data[i]);
									if (pushWorkText1<10) {
										if (getVaue) {
											date = myFunction.SeparateDate(data[i].project_startdate)
											endDate = myFunction.SeparateDate(data[i].project_enddate)
											pushWorkText1.push({
												"title": "【我的已完成計畫】",
												"text": data[i].project_name + "\n" + "開始時間：" + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
													date[3] + ':' + date[4] + ':' + date[5] + "\n" + "結束時間：" + endDate[0] + '/' + endDate[1] + '/' + endDate[2] + ' ' +
													endDate[3] + ':' + endDate[4] + ':' + endDate[5],
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://planyourself-connection.herokuapp.com"
												}]
											});
										}
									}
									else {
										if (getVaue) {
											date = myFunction.SeparateDate(data[i].project_startdate)
											endDate = myFunction.SeparateDate(data[i].project_enddate)
											pushWorkText2.push({
												"title": "【我的已完成計畫】",
												"text": data[i].project_name + "\n" + "開始時間：" + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
													date[3] + ':' + date[4] + ':' + date[5] + "\n" + "結束時間：" + endDate[0] + '/' + endDate[1] + '/' + endDate[2] + ' ' +
													endDate[3] + ':' + endDate[4] + ':' + endDate[5],
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://planyourself-connection.herokuapp.com"
												}]
											});
										}
									}
								}
								if (pushWorkText1 == "") {
									event.reply('您可能還沒任何計畫哦！')
								}
								if (pushWorkText1 != '') {
									bot.push(event.source.userId, {
										"type": "template",
										"altText": "這是一個輪播樣板",
										"template": {
											"type": "carousel",
											"columns": pushWorkText1
										},
									});
								}
								if (pushWorkText2 != '') {
									setTimeout(() => {
										bot.push(event.source.userId, {
											"type": "template",
											"altText": "這是一個輪播樣板",
											"template": {
												"type": "carousel",
												"columns": pushWorkText2
											},
										});
									}, 2000)
								}
							}
						})
					}
					if (event.message.text == "#我的工作") {
						Messenge.WorkSelectSearch(profile.userId).then(data => {
							if (data == -1) {
								event.reply('您可能還沒任何工作哦！');
							} else {
								let pushWorkText1 = [];
								let pushWorkText2 = [];
								for (let i = 0; i < data.length; i++) {
									if (i > 13) {
										if (data[i].work_hint) {
											pushWorkText1.push({
												"type": "box",
												"layout": "vertical",
												"contents": [{
													"type": "text",
													"text": data[i].list_name + '列表下的工作',
													"wrap": true,
													"align": "center",
													"position": "relative",
													"weight": "bold"
												},
												{
													"type": "text",
													"text": "　",
													"align": "center"
												},
												{
													"type": "text",
													"text": data[i].work_title,
													"wrap": true,
													"align": "center",
													"position": "relative"
												}, {
													"type": "text",
													"text": "　",
													"align": "center"
												}, {
													"type": "box",
													"layout": "vertical",
													"cornerRadius": "xl",
													"backgroundColor": "#000000FF",
													"height": "1px",
													"contents": [{
														"type": "text",
														"text": "　",
														"align": "center"
													}]
												}, {
													"type": "box",
													"layout": "vertical",
													"height": "10px",
													"contents": [{
														"type": "text",
														"text": "　",
														"align": "center"
													}]
												},
												]
											}, {
												"type": "box",
												"layout": "vertical",
												"height": "10px",
												"contents": [{
													"type": "text",
													"text": "　",
													"align": "center"
												}]
											});
										}
									}
									else {
										if (data[i].work_hint) {
											pushWorkText2.push({
												"type": "box",
												"layout": "vertical",
												"contents": [{
													"type": "text",
													"text": data[i].list_name + '列表下的工作',
													"wrap": true,
													"align": "center",
													"position": "relative",
													"weight": "bold"
												},
												{
													"type": "text",
													"text": "　",
													"align": "center"
												},
												{
													"type": "text",
													"text": data[i].work_title,
													"wrap": true,
													"align": "center",
													"position": "relative"
												}, {
													"type": "text",
													"text": "　",
													"align": "center"
												}, {
													"type": "box",
													"layout": "vertical",
													"cornerRadius": "xl",
													"backgroundColor": "#000000FF",
													"height": "1px",
													"contents": [{
														"type": "text",
														"text": "　",
														"align": "center"
													}]
												}, {
													"type": "box",
													"layout": "vertical",
													"height": "10px",
													"contents": [{
														"type": "text",
														"text": "　",
														"align": "center"
													}]
												},
												]
											}, {
												"type": "box",
												"layout": "vertical",
												"height": "10px",
												"contents": [{
													"type": "text",
													"text": "　",
													"align": "center"
												}]
											});
										}
									}
								}
								if (pushWorkText2 == '') {
									event.reply('您可能還沒任何工作哦');
								}
								if (pushWorkText1 != '') {
									bot.push(event.source.userId, {
										"type": "flex",
										"altText": "this is a flex message",
										"contents": {
											"type": "bubble",
											"body": {
												"type": "box",
												"layout": "vertical",
												"contents": pushWorkText1
											}
										}
									});
								}
								if (pushWorkText2 != '') {
									setTimeout(() => {
										bot.push(event.source.userId, {
											"type": "flex",
											"altText": "this is a flex message",
											"contents": {
												"type": "bubble",
												"body": {
													"type": "box",
													"layout": "vertical",
													"contents": pushWorkText2
												}
											}
										});
									}, 2000)
								}
							}
						})
					}
					//快到期計畫
					if (event.message.text == "#我的快到期計畫" || event.message.text == "#我的快到期計劃" || event.message.text == "#我的快到期專案") {
						Messenge.MessengeSelectSearch(profile.userId).then(data => {
							console.log(data)
							if (data == -1) {
								event.reply('您可能還沒任何計畫快到期哦！');
							} else {
								let pushWorkText1 = [];
								let pushWorkText2 = [];
								for (let i = 0; i < data.length; i++) {
									// 604,800,000
									let now = Date.now();
									let enddate = new Date(data[i].project_enddate).getTime();
									let limit = now + 604800000;
									if (enddate < limit) {
										date = myFunction.SeparateDate(data[i].project_enddate)
										if(pushWorkText1<10){
											pushWorkText1.push({
												"title": data[i].project_name,
												"text": '結束時間:' + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
													date[3] + ':' + date[4] + ':' + date[5],
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://planyourself-connection.herokuapp.com"
												}]
											});
										}
										else{
											pushWorkText2.push({
												"title": data[i].project_name,
												"text": '結束時間:' + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
													date[3] + ':' + date[4] + ':' + date[5],
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://planyourself-connection.herokuapp.com"
												}]
											});
										}
									}
								}
								if (pushWorkText1 == "") {
									event.reply('您可能還沒任何計畫快到期哦！');
								} 
								if (pushWorkText1 != '') {
									bot.push(event.source.userId, {
										"type": "template",
										"altText": "這是一個輪播樣板",
										"template": {
											"type": "carousel",
											"columns": pushWorkText1
										},
										"imageAspectRatio": "rectangle",
										"imageSize": "cover"
									});
								}
								if (pushWorkText2 != '') {
									setTimeout(() => {
										bot.push(event.source.userId, {
											"type": "template",
											"altText": "這是一個輪播樣板",
											"template": {
												"type": "carousel",
												"columns": pushWorkText2
											},
											"imageAspectRatio": "rectangle",
											"imageSize": "cover"
										});
									}, 2000)
								}
							}
						})
					}
				}
			);
			if (msg == '幫助' || msg.toLowerCase() == 'help' ||
				(msg.substr(0, 1) == '#' && msg.includes('幫助')) ||
				(msg.substr(0, 1) == '#' && msg.includes('help'))) {
				let replyFlex = {
					"type": "flex",
					"altText": "this is a flex message",
					"contents": {
						"type": "bubble",
						"body": {
							"type": "box",
							"layout": "vertical",
							"paddingAll": "10px",
							"backgroundColor": "#EEEEEEFF",
							"contents": [{
								"type": "text",
								"text": "您好，感謝您使用Plan Yourself",
								"align": "center",
								"position": "relative",
								"weight": "bold"
							}, {
								"type": "text",
								"text": "　",
								"align": "center",
								"position": "relative",
								"size": "xs"
							}, {
								"type": "text",
								"wrap": true,
								"text": "除了「幫助」以外。所有的命令都是以hash（#）開頭\n所有可執行的命令如下表所示",
								"align": "center",
								"position": "relative",
								"size": "xs"
							}, {
								"type": "text",
								"text": "　",
								"align": "center",
								"position": "relative",
								"size": "xs"
							}, {
								"type": "box",
								"layout": "horizontal",
								"cornerRadius": "md",
								"position": "relative",
								"cornerRadius": "xs",
								"backgroundColor": "#AAAADDFF",
								"contents": [{
									"type": "text",
									"text": "#",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 1
								},
								{
									"type": "text",
									"text": "命令",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 2
								},
								{
									"type": "text",
									"text": "說明",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 3
								}
								]
							}, {
								"type": "box",
								"layout": "horizontal",
								"position": "relative",
								"cornerRadius": "xs",
								"backgroundColor": "#CCCCFFFF",
								"contents": [{
									"type": "text",
									"text": "#",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 1
								},
								{
									"type": "text",
									"wrap": true,
									"text": "加入計畫\n加入計劃\n加入專案",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 2
								},
								{
									"type": "text",
									"wrap": true,
									"text": "若您想將群組中的其他人加入您的計畫中。\n請在群組內使用這項命令",
									"align": "center",
									"maxLines": 0,
									"size": "sm",
									"position": "relative",
									"flex": 3
								}
								]
							}, {
								"type": "box",
								"layout": "horizontal",
								"backgroundColor": "#BFBFEEFF",
								"contents": [{
									"type": "text",
									"text": "　",
								},
								{
									"type": "text",
									"text": "　",
								},
								{
									"type": "text",
									"text": "　",
								}
								]
							}, {
								"type": "box",
								"layout": "horizontal",
								"position": "relative",
								"cornerRadius": "xs",
								"backgroundColor": "#CCCCFFFF",
								"contents": [{
									"type": "text",
									"text": "#",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 1
								},
								{
									"type": "text",
									"wrap": true,
									"text": "我的計畫\n我的計劃\n我的專案",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 2
								},
								{
									"type": "text",
									"wrap": true,
									"text": "若您想查詢您參與的計畫。\n請直接使用這項命令。",
									"align": "center",
									"maxLines": 0,
									"size": "sm",
									"position": "relative",
									"flex": 3
								}
								]
							}, {
								"type": "box",
								"layout": "horizontal",
								"backgroundColor": "#BFBFEEFF",
								"contents": [{
									"type": "text",
									"text": "　",
								},
								{
									"type": "text",
									"text": "　",
								},
								{
									"type": "text",
									"text": "　",
								}
								]
							}, {
								"type": "box",
								"layout": "horizontal",
								"position": "relative",
								"cornerRadius": "xs",
								"backgroundColor": "#CCCCFFFF",
								"contents": [{
									"type": "text",
									"text": "#",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 1
								},
								{
									"type": "text",
									"wrap": true,
									"text": "我的工作",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 2
								},
								{
									"type": "text",
									"wrap": true,
									"text": "查詢屬於自己的工作（不管是主要還是次要）。",
									"align": "center",
									"maxLines": 0,
									"size": "sm",
									"position": "relative",
									"flex": 3
								}
								]
							}, {
								"type": "box",
								"layout": "horizontal",
								"backgroundColor": "#BFBFEEFF",
								"contents": [{
									"type": "text",
									"text": "　",
								},
								{
									"type": "text",
									"text": "　",
								},
								{
									"type": "text",
									"text": "　",
								}
								]
							}, {
								"type": "box",
								"layout": "horizontal",
								"position": "relative",
								"cornerRadius": "xs",
								"backgroundColor": "#CCCCFFFF",
								"contents": [{
									"type": "text",
									"text": "#",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 1
								},
								{
									"type": "text",
									"wrap": true,
									"text": "我的快到期計畫\n我的快到期計劃\n我的快到期專案",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 2
								},
								{
									"type": "text",
									"wrap": true,
									"text": "查詢自己的計畫什麼時候到期。",
									"align": "center",
									"maxLines": 0,
									"size": "sm",
									"position": "relative",
									"flex": 3
								}
								]
							}]
						}

					}
				};
				event.reply(replyFlex).then(function (data) {
					console.log(replyMsg);
				}).catch(function (error) {
					console.log('error');
				});
			}

			if (talkingUser.includes(event.source.userId)) {
				if (msg.indexOf('[') != -1 && msg.indexOf(']') != -1) {
					let projectId = msg.substring(1, msg.length - 1);
					// 查詢計畫
					project.fetchProject(projectId).then(projectData => {
						talkingUser.splice(talkingUser.indexOf(event.source.userId), 1);
						if (projectData) {
							teammember.VerificationTeamMember(event.source.userId, projectId).then(data => {
								if (data) {
									let groupWithProject = [event.source.groupId, projectId, projectData[0].project_name];
									bindGroupAndProjectId.push(groupWithProject);
									let replyFlex = {
										"type": "flex",
										"altText": "this is a flex message",
										"contents": {
											"type": "bubble",
											"body": {
												"type": "box",
												"layout": "vertical",
												"contents": [{
													"type": "text",
													"text": "請點選下方按鈕以加入計畫",
													"align": "center"
												}, {
													"type": "text",
													"text": "　",
													"align": "center"
												}, {
													"type": "box",
													"layout": "horizontal",
													"cornerRadius": "xs",
													"paddingStart": "40px",
													"paddingEnd": "40px",
													"contents": [{
														"type": "button",
														"height": "sm",
														"action": {
															"type": "message",
															"label": projectData[0].project_name,
															"text": "#我要加入"
														},
														"style": "primary",
														"color": "#4C62C7"
													}]
												}

												]
											}
										}
									};
									event.reply(replyFlex).then(function (data) {
										console.log(replyMsg);
									}).catch(function (error) {
										console.log('error');
									});
								} else {
									event.reply('你不在計畫中哦。').then(function (data) {
										console.log(replyMsg);
									}).catch(function (error) {
										console.log('error');
									});
								}
							})
						} else {
							event.reply('找不到計畫。').then(function (data) {
								console.log(replyMsg);
							}).catch(function (error) {
								console.log('error');
							});
						}
					})

				} else if (msg == '不要') {
					talkingUser.splice(talkingUser.indexOf(event.source.userId), 1);
					event.reply('好吧......(ಥ_ಥ)').then(function (data) {
						console.log(replyMsg);
					}).catch(function (error) {
						console.log('error');
					});
				}
			}
			// event.reply(replyMsg).then(function (data) {
			// 	console.log(replyMsg);
			// }).catch(function (error) {
			// 	console.log('error');
			// });
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
					if (!data2) {
						console.log('寫入資料庫時發生問題');
						return;
					}
				})

			}
		})
	});
	let replyMsg = '您好，感謝您加我為好友\n請輸入「幫助」查看更多選項'
	event.reply(replyMsg).then(function (data) {
		console.log(replyMsg);
	}).catch(function (error) {
		console.log('error');
	});
}
_bot();