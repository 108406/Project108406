var express = require('express');
var router = express.Router();

//增加引用函式
const view = require('./utility/view');
const member = require('./utility/member');
const myFunction = require('./utility/myFunction');

//接收GET請求
router.get('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        view.projectAllData(req.cookies.projectid).then(data => {
            if (data != 'failed') {
                res.render('plan.ejs', {data : data}); //將資料傳給顯示頁面
            } else {
                res.render('error'); //導向錯誤頁面
            }
        })
    } else {
        res.redirect('login');
    }
});



module.exports = router;