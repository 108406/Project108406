var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {        
    member.deleteMember(req.cookies.userid).then(data => {
        if (data) {
            // 將使用者上傳的檔案匯入伺服器端
            // var path = 'public/imgs/';
            // var timestamp = path + Date.now() + req.body.photoType;
            // require("fs").writeFile(timestamp, req.body.photoContent, 'base64', function(err) {
            //     console.log(err);
            // });
            console.log("Successful!");
            res.render('login.ejs');  //導向找不到頁面
        }else {
            res.redirect('/login');  //導向找不到頁面
        }
    })
});


module.exports = router;