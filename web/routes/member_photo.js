var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {        
    member.updateMemberPhoto(req.cookies.userid, req.body.photoContent).then(data => {
        if (data) {
            // 將使用者上傳的檔案匯入伺服器端
            // var path = 'public/imgs/';
            // var timestamp = path + Date.now() + req.body.photoType;
            // require("fs").writeFile(timestamp, req.body.photoContent, 'base64', function(err) {
            //     console.log(err);
            // });
            console.log("Successful!");
            return res.status(200).send({
                message: '更新頭貼成功'
            });
        }else {
            res.redirect('/login');  //導向找不到頁面
        }
    })
});


module.exports = router;