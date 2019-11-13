var express = require('express');
var router = express.Router();

//增加引用函式
const workhint = require('./utility/workhint');

// 新增工作提醒
router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        workhint.addWorkHint(req.body.user_id, req.body.work_id, true).then(data => {
            if (data) {
                console.log('新增工作提醒成功')
                return res.status(200).send({
                    message: '新增工作提醒成功'
                });
            } else {
                console.log('新增工作提醒時發生錯誤。')
                return res.status(400).send({
                    message: '新增工作提醒時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;