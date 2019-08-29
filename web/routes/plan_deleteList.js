var express = require('express');
var router = express.Router();

//增加引用函式
const list = require('./utility/list');
const projectlist = require('./utility/projectlist');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        list.deleteList(req.body.list_id).then(data => {
            if (data) {
                console.log('列表刪除成功。')
                return res.status(200).send({
                    message: '列表刪除成功。'
                });
            } else {
                return res.status(400).send({
                    message: '刪除列表時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('login');
    }
});

module.exports = router;