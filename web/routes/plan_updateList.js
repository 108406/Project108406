var express = require('express');
var router = express.Router();

//增加引用函式
const list = require('./utility/list');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        list.updateListName(req.body.list_id, req.body.list_name).then(data => {
            if (data) {                
                console.log('更新列表成功')
                return res.status(200).send({
                    message: '更新列表成功',
                    tag_id : tag_id
                });
            } else {
                console.log('更新列表時發生問題')
                return res.status(400).send({
                    message: '更新列表時發生問題'
                });
            }
        })
    } else {
        res.redirect('login');
    }
});

module.exports = router;