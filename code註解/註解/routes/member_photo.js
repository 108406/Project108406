var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {   
    // 更新會員頭像     
    member.updateMemberPhoto(req.cookies.userid, req.body.photoContent).then(data => {
        if (data) {
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