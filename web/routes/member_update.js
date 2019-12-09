var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {
<<<<<<< HEAD
    member.updateMemberData(req.cookies.userid, req.body.member_name, req.body.email).then(data => {
        if(data){
            console.log("update Member Data Successful!");
            return res.status(200).send({
                message: '資料更新成功'
            });
        }else{
            res.redirect('/login');  //導向找不到頁面
=======
    member.updateMemberData('A001', req.body.member_name, req.body.email).then(data => {
        if(data){
            console.log("update Member Data Successful!");
            res.render('complete.ejs');
        }else{
            res.render('notFound');  //導向找不到頁面
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
        }
    })
});


module.exports = router;