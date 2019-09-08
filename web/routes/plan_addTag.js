var express = require('express');
var router = express.Router();

//增加引用函式
const tag = require('./utility/tag');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        var tag_id = Date.now() * 1000 + Math.floor(Math.random() * 1000)
        tag.addTag(tag_id, req.cookies.projectid, req.body.tagname, req.body.color).then(data => {
            if (data) {
                console.log('標籤新增成功。')
                return res.status(200).send({
                    message: '標籤新增成功。',
                    list_id: listId
                });
            } else {
                console.log('新增標籤時發生錯誤。')
                return res.status(400).send({
                    message: '新增標籤時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('login');
    }
});

module.exports = router;