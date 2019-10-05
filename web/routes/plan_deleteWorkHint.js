var express = require('express');
var router = express.Router();

//增加引用函式
const workhint = require('./utility/workhint');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        workhint.deleteWorkHint(req.body.user_id, req.body.work_id).then(data => {
            if (data) {
                console.log('工作提醒刪除成功。')
                return res.status(200).send({
                    message: '工作提醒刪除成功。'
                });
            } else {
                return res.status(400).send({
                    message: '刪除工作提醒時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;