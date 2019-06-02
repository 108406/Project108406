var express = require('express');
var router = express.Router();
//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.post('/', function(req, res, next) {
    member.updateMemberData('A001', req.body.member_name, req.body.email).then(data => {
        if(data){
            console.log("update Member Data Successful!");
        }else{
            res.render('notFound');  //導向找不到頁面
        }
    })
});


module.exports = router;