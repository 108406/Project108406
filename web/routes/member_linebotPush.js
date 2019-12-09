var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {
<<<<<<< HEAD
    member.updateMemberLinebotPush(req.cookies.userid, req.body.linebotPush).then(data => {
        if(data){
            console.log("update LinebotPush Successful!");
            return res.status(200).send({
                message: 'LINEBOT推播更新成功'
            });
        }else{
            res.redirect('/login');  //導向找不到頁面
=======
    member.updateMemberLinebotPush('A001', req.body.linebotPush).then(data => {
        if(data){
            console.log("update LinebotPush Successful!");
        }else{
            res.render('notFound');  //導向找不到頁面
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
        }
    })
});


module.exports = router;