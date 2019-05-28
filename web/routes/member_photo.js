var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {        
    member.updateMemberPhoto('A001', req.body.photoContent).then(data => {
        if (data) {
            // 將使用者上傳的檔案匯入伺服器端
            // var path = 'public/imgs/';
            // var timestamp = path + Date.now() + req.body.photoType;
            // require("fs").writeFile(timestamp, req.body.photoContent, 'base64', function(err) {
            //     console.log(err);
            // });
            console.log("Successful!");
        }else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});


module.exports = router;