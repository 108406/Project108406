var express = require('express');
var router = express.Router();

//增加引用函式
const work = require('./utility/work');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        work.deleteWork(req.body.work_id).then(data => {
            if (data) {
                console.log('工作刪除成功。')
                return res.status(200).send({
                    message: '工作刪除成功。'
                });
            } else {
                return res.status(400).send({
                    message: '刪除工作時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;