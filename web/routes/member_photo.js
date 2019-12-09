var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {        
<<<<<<< HEAD
    member.updateMemberPhoto(req.cookies.userid, req.body.photoContent).then(data => {
=======
    member.updateMemberPhoto('A001', req.body.photoContent).then(data => {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
        if (data) {
            // 將使用者上傳的檔案匯入伺服器端
            // var path = 'public/imgs/';
            // var timestamp = path + Date.now() + req.body.photoType;
            // require("fs").writeFile(timestamp, req.body.photoContent, 'base64', function(err) {
            //     console.log(err);
            // });
            console.log("Successful!");
<<<<<<< HEAD
            return res.status(200).send({
                message: '更新頭貼成功'
            });
        }else {
            res.redirect('/login');  //導向找不到頁面
=======
        }else {
            res.render('notFound');  //導向找不到頁面
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
        }
    })
});


module.exports = router;