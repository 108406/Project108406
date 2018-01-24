var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: '1558887838',
  channelSecret: '1a4c4b7f22416496c44b76d566c45576',
  channelAccessToken: 'L3JExeBE/B0vkQMnZFbhxtLijIQHcecDl2LRQV1N6EgeVO4P5vq1WRcklQ5aDK4ZE+gO00BOmPq3d/C5qmg2eEZc9T09ELM3j6DZPI1pYVy2zDMrh2zd0TCCFSYcyolYWavgPmKd31Qj+NFWk1Fz7QdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function(event) {
	if (event.message.type = 'text') {
		var msg = event.message.text;
		
		if(msg.indexOf('1') != -1) {
			event.reply("有" + msg.indexOf('1') + "個1").then(function(data) {
			//success
			console.log(msg);
			}).catch (function(error) {
				//error
				console.log('error');
			});	
		}
		
			
	}
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
