var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {        
    //刪除成員
    member.deleteMember(req.cookies.userid).then(data => {
        if (data) {
            console.log("Successful!");
            res.render('login.ejs');  //導向找不到頁面
        }else {
            res.redirect('/login');  //導向找不到頁面
        }
    })
});


module.exports = router;