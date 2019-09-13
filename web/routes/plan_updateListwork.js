var express = require('express');
var router = express.Router();

//增加引用函式
const listwork = require('./utility/listwork');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        listwork.deleteListWork(req.body.fromListId, req.body.thisWorkId).then(data => {
            if (data) {
                listwork.addListWork(req.body.toListId, req.body.thisWorkId).then(data => {
                    console.log('更新列表工作成功')
                    return res.status(200).send({
                        message: '更新列表工作成功',
                        tag_id: tag_id
                    });
                })
            } else {
                console.log('更新列表工作時發生問題')
                return res.status(400).send({
                    message: '更新列表工作時發生問題'
                });
            }
        })
    } else {
        res.redirect('login');
    }
});

module.exports = router;