var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {
    member.updateMemberLinebotPush(req.cookies.userid, req.body.linebotPush).then(data => {
        if(data){
            console.log("update LinebotPush Successful!");
            return res.status(200).send({
                message: 'LINEBOT推播更新成功'
            });
        }else{
            res.redirect('/login');  //導向找不到頁面
        }
    })
});


module.exports = router;