var express = require('express');
var router = express.Router();
//增加引用函式
const workhint = require('./utility/workhint.js');

//接收POST請求
router.post('/', function (req, res, next) {
    workhint.updateWorkHint('A001', req.body.work_id, req.body.work_hint).then(data => {
        if (data) {
            console.log("update workhint Successful!");
            res.render('complete.ejs');
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
})

module.exports = router;