var express = require('express');
var router = express.Router();

//增加引用函式
const adminpush = require('./utility/adminpush');
const myFunction = require('./utility/myFunction');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        var nowDate = myFunction.nowTimeToDB();
        adminpush.addAdminPush(req.cookies.projectid, req.body.adminpushContent, nowDate, req.body.adminpushEndDate).then(data => {
            if (data) {
                return res.status(200).send({
                    message: '推播新增成功。',
                    nowDate: nowDate
                });
            } else {
                console.log('新增推播時發生錯誤。')
                return res.status(400).send({
                    message: '新增推播時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('login');
    }
});

module.exports = router;