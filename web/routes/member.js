var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
<<<<<<< HEAD
    member.displayMember(req.cookies.userid).then(data => {
        if(data){
            res.render('member.ejs', {items:data});  //將資料傳給顯示頁面            
        }else{
            res.redirect('/login');  //導向找不到頁面
=======
    member.displayMember('A001').then(data => {
        if(data){
            res.render('member.ejs', {items:data, account:'A001'});  //將資料傳給顯示頁面            
        }else{
            res.render('notFound');  //導向找不到頁面
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
        }  
    })
});


module.exports = router;