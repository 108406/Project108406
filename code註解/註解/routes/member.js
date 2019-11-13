var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
    // 抓取member頁面的所有資料
    member.displayMember(req.cookies.userid).then(data => {
        if(data){
            res.render('member.ejs', {items:data});  //將資料傳給顯示頁面            
        }else{
            res.redirect('/login');  //導向login頁面
        }  
    })
});


module.exports = router;