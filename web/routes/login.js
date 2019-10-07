var express = require('express');
var app = express();
var router = express.Router();
const line_login = require('./line-login');

//增加引用函式
const member = require('./utility/member');

//設定LINE Login參數
const loginConfig = {
  channel_id: '1619169421', //process.env.LINE_LOGIN_CHANNEL_ID
  channel_secret: 'e00a15bd1fa164dfc179db9b46ab4145', //process.env.LINE_LOGIN_CHANNEL_SECRET
  callback_url: 'https://planyourself-web.herokuapp.com/auth/line/cb', //process.env.LINE_LOGIN_CALLBACK_URL
  scope: 'openid profile',
  prompt: 'consent',
  bot_prompt: 'normal'
};

const lineLogin = new line_login(loginConfig);

//清除session API
router.get('/auth/line/logout', (req, res) => { //登出帳號清除session
  res.clearCookie('userid');
  req.session.destroy();
  res.redirect('/');
});

//自訂的畫面路由
router.get('/', (req, res) => {
  if (req.cookies.userid != undefined) {
    res.redirect('https://planyourself-web.herokuapp.com/content'); //自訂成功登入頁面
  } else if (req.session.errMsg) {
    res.render('login.ejs', {  //自訂尚未登入頁面，顯示錯誤訊息
      ErrMsg: req.session.errMsg
    });
  } else {
    res.render('login.ejs');  //自訂尚未登入頁面，沒有錯誤訊息
  }
});

//LINE Login相關的API
router.get('/auth/line', lineLogin.authDirect()); //產生跳轉到LINE的登入網址
router.get('/auth/line/cb', lineLogin.authcb( //從LINE登入後接收訊息
  (req, res, token) => {
    req.session.authPass = true;
    req.session.profile = token.id_token;
    res.cookie('userid', req.session.profile.sub, { 'maxAge': 3 * 24 * 60 * 60 * 1000 }); //限定3天
    console.log("=============userid", req.session.profile.sub);

    member.displayMember(req.session.profile.sub).then(data => {
      if (data != false) {
        res.redirect('https://planyourself-web.herokuapp.com/content');
      } else {
        SetMember(req.session.profile);
      }
    })
  }, (req, res, next, error) => {
    req.session.authPass = false;
    req.session.errMsg = error.message;
    res.redirect('/');
  }
));

function SetMember(profile) {
  var members = {
    "user_id": profile.sub,
    "photo": null,
    "member_name": profile.name,
    "email": profile.email,
    "linebotpush": false
  };
  member.addMember(members).then(data => {
    if (data != false) {
      res.redirect('https://planyourself-web.herokuapp.com/content');
    } else {
      res.render('login.ejs');
    }
  })
}


module.exports = router;