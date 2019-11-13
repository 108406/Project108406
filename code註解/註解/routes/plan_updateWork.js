var express = require('express');
var router = express.Router();

//增加引用函式
const work = require('./utility/work');

//更新工作
router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        let tag_id1 = req.body.tag_id1 == 0 ? null : req.body.tag_id1;
        let tag_id2 = req.body.tag_id2 == 0 ? null : req.body.tag_id2;
        let tag_id3 = req.body.tag_id3 == 0 ? null : req.body.tag_id3;
        let tag_id4 = req.body.tag_id4 == 0 ? null : req.body.tag_id4;
        let tag_id5 = req.body.tag_id5 == 0 ? null : req.body.tag_id5;
        let tag_id6 = req.body.tag_id6 == 0 ? null : req.body.tag_id6;
        let first_principal = req.body.first_principal == '' ? null : req.body.first_principal;
        let second_principal = req.body.second_principal == '' ? null : req.body.second_principal;
        let deadline = req.body.deadline == '' ? null : req.body.deadline;
        var newWorkData = {
            work_id: req.body.work_id,
            work_title: req.body.work_title,
            work_content: req.body.work_content,
            deadline: deadline,
            tag_id1: tag_id1,
            tag_id2: tag_id2,
            tag_id3: tag_id3,
            tag_id4: tag_id4,
            tag_id5: tag_id5,
            tag_id6: tag_id6,
            file: req.body.file,
            file_name: req.body.file_name,
            first_principal: first_principal,
            second_principal: second_principal
        }
        work.updateWork(newWorkData).then(data => {
            if (data) {
                return res.status(200).send({
                    message: '工作更新成功。'
                });
            } else {
                console.log('更新工作時發生錯誤。')
                return res.status(400).send({
                    message: '更新工作時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;