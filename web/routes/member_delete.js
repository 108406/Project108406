var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {        
<<<<<<< HEAD
    member.deleteMember(req.cookies.userid).then(data => {
=======
    member.deleteMember(req.body.userId).then(data => {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
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
<<<<<<< HEAD
            res.redirect('/login');  //導向找不到頁面
=======
            res.render('notFound');  //導向找不到頁面
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
        }
    })
});


module.exports = router;