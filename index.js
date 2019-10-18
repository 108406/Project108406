var linebot = require('linebot');
var express = require('express');
var member = require('./routes/utility/member');
var teammember = require('./routes/utility/teammember');
var view = require('./routes/utility/view');
var project = require('./routes/utility/project');
var Admin = require('./routes/utility/Admin');
var Messenge = require('./routes/utility/Messenge');
var myFunction = require('./routes/utility/myFunction');

var allWorkData = [];

var bot = linebot({
	channelId: '1623913058',
	channelSecret: 'd391ffcbe15aa40a60143a360688215d',
	channelAccessToken: 'Ve75F0ujyEhnbXiiXeFPbUODz1HtYSd5gokKP4npeWt3C2LMV8a6tbUTZAqzDUB84/oFOBAxJkoUfazGlWuiFdjk8CcfQFUTrvbin37xwAuGMedo8sTwip+1KwAe/nNIuhEGvsPs+S0ykkuwynuGTAdB04t89/1O/w1cDnyilFU='
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});

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
	Admin.AdminMessengePushJdge().then(data => {
		clearTimeout(updataData);
		allWorkData = [];
		stringAllWorkData = [];
		for (let a = 0; a < data.length; a++) {
			let adminpush_enddate = myFunction.SeparateDate(data[a].adminpush_enddate + '')
			let workData = {
				user_id: data[a].user_id,
				linebotpush: data[a].linebotpush,
				adminpush_content: data[a].adminpush_content,
				adminpush_enddate: adminpush_enddate,
			}
			if (!stringAllWorkData.includes(JSON.stringify(workData))) {
				stringAllWorkData.push(JSON.stringify(workData))
				allWorkData.push(workData)
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

//--------------------------------
// 推播資料
//--------------------------------
let push = setInterval(function () {
	let nowDateArray = myFunction.SeparateDate(Date());
	nowDateArray[3] += 8;
	for (let allDataIndex = 0; allDataIndex < allWorkData.length; allDataIndex++) {
		let adminpush_enddate = allWorkData[allDataIndex].adminpush_enddate;
		let pushWorkText = [];
		// =================================專案提醒判斷================================
		if (adminpush_enddate != null) {
			// 在5個小時前
			let AdminPushTime_5h = myFunction.BeforeDate(adminpush_enddate, [0, 0, 0, 5, 0, 0]);
			let AdminPushMessage_5h = true;
			for (let a = 0; a < 6; a++) {
				if (nowDateArray[a] != AdminPushTime_5h[a]) {
					AdminPushMessage_5h = false;
				}
			}

			// 在3個小時前
			let AdminPushTime_3h = myFunction.BeforeDate(adminpush_enddate, [0, 0, 0, 3, 0, 0]);
			let AdminPushMessage_3h = true;
			for (let a = 0; a < 6; a++) {
				if (nowDateArray[a] != AdminPushTime_3h[a]) {
					AdminPushMessage_3h = false;
				}
			}

			// 在1個小時前
			let AdminPushTime_1h = myFunction.BeforeDate(adminpush_enddate, [0, 0, 0, 1, 0, 0]);
			let AdminPushMessage_1h = true;
			for (let a = 0; a < 6; a++) {
				if (nowDateArray[a] != AdminPushTime_1h[a]) {
					AdminPushMessage_1h = false;
				}
			}

			if (AdminPushMessage_1h || AdminPushMessage_3h || AdminPushMessage_5h) {
				console.log('可以推波囉 正確進入了');
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
									"text": allWorkData[allDataIndex].adminpush_content,
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
				if (allWorkData[allDataIndex].linebotpush) {
					console.log('here');
					console.log(pushWorkText);
					userId = allWorkData[allDataIndex].user_id;
					bot.push(userId, pushWorkText);
				}
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

			// CheckMember(event);
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

						event.reply('請輸入專案代碼').then(function (data) {
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
												replyMsg = '已成功將' + profile.displayName + '加入專案【' +
													bindGroupAndProjectId[bindIndex][2] + '】中。'
												event.reply(replyMsg).then(function (data) {
													console.log(replyMsg);
												}).catch(function (error) {
													console.log('error');
												});
												let userInGroup = [event.source.groupId, event.source.userId]
												lockUserInGroup.push(userInGroup);
											} else {
												replyMsg = '抱歉。將' + profile.displayName + '加入專案【' +
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
												replyMsg = '已成功將' + profile.displayName + '加入專案【' +
													bindGroupAndProjectId[bindIndex][2] + '】中。'
												event.reply(replyMsg).then(function (data) {
													console.log(replyMsg);
												}).catch(function (error) {
													console.log('error');
												});
												let userInGroup = [event.source.groupId, event.source.userId]
												lockUserInGroup.push(userInGroup);
											} else {
												replyMsg = '抱歉。將' + profile.displayName + '加入專案【' +
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
													replyMsg = '您好，' + profile.displayName + '。\n已將您與專案【' +
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
													replyMsg = '您好，' + profile.displayName + '。\n您已經在專案【' +
														bindGroupAndProjectId[bindIndex][2] + '】中囉。'
													event.reply(replyMsg).then(function (data) {
														console.log(replyMsg);
													}).catch(function (error) {
														console.log('error');
													});
													let userInGroup = [event.source.groupId, event.source.userId]
													lockUserInGroup.push(userInGroup);
												} else {
													replyMsg = '您好，' + profile.displayName + '。\n很抱歉，您在專案【' +
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
										replyMsg = '您好，' + profile.displayName + '。\n已將您與專案【' +
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

							replyMsg = '您好，' + profile.displayName + '。\n我們將保留您原本的專案連結。'
							event.reply(replyMsg).then(function (data) {
								console.log(replyMsg);
							}).catch(function (error) {
								console.log('error');
							});
						});
					}
				}
			} else {
				if (event.source.userId == 'U30986dc43eb2232855acbb5718be7c87') {
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
					bot.push(event.source.userId, [replyFlex])
					// event.reply(replyFlex).then(function (data) {
					// 	console.log(replyMsg);
					// }).catch(function (error) {
					// 	console.log('error');
					// });

					// event.reply('不要 >.0').then(function (data) {
					// 	console.log(replyMsg);
					// }).catch(function (error) {
					// 	console.log('error');
					// });

				}

			}

			event.source.profile().then(
				function (profile) {
					//我的計畫
					if (event.message.text == "#我的計畫" || event.message.text == "#我的計劃" || event.message.text == "#我的專案") {
						Messenge.MessengeSelectSearch(profile.userId).then(data => {
							if (data == -1) {
								event.reply('您可能還沒加入任何計畫哦！')
							} else {
								let pushWorkText = [];
								for (let i = 0; i < data.length; i++) {
									if (data[i].linebotpush) {
										pushWorkText.push({
											"title": "【您的計畫】",
											"text": data[i].project_name,
											"actions": [{
												"type": "uri",
												"label": "查看網站",
												"uri": "https://zh.wikipedia.org/wiki/星夜"
											}]
										});
									}
								}
								console.log(pushWorkText);
								event.reply({
									"type": "template",
									"altText": "這是一個輪播樣板",
									"template": {
										"type": "carousel",
										"columns": pushWorkText
									},
								});
							}
						})
					}
					//尚未開始計畫
					if (event.message.text == "#我的尚未開始計畫" || event.message.text == "#我的尚未開始計劃" || event.message.text == "#我的尚未開始專案") {
						Messenge.MessengeSelectSearch(profile.userId).then(data => {
							if (data == -1) {
								event.reply('您可能還沒加入任何計畫哦！')
							} else {
								let pushWorkText = [];

								function dateJudge(date) {
									var dateBegin = new Date(date); //将-转化为/，使用new Date
									console.log(dateBegin);
									var dateEnd = new Date(Date.now() + (8 * 60 * 60 * 1000)); //获取当前时间
									console.log(dateEnd);
									var dateDiff = dateBegin.getTime() - dateEnd.getTime(); //时间差的毫秒数
									console.log(dateDiff);
									return dateDiff
								}
								for (let i = 0; i < data.length; i++) {
									if (dateJudge(data[i].project_startdate) > 0) {
										if (data[i].linebotpush) {
											pushWorkText.push({
												"title": "【您的計畫】",
												"text": data[i].project_name,
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://zh.wikipedia.org/wiki/星夜"
												}]
											});
										}
									}
								}
								console.log(pushWorkText);
								event.reply({
									"type": "template",
									"altText": "這是一個輪播樣板",
									"template": {
										"type": "carousel",
										"columns": pushWorkText
									},
								});
							}
						})
					}
					//執行中計畫
					if (event.message.text == "#我的執行中計畫" || event.message.text == "#我的執行中計劃" || event.message.text == "#我的執行中專案") {
						Messenge.MessengeSelectSearch(profile.userId).then(data => {
							if (data == -1) {
								event.reply('您可能還沒加入任何計畫哦！')
							} else {
								let pushWorkText = [];

								function dateJudge(date) {
									var dateBegin = new Date(date); //将-转化为/，使用new Date
									console.log(dateBegin);
									var dateEnd = new Date(Date.now() + (8 * 60 * 60 * 1000)); //获取当前时间
									console.log(dateEnd);
									var dateDiff = dateBegin.getTime() - dateEnd.getTime(); //时间差的毫秒数
									console.log(dateDiff);
									return dateDiff
								}
								for (let i = 0; i < data.length; i++) {
									if (dateJudge(data[i].project_startdate) < 0 && dateJudge(data[i].project_enddate>0)) {
										if (data[i].linebotpush) {
											pushWorkText.push({
												"title": "【您的執行中計畫】",
												"text": data[i].project_name+'\n'
												+'結束時間：'+data[i].project_enddate,
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://zh.wikipedia.org/wiki/星夜"
												}]
											});
										}
									}
								}
								console.log(pushWorkText);
								event.reply({
									"type": "template",
									"altText": "這是一個輪播樣板",
									"template": {
										"type": "carousel",
										"columns": pushWorkText
									},
								});
							}
						})
					}
					//我的工作
					if (event.message.text == "#我的工作") {
						Messenge.WorkSelectSearch(profile.userId).then(data => {
							console.log('index');
							console.log(data);
							if (data == -1) {
								console.log('come')
								event.reply('您可能還沒任何工作哦！');
							} else {
								let pushWorkText = [];
								for (let i = 0; i < data.length; i++) {
									if (data[i].work_hint) {
										pushWorkText.push({
											"title": data[i].list_name + '列表下',
											"text": data[i].work_title,
											"actions": [{
												"type": "uri",
												"label": "查看網站",
												"uri": "https://zh.wikipedia.org/wiki/星夜"
											}]
										});
									}
								}
								event.reply({
									"type": "template",
									"altText": "這是一個輪播樣板",
									"template": {
										"type": "carousel",
										"columns": pushWorkText
									},
								});

							}
						})
					}
					//快到期計畫
					if (event.message.text == "#快到期計畫" || event.message.text == "#快到期計劃" || event.message.text == "##快到期專案") {
						Messenge.MessengeSelectSearch(profile.userId).then(data => {
							console.log('index');
							console.log(data);
							if (data == -1) {
								event.reply('您可能還沒任何計畫快到期哦！');
							} else {
								let pushWorkText = [];
								for (let i = 0; i < data.length; i++) {
									// let pushWorkText = '';
									if (data[i].linebotpush) {
										var dateBegin = new Date(data[i].project_enddate); //将-转化为/，使用new Date
										console.log(dateBegin);
										var dateEnd = new Date(Date.now() + (8 * 60 * 60 * 1000)); //获取当前时间
										console.log(dateEnd);
										var dateDiff = dateBegin.getTime() - dateEnd.getTime(); //时间差的毫秒数
										var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
										var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
										var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
										//计算相差分钟数
										var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
										var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
										//计算相差秒数
										var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
										var seconds = Math.round(leave3 / 1000)
										console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
										if (hours < 5 && hours >= 0) {
											date = myFunction.SeparateDate(data[i].project_enddate)
											pushWorkText.push({
												"title": data[i].project_name,
												"text": '結束時間:' + date[0] + '/' + date[1] + '/' + date[2] + ' ' +
													date[3] + ':' + date[4] + ':' + date[5],
												"actions": [{
													"type": "uri",
													"label": "查看網站",
													"uri": "https://zh.wikipedia.org/wiki/星夜"
												}]
											});
											// pushWorkText ='專案名稱'+'\n'+
											//                 +'〖'+ data[i].project_name +'】'+'\n'+
											//                 '結束時間:'+date[0] + '/' + date[1] + '/' + date[2] + ' ' +
											//                 date[3] + ':' + date[4] + ':' + date[5];
											// bot.push(profile.userId, [pushWorkText]);
										}
									}
								}
								event.reply({
									"type": "template",
									"altText": "這是一個輪播樣板",
									"template": {
										"type": "carousel",
										"columns": pushWorkText
									},
									"imageAspectRatio": "rectangle",
									"imageSize": "cover"
								});
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
									"text": "加入專案\n加入計畫\n加入計劃",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 2
								},
								{
									"type": "text",
									"wrap": true,
									"text": "若您想將群組中的其他人加入您的專案中。\n請在群組內使用這項命令",
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
									"text": "我的專案\n我的計畫\n我的計劃",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 2
								},
								{
									"type": "text",
									"wrap": true,
									"text": "若您想查詢您參與的專案。\n請直接使用這項命令。",
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
									"text": "快到期計畫\n快到期計劃\n快到期專案",
									"align": "center",
									"size": "sm",
									"position": "relative",
									"flex": 2
								},
								{
									"type": "text",
									"wrap": true,
									"text": "查詢自己的專案什麼時候到期。",
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
					// 查詢專案
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
													"text": "請點選下方按鈕以加入專案",
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
									event.reply('你不在專案中哦。').then(function (data) {
										console.log(replyMsg);
									}).catch(function (error) {
										console.log('error');
									});
								}
							})
						} else {
							event.reply('找不到專案。').then(function (data) {
								console.log(replyMsg);
							}).catch(function (error) {
								console.log('error');
							});
						}
					})

				} else if (msg == '不要') {
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