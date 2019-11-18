var express = require('express');
var router = express.Router();

//增加引用函式
const work = require('./utility/work');
const listwork = require('./utility/listwork');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        var work_id = Date.now() * 1000 + Math.floor(Math.random() * 1000)
        work.addWork(work_id, req.body.work_title).then(data => {
            if (data) {
                listwork.addListWork(req.body.list_id, work_id).then(data => {
                    console.log('新增工作成功')
                    return res.status(200).send({
                        message: '新增工作成功',
                        work_id: work_id
                    });
                })
            } else {
                console.log('新增工作時發生錯誤。')
                return res.status(400).send({
                    message: '新增工作時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;